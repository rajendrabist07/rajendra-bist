import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import ChatMessage from "@/models/ChatMessage";
import { chatRequestSchema } from "@/lib/api-schemas";
import { getServerEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import { isRequestOriginAllowed } from "@/lib/origin-check";
import { StreamTagSanitizer } from "@/lib/stream-sanitizer";

export const maxDuration = 30;

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

function getModelCandidates(): string[] {
  const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallbackEnv = process.env.GEMINI_MODEL_FALLBACKS;
  const fallbacks = fallbackEnv
    ? fallbackEnv.split(",").map((m) => m.trim()).filter(Boolean)
    : ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash"];

  const candidates = [primaryModel, ...fallbacks];
  return Array.from(new Set(candidates));
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  // 1. Same-Origin Check
  if (!isRequestOriginAllowed(req)) {
    console.error(`[CHAT_ERROR] code=FORBIDDEN_ORIGIN providerStatus=403 model=none requestId=${requestId}`);
    return Response.json(
      {
        ok: false,
        code: "FORBIDDEN_ORIGIN",
        error: "Forbidden: request origin is not permitted.",
        contactEmail: "rajendrabist396@gmail.com",
      },
      { status: 403 }
    );
  }

  // 2. Environment & Key Verification
  const env = getServerEnv();
  if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY.trim() === "") {
    console.error(`[CHAT_ERROR] code=ASSISTANT_OFFLINE providerStatus=503 model=none requestId=${requestId}`);
    return Response.json(
      {
        ok: false,
        code: "ASSISTANT_OFFLINE",
        error: "AI Assistant is currently offline (GEMINI_API_KEY unconfigured). Please email rajendrabist396@gmail.com directly.",
        contactEmail: "rajendrabist396@gmail.com",
      },
      { status: 503 }
    );
  }

  // 3. Rate Limiting Check
  const ip = getClientIp(req);
  try {
    const rateLimit = await checkRateLimit("chat", ip, 30, "1 h");
    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.reset - Date.now()) / 1000);
      console.warn(`[CHAT_ERROR] code=RATE_LIMITED providerStatus=429 model=none requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: "RATE_LIMITED",
          error: "Rate limit exceeded (30 queries / hour). Please wait before asking another question.",
          contactEmail: "rajendrabist396@gmail.com",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, retryAfterSec)),
          },
        }
      );
    }
  } catch (rateLimitErr) {
    console.warn(`[CHAT_WARN] Rate limiter error requestId=${requestId}:`, rateLimitErr);
    // Non-blocking fallback: do not crash user requests if rate limiter has internal error
  }

  // 4. Payload Size Limit (10 KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10240) {
    console.error(`[CHAT_ERROR] code=INVALID_INPUT providerStatus=413 model=none requestId=${requestId}`);
    return Response.json(
      {
        ok: false,
        code: "INVALID_INPUT",
        error: "Payload exceeds 10 KB limit.",
        contactEmail: "rajendrabist396@gmail.com",
      },
      { status: 413 }
    );
  }

  // 5. Schema Validation
  const body = await req.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    const issueMessage = parsed.error.issues[0]?.message || "Invalid chat request format.";
    console.error(`[CHAT_ERROR] code=INVALID_INPUT providerStatus=400 model=none requestId=${requestId}`);
    return Response.json(
      {
        ok: false,
        code: "INVALID_INPUT",
        error: issueMessage,
        contactEmail: "rajendrabist396@gmail.com",
      },
      { status: 400 }
    );
  }

  const { message, history: rawHistory, sessionId: clientSessionId } = parsed.data;
  const history = rawHistory.slice(-6);
  const sessionId = clientSessionId || requestId;

  // 6. Gemini Multi-Model Failover Loop
  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const geminiHistory = history.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.content.slice(0, 600) }],
  }));

  const modelCandidates = getModelCandidates();
  let activeModelName = modelCandidates[0];
  let streamResult: any = null;
  let lastProviderStatus = 500;
  let lastErrorMessage = "";

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: PORTFOLIO_CONTEXT,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.4,
        },
      });

      const chat = model.startChat({ history: geminiHistory });
      streamResult = await Promise.race([
        chat.sendMessageStream(message),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("PROVIDER_TIMEOUT")), 15000)
        ),
      ]);

      activeModelName = modelName;
      break; // Successfully initialized stream
    } catch (err: any) {
      const errStr = err?.message || String(err);
      lastErrorMessage = errStr;

      if (errStr.includes("PROVIDER_TIMEOUT")) {
        console.error(`[CHAT_ERROR] code=PROVIDER_TIMEOUT providerStatus=504 model=${modelName} requestId=${requestId}`);
        return Response.json(
          {
            ok: false,
            code: "PROVIDER_TIMEOUT",
            error: "The AI service timed out while generating a response. Please try again.",
            contactEmail: "rajendrabist396@gmail.com",
          },
          { status: 504 }
        );
      }

      if (errStr.includes("API key not valid") || errStr.includes("API_KEY_INVALID")) {
        console.error(`[CHAT_ERROR] code=ASSISTANT_OFFLINE providerStatus=503 model=${modelName} requestId=${requestId}`);
        return Response.json(
          {
            ok: false,
            code: "ASSISTANT_OFFLINE",
            error: "AI Assistant is offline (invalid API key). Please email rajendrabist396@gmail.com directly.",
            contactEmail: "rajendrabist396@gmail.com",
          },
          { status: 503 }
        );
      }

      const isModelNotFound =
        errStr.includes("not found") ||
        errStr.includes("404") ||
        errStr.includes("not supported");

      lastProviderStatus = isModelNotFound ? 404 : 502;
      console.warn(`[CHAT_WARN] Model ${modelName} failed (status=${lastProviderStatus}), trying next candidate...`);
    }
  }

  if (!streamResult) {
    console.error(`[CHAT_ERROR] code=PROVIDER_ERROR providerStatus=${lastProviderStatus} model=${activeModelName} requestId=${requestId}`);
    return Response.json(
      {
        ok: false,
        code: "PROVIDER_ERROR",
        error: "AI provider service error. All model fallbacks failed. Please email rajendrabist396@gmail.com directly.",
        contactEmail: "rajendrabist396@gmail.com",
      },
      { status: 502 }
    );
  }

  // 7. Text Stream Response with Best-Effort Persistence
  return new Response(
    new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullResponse = "";

        try {
          const sanitizer = new StreamTagSanitizer();
          for await (const chunk of streamResult.stream) {
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

          // Best-effort non-blocking database persistence with 2-second timeout
          if (env.MONGODB_URI) {
            const persistPromise = async () => {
              await connectToDatabase();
              await ChatMessage.create({
                sessionId,
                userMessage: message,
                aiResponse: fullResponse,
              });
            };

            void Promise.race([
              persistPromise(),
              new Promise((_, reject) => setTimeout(() => reject(new Error("DB_TIMEOUT")), 2000)),
            ]).catch((loggingError) => {
              console.warn(`[CHAT_WARN] Non-blocking chat transcript logging failed:`, loggingError?.message || loggingError);
            });
          }
        } catch (streamError) {
          console.error(`[CHAT_ERROR] code=INTERNAL providerStatus=500 model=${activeModelName} requestId=${requestId}:`, streamError);
          controller.enqueue(encoder.encode("\n[Error: Stream interrupted.]"));
        } finally {
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Session-Id": sessionId,
        "X-Request-Id": requestId,
        "X-Model-Used": activeModelName,
      },
    }
  );
}
