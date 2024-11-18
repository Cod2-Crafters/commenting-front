import { login } from '@/lib/login'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userid, email, token, avatarPath } = await req.json()

  const loginFormData = new FormData()
  loginFormData.append('userid', userid)
  loginFormData.append('email', email)
  loginFormData.append('token', token)
  loginFormData.append('avatarPath', avatarPath)

  await login(loginFormData)

  return NextResponse.json({ message: '로그인 성공' })
}
