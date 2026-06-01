import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates, users, programs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  const [cert] = db.select().from(certificates).where(eq(certificates.certificateNo, id)).limit(1).all();
  if (!cert || cert.status !== "approved") {
    return NextResponse.json({ found: false });
  }
  const [user] = db.select().from(users).where(eq(users.id, cert.studentId)).limit(1).all();
  const [program] = db.select().from(programs).where(eq(programs.id, cert.programId)).limit(1).all();
  return NextResponse.json({ found: true, name: user?.name, program: program?.title, issuedAt: cert.issuedAt, certNo: cert.certificateNo });
}
