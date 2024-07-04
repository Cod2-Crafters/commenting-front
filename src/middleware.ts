import { NextRequest, NextResponse } from 'next/server'
import { getSession, updateSession } from './lib/login'

async function runMiddleware(req: NextRequest, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, new Response(), (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const session = await getSession()

  //TODO
  // 특정 경로 타거나
  // 아무튼 익명 유저 페이지 볼 수 있어야함.

  // 로그인 페이지 또는 로그인 처리 페이지는 리디렉션 예외로 설정
  //   if (
  //     pathname.startsWith('/auth/login') ||
  //     pathname.startsWith('/auth/register') ||
  //     pathname.startsWith('/api/login')
  //   ) {
  //     return NextResponse.next()
  //   }

  // 세션이 없는 경우 로그인 페이지로 리디렉션
  //   if (!session) {
  //     return NextResponse.redirect(new URL('/auth/login', req.url))
  //   }

  // 세션이 있는 경우 세션 업데이트
  const updatedResponse = await updateSession(req)
  if (updatedResponse) {
    return updatedResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
}
