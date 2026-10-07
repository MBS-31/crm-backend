import { NextResponse } from "next/server";
import { mockRadarMetrics } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockRadarMetrics);
}
