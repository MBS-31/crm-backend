import { NextResponse } from "next/server";
import { mockCallRecording } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockCallRecording);
}
