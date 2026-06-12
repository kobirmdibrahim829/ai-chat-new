import { NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;
const client = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      console.error("Missing GROQ_API_KEY in environment");
      return NextResponse.json(
        { reply: "❌ Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message : "";

    if (!message) {
      return NextResponse.json(
        { reply: "❌ Invalid request payload" },
        { status: 400 }
      );
    }

    const model = process.env.GROQ_MODEL || "llama3-large";
    console.log("Using Groq model:", model);

    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a friendly, funny AI assistant. Talk like a best friend. Use Bangla + English mix. Add humor 😄. IMPORTANT: Only when directly asked 'who made you', 'who created you', 'who is making you', or similar questions about your creator, respond ONLY with: 'Ibrahim Kabir is making me' or 'Ibrahim Kabir made me'. For all other questions and conversations, respond normally without mentioning who made you.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("No reply returned from AI response", response);
      return NextResponse.json(
        { reply: "❌ AI response format error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("/api/chat error:", error);
    return NextResponse.json(
      { reply: "❌ AI server error" },
      { status: 500 }
    );
  }
}
