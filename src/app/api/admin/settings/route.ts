import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";

export async function GET() {
  const all = db.select().from(settings).all();
  const obj: Record<string, string> = {};
  all.forEach(s => { obj[s.key] = s.value; });
  return NextResponse.json({ settings: obj });
}

export async function POST(req: NextRequest) {
  const body: Record<string, string> = await req.json();
  for (const [key, value] of Object.entries(body)) {
    db.insert(settings).values({ key, value }).onConflictDoUpdate({ target: settings.key, set: { value } }).run();
  }
  return NextResponse.json({ ok: true });
}
