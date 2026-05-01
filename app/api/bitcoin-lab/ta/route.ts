import { NextResponse } from "next/server";
import { generateMockData } from "@/lib/data/mock";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = generateMockData("ta");
  return NextResponse.json(data);
}