import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { nanoid } from "nanoid";

export async function GET() {
  const all = db.select().from(announcements).all();
  return NextResponse.json({ announcements: all });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ann = { id: `ann_${nanoid(8)}`, title: body.title, body: body.body, audience: body.audience ?? "all", createdAt: new Date().toISOString().slice(0, 10) };
  db.insert(announcements).values(ann).run();
  return NextResponse.json({ announcement: ann });
}
