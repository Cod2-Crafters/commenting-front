import { NextRequest, NextResponse } from 'next/server'
import { getSession, updateSession } from './lib/login'
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('middleware pathname', pathname);
  const allCookies = cookies().getAll()
  
  console.log('전체 req 쿠키: --- start\n', allCookies, "\n------ end")

  // 로그인 페이지 또는 로그인 처리 페이지는 리디렉션 예외로 설정
  if (
    // pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/api/login') ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // 세션이 없는 경우 로그인 페이지로 리디렉션
  if (!allCookies || !allCookies.length) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // 세션이 있는 경우 세션 업데이트
  const updatedResponse = await updateSession(request)
  if (updatedResponse) {
    return updatedResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // '/((?!api|_next|static|favicon.ico).*)',
    "/((?!api|_next/static|_next/image|public/*|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
}
