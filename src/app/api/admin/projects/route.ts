import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, users, milestones } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const all = db.select().from(projects).all();
  const result = all.map(p => {
    const [client] = db.select().from(users).where(eq(users.id, p.clientId)).limit(1).all();
    const ms = db.select().from(milestones).where(eq(milestones.projectId, p.id)).all();
    return { ...p, clientName: client?.name ?? "Unknown", milestones: ms };
  });
  return NextResponse.json({ projects: result });
}
