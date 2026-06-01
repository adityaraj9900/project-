import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { payments, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const all = db.select().from(payments).all();
  const result = all.map(p => {
    const [user] = db.select().from(users).where(eq(users.id, p.userId)).limit(1).all();
    return { ...p, userName: user?.name ?? "Unknown" };
  });
  return NextResponse.json({ payments: result });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  db.update(payments).set({ status }).where(eq(payments.id, id)).run();
  return NextResponse.json({ ok: true });
}
