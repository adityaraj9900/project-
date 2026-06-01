import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { submissions, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select({ submission: submissions, task: tasks })
    .from(submissions)
    .leftJoin(tasks, eq(submissions.taskId, tasks.id))
    .where(eq(submissions.studentId, session.user.id));

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { taskId, githubUrl, liveUrl } = await req.json();
  if (!taskId) return NextResponse.json({ error: "taskId required" }, { status: 400 });

  const existing = await db
    .select()
    .from(submissions)
    .where(eq(submissions.taskId, taskId));

  const mine = existing.find((s) => s.studentId === session.user.id);

  if (mine) {
    await db
      .update(submissions)
      .set({ githubUrl, liveUrl, status: "submitted" })
      .where(eq(submissions.id, mine.id));
    return NextResponse.json({ ok: true, id: mine.id });
  }

  const id = `sub_${nanoid(10)}`;
  await db.insert(submissions).values({
    id,
    taskId,
    studentId: session.user.id,
    githubUrl,
    liveUrl,
    status: "submitted",
  });

  return NextResponse.json({ ok: true, id });
}
