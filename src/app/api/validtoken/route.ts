import { decrypt } from "@/lib/login";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = cookies().get('session');
    let payload = {};
    if (session) {
        payload = await decrypt(session.value);
    }

    return NextResponse.json({token: session?.value || '', ...payload});
}