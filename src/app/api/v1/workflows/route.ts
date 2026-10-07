import { NextResponse } from "next/server";
import { mockWorkflows } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockWorkflows);
}
