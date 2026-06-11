import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import ChatMessage from "@/models/ChatMessage";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

type ClientHistoryItem = {
  role: string;
  content: string;
};

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);

  if (!existing || existing.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  rateLimitMap.set(ip, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  });
  return true;
}

export async function POST(req: NextRequest) {
  let parsedBody: {
    message: string;
    history: Array<{ role: string; content: string }>;
    sessionId: string;
  } | null = null;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: "AI service not configured" }, { status: 500 });
    }

    const ip = getClientIp(req);

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history) ? body.history.slice(-20) : [];
    const sessionId = typeof body?.sessionId === "string" && body.sessionId.trim()
      ? body.sessionId.trim().slice(0, 120)
      : crypto.randomUUID();

    parsedBody = { message, history, sessionId };

    if (!message || message.length > 1000) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const geminiHistory = history
      .filter((item: ClientHistoryItem) => typeof item?.content === "string" && item.content.trim())
      .map((item: ClientHistoryItem) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content.slice(0, 2000) }],
      }));

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: PORTFOLIO_CONTEXT,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    let result: Awaited<ReturnType<ReturnType<typeof model.startChat>["sendMessageStream"]>>;

    try {
      const chat = model.startChat({ history: geminiHistory });
      result = await chat.sendMessageStream(message);
    } catch (error) {
      console.error("Gemini stream setup failed", error);
      throw error;
    }

    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          let fullResponse = "";

          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                fullResponse += text;
                controller.enqueue(encoder.encode(text));
              }
            }

            void connectToDatabase()
              .then(() =>
                ChatMessage.create({
                  sessionId,
                  userMessage: message,
                  aiResponse: fullResponse,
                }),
              )
              .catch(() => {
                /** Non-critical logging failure */
              });
          } catch {
            controller.enqueue(encoder.encode("[Error: Could not get response]"));
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "X-Session-Id": sessionId,
        },
      },
    );
  } catch (error) {
    if (!parsedBody?.message) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "";
    const isKeyError = message.includes("API key not valid") || message.includes("API_KEY_INVALID");
    const isModelError = message.includes("not found for API version") || message.includes("not supported");

    console.error("Chat API failed", {
      message,
      hasParsedBody: Boolean(parsedBody),
    });

    return Response.json(
      {
        error: isKeyError
          ? "Gemini API key is not valid. Please update GEMINI_API_KEY in .env.local."
          : isModelError
            ? "Gemini model is not available for this API key. Please use a supported Gemini model."
          : "AI service could not respond right now. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
