import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET() {
  const all = db.select().from(blogs).all();
  return NextResponse.json({ posts: all });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const post = { id: `blog_${nanoid(8)}`, slug, title: body.title, category: body.category, excerpt: body.excerpt, content: body.content, author: "Admin", published: true, publishedAt: new Date().toISOString().slice(0, 10) };
  db.insert(blogs).values(post).run();
  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest) {
  const { id, published } = await req.json();
  db.update(blogs).set({ published }).where(eq(blogs.id, id)).run();
  return NextResponse.json({ ok: true });
}
