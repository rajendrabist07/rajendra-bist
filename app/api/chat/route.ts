import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getGemini } from "@/lib/gemini";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import ChatMessage from "@/models/ChatMessage";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const rateLimitMap = new Map<string, { count: number; expires: number }>();

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);

  if (!existing || existing.expires < now) {
    rateLimitMap.set(ip, { count: 1, expires: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  rateLimitMap.set(ip, {
    count: existing.count + 1,
    expires: existing.expires,
  });
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await req.json();
  const message = String(body.message || "").trim();
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await connectToDatabase();

  const chatInput = [
    { role: "system", content: PORTFOLIO_CONTEXT },
    ...history.map((item: any) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.content || ""),
    })),
    { role: "user", content: message },
  ];

  const gemini = getGemini();
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContentStream({
    contents: chatInput.map((item) => ({
      role: item.role === "system" ? "user" : item.role,
      parts: [{ text: item.content }],
    })),
  });

  let aiResponse = "";
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text && text.length > 0) {
            aiResponse += text;
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
        void ChatMessage.create({
          sessionId: ip,
          userMessage: message,
          aiResponse,
        }).catch(() => {
          /** Fire and forget logging failure */
        });
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
