import { NextResponse } from "next/server";
import { mockNotifications } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockNotifications);
}
