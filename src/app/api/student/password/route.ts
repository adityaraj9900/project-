import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { current, next } = await req.json();
  if (!current || !next) return NextResponse.json({ error: "Both passwords required" }, { status: 400 });

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });

  const hash = await bcrypt.hash(next, 12);
  await db.update(users).set({ passwordHash: hash }).where(eq(users.id, session.user.id));

  return NextResponse.json({ ok: true });
}
