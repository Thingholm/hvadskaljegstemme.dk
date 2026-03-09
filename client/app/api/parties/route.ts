import { NextResponse } from "next/server";
import { mockParties } from "@/lib/mock-data";

export async function GET() {
    return NextResponse.json(mockParties);
}
