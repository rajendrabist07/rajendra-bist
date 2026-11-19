import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import ChatMessage from "@/models/ChatMessage";
import { chatRequestSchema } from "@/lib/api-schemas";
import { getServerEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

import { StreamTagSanitizer } from "@/lib/stream-sanitizer";

function sanitizeText(text: string): string {
  // Strip raw HTML tags to prevent cross-site scripting or unexpected markup in chat renders
  return text.replace(/<[^>]*>/g, "");
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
      return Response.json(
        {
          ok: false,
          code: "SERVICE_UNAVAILABLE",
          error:
            "AI Assistant is currently in offline mode (GEMINI_API_KEY unconfigured). Please reach out directly to Rajendra at rajendrabist396@gmail.com.",
        },
        { status: 503 },
      );
    }

    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit("chat", ip, 30, "1 h");

    if (!rateLimit.success) {
      return Response.json(
        {
          ok: false,
          code: "RATE_LIMITED",
          error: "Rate limit exceeded. Please wait before asking another question.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimit.reset - Date.now()) / 1000)),
          },
        },
      );
    }

    // 10 KB Payload Cap
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return Response.json(
        {
          ok: false,
          code: "PAYLOAD_TOO_LARGE",
          error: "Payload exceeds 10 KB limit.",
        },
        { status: 413 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      const issueMessage =
        parsed.error.issues[0]?.message || "Invalid chat request.";
      return Response.json(
        {
          ok: false,
          code: "VALIDATION_FAILED",
          error: issueMessage,
        },
        { status: 400 },
      );
    }

    const message = parsed.data.message;
    // Cap history to strictly the last 6 turns
    const history = parsed.data.history.slice(-6);
    const sessionId = parsed.data.sessionId || crypto.randomUUID();

    parsedBody = { message, history, sessionId };

    const geminiHistory = history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content.slice(0, 600) }],
    }));

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: PORTFOLIO_CONTEXT,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.4,
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
            const sanitizer = new StreamTagSanitizer();
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                const sanitized = sanitizer.processChunk(text);
                if (sanitized) {
                  fullResponse += sanitized;
                  controller.enqueue(encoder.encode(sanitized));
                }
              }
            }
            const trailing = sanitizer.flush();
            if (trailing) {
              fullResponse += trailing;
              controller.enqueue(encoder.encode(trailing));
            }

            if (env.MONGODB_URI) {
              void connectToDatabase()
                .then(() =>
                  ChatMessage.create({
                    sessionId,
                    userMessage: message,
                    aiResponse: fullResponse,
                  }),
                )
                .catch((loggingError) =>
                  console.warn("Chat transcript logging failed", loggingError),
                );
            }
          } catch {
            controller.enqueue(
              encoder.encode("[Error: Could not retrieve full response.]"),
            );
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
      return Response.json(
        { ok: false, code: "VALIDATION_FAILED", error: "Invalid request payload." },
        { status: 400 },
      );
    }

    const message = error instanceof Error ? error.message : "";
    const isKeyError =
      message.includes("API key not valid") || message.includes("API_KEY_INVALID");
    const isModelError =
      message.includes("not found for API version") ||
      message.includes("not supported");

    return Response.json(
      {
        ok: false,
        code: isKeyError ? "AUTH_ERROR" : isModelError ? "MODEL_UNAVAILABLE" : "UPSTREAM_ERROR",
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
