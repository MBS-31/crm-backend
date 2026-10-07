import { NextResponse } from "next/server";
import { mockStorageMetrics } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockStorageMetrics);
}
