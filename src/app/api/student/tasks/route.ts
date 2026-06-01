import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { tasks, enrollments, submissions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.studentId, session.user.id));

  if (!enrollment) return NextResponse.json([]);

  const programTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.programId, enrollment.programId));

  const userSubmissions = await db
    .select()
    .from(submissions)
    .where(eq(submissions.studentId, session.user.id));

  const submissionMap = new Map(userSubmissions.map((s) => [s.taskId, s]));

  return NextResponse.json(
    programTasks.map((t) => ({ ...t, dueDate: t.deadline, submission: submissionMap.get(t.id) ?? null }))
  );
}
