import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const orgId = body.orgId || "org_abc";
  return NextResponse.json({ success: true, orgId });
}
