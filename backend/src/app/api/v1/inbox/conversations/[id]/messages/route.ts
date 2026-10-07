import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const newMsg = {
    id: `msg_${Date.now()}`,
    sender: "Rahul Sharma",
    senderRole: "rep",
    timestamp: "Just now",
    content: body.content || "",
    channel: body.channel || "email",
    aiGenerated: false,
  };
  return NextResponse.json(newMsg, { status: 201 });
}
