import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, profiles, enrollments, programs, announcements } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, session.user.id));

  const enroll = await db
    .select({ enrollment: enrollments, program: programs })
    .from(enrollments)
    .leftJoin(programs, eq(enrollments.programId, programs.id))
    .where(eq(enrollments.studentId, session.user.id))
    .limit(1);

  const latestAnnouncements = await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.createdAt))
    .limit(3);

  return NextResponse.json({
    user,
    profile: profile ?? null,
    enrollment: enroll[0] ?? null,
    announcements: latestAnnouncements,
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, city, github, linkedin, portfolio, bio } = body;

  await db
    .update(users)
    .set({ name: name ?? undefined })
    .where(eq(users.id, session.user.id));

  const existing = await db.select().from(profiles).where(eq(profiles.userId, session.user.id));
  if (existing.length > 0) {
    await db
      .update(profiles)
      .set({ phone, city, github, linkedin, portfolio, bio })
      .where(eq(profiles.userId, session.user.id));
  } else {
    await db.insert(profiles).values({
      userId: session.user.id,
      phone, city, github, linkedin, portfolio, bio,
    });
  }

  return NextResponse.json({ ok: true });
}
