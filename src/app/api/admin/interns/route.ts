import { NextResponse } from "next/server";
import { db } from "@/db";
import { enrollments, users, programs, certificates, offerLetters } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const enrolls = db.select({ id: enrollments.id, studentId: enrollments.studentId, programId: enrollments.programId, progress: enrollments.progress, status: enrollments.status })
    .from(enrollments).all();
  const interns = enrolls.map(e => {
    const [user] = db.select().from(users).where(eq(users.id, e.studentId)).limit(1).all();
    const [prog] = db.select().from(programs).where(eq(programs.id, e.programId)).limit(1).all();
    const [cert] = db.select().from(certificates).where(eq(certificates.studentId, e.studentId)).limit(1).all();
    const [offer] = db.select().from(offerLetters).where(eq(offerLetters.studentId, e.studentId)).limit(1).all();
    return { id: e.studentId, name: user?.name ?? "Unknown", email: user?.email ?? "", programId: e.programId, programTitle: prog?.title ?? "Unknown", progress: e.progress, status: e.status, hasCert: !!cert, hasOffer: !!offer };
  });
  return NextResponse.json({ interns });
}
