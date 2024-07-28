/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const key = new TextEncoder().encode('testSecretKey')

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('4h').sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function login(formData: FormData) {
  const user = {
    id: Number(formData.get('userid')),
    email: formData.get('email'),
    token: formData.get('token'),
  }

  const expires = new Date(Date.now() + 10000 * 1000)
  const session = await encrypt({ user, expires })

  cookies().set('session', session, { expires, httpOnly: true })
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
  //cookies().delete('session')
}

export async function getSession() {
  'use server'
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  const parsed = await decrypt(session)
  // console.log('updateSession-parsed:', parsed)
  parsed.expires = new Date(Date.now() + 10000 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}

export async function appRedirect(route: string) {
  redirect(route)
}

// use it with async-await
