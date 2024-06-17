import { login, logout } from "@/lib/login";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){

    await logout();

    return NextResponse.json({message : "로그아웃 성공"});
}