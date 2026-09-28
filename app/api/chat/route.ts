import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import ChatMessage from "@/models/ChatMessage";
import { chatRequestSchema } from "@/lib/api-schemas";
import { getServerEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  let parsedBody: {
    message: string;
    history: Array<{ role: string; content: string }>;
    sessionId: string;
  } | null = null;

  try {
    const env = getServerEnv();

    if (!env.GEMINI_API_KEY) {
      return Response.json({ error: "AI service not configured" }, { status: 500 });
    }

    const ip = getClientIp(req);

    const rateLimit = await checkRateLimit("chat", ip, 30, "1 h");

    if (!rateLimit.success) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.reset - Date.now()) / 1000)) } },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const message = parsed.data.message;
    const history = parsed.data.history;
    const sessionId = parsed.data.sessionId || crypto.randomUUID();

    parsedBody = { message, history, sessionId };

    const geminiHistory = history
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content.slice(0, 2000) }],
      }));

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: PORTFOLIO_CONTEXT,
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.6,
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

            if (env.MONGODB_URI) {
              void connectToDatabase()
                .then(() => ChatMessage.create({ sessionId, userMessage: message, aiResponse: fullResponse }))
                .catch((loggingError) => console.warn("Chat transcript logging failed", loggingError));
            }
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
