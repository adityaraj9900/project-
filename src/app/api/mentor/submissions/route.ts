import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { submissions, tasks, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select({ submission: submissions, task: tasks, student: users })
    .from(submissions)
    .leftJoin(tasks, eq(submissions.taskId, tasks.id))
    .leftJoin(users, eq(submissions.studentId, users.id));

  return NextResponse.json(rows);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status, feedback, pointsEarned } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await db
    .update(submissions)
    .set({ status, feedback, pointsEarned })
    .where(eq(submissions.id, id));

  return NextResponse.json({ ok: true });
}
