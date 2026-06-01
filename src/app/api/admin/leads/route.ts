import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const all = db.select().from(leads).all();
  return NextResponse.json({ leads: all });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  db.update(leads).set({ status }).where(eq(leads.id, id)).run();
  return NextResponse.json({ ok: true });
}
