import { decrypt, getSession } from "@/lib/login";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const sessionPayload = await getSession();

    return NextResponse.json(sessionPayload);
}