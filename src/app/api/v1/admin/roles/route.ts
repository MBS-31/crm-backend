import { NextResponse } from "next/server";
import { mockRolePermissions } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockRolePermissions);
}
