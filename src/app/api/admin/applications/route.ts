import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { applications, users, programs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = db.select({ id: applications.id, studentId: applications.studentId, programId: applications.programId, status: applications.status, motivation: applications.motivation, createdAt: applications.createdAt, studentName: users.name, studentEmail: users.email, programTitle: programs.title })
    .from(applications)
    .leftJoin(users, eq(users.id, applications.studentId))
    .leftJoin(programs, eq(programs.id, applications.programId))
    .all();
  return NextResponse.json({ applications: rows });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  db.update(applications).set({ status }).where(eq(applications.id, id)).run();
  return NextResponse.json({ ok: true });
}
