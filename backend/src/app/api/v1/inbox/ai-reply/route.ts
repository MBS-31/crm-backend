import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({
    draft: `Hi ${body.recipientName || "there"}, thank you for reaching out. Based on your recent milestones, we can activate the updated terms and enterprise licensing today. Let us know if 3:00 PM works for a quick walkthrough.`
  });
}
