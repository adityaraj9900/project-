import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, projects, milestones, payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));

  const clientProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.clientId, session.user.id));

  const projectIds = clientProjects.map((p) => p.id);
  const allMilestones = projectIds.length
    ? await Promise.all(
        projectIds.map((id) =>
          db.select().from(milestones).where(eq(milestones.projectId, id))
        )
      )
    : [];

  const clientPayments = await db
    .select()
    .from(payments)
    .where(eq(payments.userId, session.user.id));

  return NextResponse.json({
    user,
    projects: clientProjects.map((p, i) => ({
      ...p,
      milestones: allMilestones[i] ?? [],
    })),
    payments: clientPayments,
  });
}
