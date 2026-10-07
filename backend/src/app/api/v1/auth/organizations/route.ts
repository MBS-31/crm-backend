import { NextResponse } from "next/server";
import { organizations } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(organizations);
}
