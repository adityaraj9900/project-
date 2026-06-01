import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { offerLetters, lors } from "@/db/schema";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const { type, studentId, programId, content } = await req.json();
  if (type === "offer") {
    db.insert(offerLetters).values({ id: `ol_${nanoid(8)}`, studentId, programId, issuedAt: new Date().toISOString().slice(0, 10), content }).onConflictDoNothing().run();
  } else {
    db.insert(lors).values({ id: `lor_${nanoid(8)}`, studentId, programId, issuedAt: new Date().toISOString().slice(0, 10), content }).onConflictDoNothing().run();
  }
  return NextResponse.json({ ok: true });
}
