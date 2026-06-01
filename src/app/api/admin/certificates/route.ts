import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates, enrollments, programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const { studentId } = await req.json();
  const [enroll] = db.select().from(enrollments).where(eq(enrollments.studentId, studentId)).limit(1).all();
  if (!enroll) return NextResponse.json({ error: "No enrollment" }, { status: 404 });
  const certNo = `ORB-${enroll.programId.slice(2, 4).toUpperCase()}-2026-${nanoid(4).toUpperCase()}`;
  db.insert(certificates).values({ id: `c_${nanoid(8)}`, certificateNo: certNo, studentId, programId: enroll.programId, status: "approved", issuedAt: new Date().toISOString().slice(0, 10) }).onConflictDoNothing().run();
  return NextResponse.json({ ok: true, certNo });
}
