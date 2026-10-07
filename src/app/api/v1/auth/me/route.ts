import { NextResponse } from "next/server";
import { currentUser } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(currentUser);
}
