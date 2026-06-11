import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGemini() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}
