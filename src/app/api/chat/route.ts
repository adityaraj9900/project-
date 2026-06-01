import { NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Orbit, the friendly AI assistant for ORBITIX IT Solutions — a premium IT agency + free internship platform based in India.

CRITICAL RULES:
- Internship programs are 100% FREE for students. Zero charges. No certificate fee. No hidden costs. EVER.
- If anyone asks about student payments or internship fees, firmly clarify it's completely free.
- Client services (web apps, SaaS, AI, etc.) have starting prices in INR (₹).
- You are concise, helpful, and professional with a warm tone.

ABOUT ORBITIX:
- Agency services: website development, web apps, SaaS, AI integration, mobile apps, UI/UX, e-commerce, CRM/ERP, and more (20 services total)
- Free internship tracks: Full-Stack Product Engineering (12 weeks), AI Automation Systems (10 weeks), UI/UX Product Design (8 weeks)
- All internship certificates, offer letters, and LORs are FREE
- Contact: admin@orbitix.in

SERVICE PRICING (starting prices):
- Website Development: ₹45,000+
- Web App Development: ₹85,000+
- SaaS Development: ₹1,50,000+
- AI Integration: ₹65,000+
- Mobile App: ₹1,20,000+
- UI/UX Design: ₹45,000+
- Landing Page: ₹30,000+

Keep responses under 3 sentences unless asked for detail. Be direct and helpful.`;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI not configured" }, { status: 500 });
  }

  try {
    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Chat unavailable" }, { status: 500 });
  }
}
