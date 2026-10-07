import { NextResponse } from "next/server";
import { mockSalesCoaching } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockSalesCoaching);
}
