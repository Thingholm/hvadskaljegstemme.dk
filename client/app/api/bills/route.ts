import { NextResponse } from "next/server";
import { mockBills } from "@/lib/mock-data";

export async function GET() {
    return NextResponse.json(mockBills);
}
