import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    db.insert(leads).values({
      id: `l_${nanoid(8)}`,
      name: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone,
      company: body.company,
      serviceId: body.service,
      budget: body.budget,
      message: body.message,
      status: "New",
    }).run();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
