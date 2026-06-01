import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { offerLetters, certificates, lors, enrollments, programs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enroll = await db
    .select({ enrollment: enrollments, program: programs })
    .from(enrollments)
    .leftJoin(programs, eq(enrollments.programId, programs.id))
    .where(eq(enrollments.studentId, session.user.id))
    .limit(1);

  const [offerLetter] = await db
    .select()
    .from(offerLetters)
    .where(eq(offerLetters.studentId, session.user.id));

  const [certificate] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.studentId, session.user.id));

  const [lor] = await db
    .select()
    .from(lors)
    .where(eq(lors.studentId, session.user.id));

  return NextResponse.json({
    enrollment: enroll[0] ?? null,
    offerLetter: offerLetter
      ? { ...offerLetter, issuedAt: offerLetter.issuedAt }
      : null,
    certificate: certificate
      ? { ...certificate, certNumber: certificate.certificateNo }
      : null,
    lor: lor ?? null,
  });
}
