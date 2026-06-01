import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content, name, program, type } = await req.json();
  // Return plain text as PDF placeholder (real jsPDF is client-side only)
  const text = content ?? `Document for ${name} — ${program}`;
  const blob = new Blob([text], { type: "text/plain" });
  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${type}-${name?.replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
