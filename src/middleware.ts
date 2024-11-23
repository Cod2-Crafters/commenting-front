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
    // pathname == '/' ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/api/login')  ||
    pathname.startsWith('/auth/login')  || 
    pathname.startsWith('/api/logout')  ||
    pathname.startsWith('/api/validtoken')
  ) {
    const response = NextResponse.next();
    console.log('토큰검증 예외처리:' + pathname)
    return response;
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    // '/((?!api|_next|static|favicon.ico).*)',
    // "/((?!api|_next/*|static|public/*|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)', 
  ],
}
