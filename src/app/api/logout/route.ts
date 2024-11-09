import { login, logout } from "@/lib/login";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){

    await logout();
    return NextResponse.redirect(new URL('/auth/login', req.url))
}

export async function POST(req: NextRequest){

    await logout();
    return NextResponse.redirect(new URL('/auth/login', req.url))
}