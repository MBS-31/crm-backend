import { NextResponse } from "next/server";
import { mockInfraServices } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockInfraServices);
}
