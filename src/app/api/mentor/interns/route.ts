import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { enrollments, programs, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select({ enrollment: enrollments, program: programs, student: users })
    .from(enrollments)
    .leftJoin(programs, eq(enrollments.programId, programs.id))
    .leftJoin(users, eq(enrollments.studentId, users.id));

  return NextResponse.json(rows);
}
