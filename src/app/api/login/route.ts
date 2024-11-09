import { login } from '@/lib/login'
import { LoginResponse } from '@/schemas'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { id: userid, email, token, avatarPath }: LoginResponse = await req.json()

  const loginFormData = new FormData()
  loginFormData.append('userid', userid.toString())
  loginFormData.append('email', email)
  loginFormData.append('token', token)
  loginFormData.append('avatarPath', avatarPath)

  console.log('[/api/login] 로그인 성공:', loginFormData.getAll('userid'));
  await login(loginFormData)

  return NextResponse.json({ message: '로그인 성공' })
}
