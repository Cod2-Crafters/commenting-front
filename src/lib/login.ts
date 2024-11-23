import { LoginResponse } from '@/schemas'
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { JWTClaimVerificationOptions, JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from 'jose'
// import { JWTClaimValidationFailed, JWTExpired } from 'jose/errors'
// import { cookies } from 'next/headers'
// import { redirect, RedirectType } from 'next/navigation'
// import { NextRequest, NextResponse } from 'next/server'
// import { decode } from 'punycode'

// const key = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f3')
// const sessionExpireDate = new Date(Date.now() + 3600 * 9 * 1000 + 10200 * 1000) // 12000 seconds
// // 로그인 만료 시간, 아무 동작도 하지 않으면 100분 뒤에 자동 만료됨
// const tokenExpireDate = '6000 s'

// console.log('sessionExpireDate', sessionExpireDate)

export type TokenPayload = {
  user: Omit<LoginResponse, 'id'> & { userid: string }
}


// export async function encrypt(payload: JWTPayload) {
//   return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(tokenExpireDate).sign(key)
// }

// export async function decrypt(input: string) {
//   try {
//     const { payload } = await jwtVerify<TokenPayload>(input, key, {
//       algorithms: ['HS256'],
//     })
//     return payload
//   } catch (error) {
//     const errors: JWTClaimValidationFailed = error
//     console.error('jwt error: ', errors.message)
//   }
// }

// export async function login(formData: FormData) {
//   const tokenPayload: TokenPayload = {
//     user: {
//       userid: formData.get('userid').toString(),
//       email: formData.get('email').toString(),
//       token: formData.get('token').toString(),
//       avatarPath: formData.get('avatarPath').toString(),
//     },
//   }
//   const sessionValue = await encrypt(tokenPayload)
//   cookies().set('session', sessionValue, { expires: sessionExpireDate, httpOnly: true })
// }

// export async function logout() {
//   cookies().delete('session')
// }

// export async function getSession() {
//   'use server'
//   const session = cookies().get('session')?.value
//   console.log('getSession() - session_check', session)
//   if (!session) return null

//   const tokenPayload = await decrypt(session)
//   return tokenPayload
// }

// export async function updateSession(request: NextRequest) {
//   const sessionValue = cookies().get('session')?.value
//   const res = NextResponse.next()
//   try {
//     // 세션이 만료인 경우 -> 로그아웃
//     if (!sessionValue) {
//       console.error('JWT 세션 만료! (세션 없음)')
//       throw Error('JWt session expired')
//       // NextResponse.redirect(new URL('/auth/login', request.url))
//     }

//     console.log('updatesession!')

//     let decodePayload = await decrypt(sessionValue)
//     const { exp } = decodePayload

//     if (exp <= Math.floor(Date.now() / 1000) + 300) {
//       // 만료시간 되기 5분전에 실행 (5분간 아무 응답이 없으면 로그인 세션 만료)
//       const newEncryptToken = await encrypt({ ...decodePayload })
//       res.cookies.set({
//         name: 'session',
//         value: newEncryptToken,
//         httpOnly: true,
//         expires: sessionExpireDate,
//       })
//       // console.info('[!] newToken:', newEncryptToken, '\n', 'sessionExpireDate', sessionExpireDate, 'NEWexpireJWT', exp);
//     }
//     // console.info('now1000:', Math.floor(Date.now() / 1000), 'expire:', exp, '만료까지 남은시간:', exp - Math.floor(Date.now() / 1000), '세션만료:', sessionExpireDate);
//   } catch (error) {
//     // JWt 토큰 만료인 경우 -> 재발급
//     return NextResponse.redirect(new URL('/auth/login', request.url))
//   }
//   return res
// }


// export async function appRedirect(route: string) {
//   redirect(route)
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { JWTClaimValidationFailed } from 'jose/errors'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const key = new TextEncoder().encode('testSecretKey')
const tokenExpireDate = '6000 s';
const sessionExpireDate = new Date(Date.now() + 3600 * 9 * 1000 + 10200 * 1000) // 12000 seconds

// export async function encrypt(payload: any) {
//   return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('4h').sign(key)
// }

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(tokenExpireDate).sign(key)
}

// export async function decrypt(input: string): Promise<any> {
//   const { payload } = await jwtVerify(input, key, {
//     algorithms: ['HS256'],
//   })
//   return payload
// }

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify<TokenPayload>(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    const errors: JWTClaimValidationFailed = error
    console.error('jwt error: ', errors.message)
  }
}

// export async function login(formData: FormData) {
//   console.log(formData)
//   const user = {
//     userId: Number(formData.get('userid')),
//     email: formData.get('email'),
//     token: formData.get('token'),
//     avatarPath: formData.get('avatarPath').toString(),
//   }
//   const sessionValue = await encrypt(tokenPayload)
//   cookies().set('session', sessionValue, { expires: sessionExpireDate, httpOnly: true, secure: true })
// }


export async function login(formData: FormData) {
  const tokenPayload: TokenPayload = {
    user: {
      userid: formData.get('userid').toString(),
      email: formData.get('email').toString(),
      token: formData.get('token').toString(),
      avatarPath: formData.get('avatarPath').toString(),
    },
  }
  const sessionValue = await encrypt(tokenPayload)
  cookies().set('session', sessionValue, { expires: sessionExpireDate, httpOnly: true })
}


export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
  //cookies().delete('session')
}

export async function getSession() {
  'use server'
  const session = cookies().get('session')?.value
  // console.log('getSession() - session_check', session)
  if (!session) return null

  const tokenPayload = await decrypt(session)
  return tokenPayload
}

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get('session')?.value
//   if (!session) return

//   const parsed = await decrypt(session)

//   // console.log('updateSession-parsed:', parsed)
//   parsed.expires = new Date(Date.now() + 10000 * 1000)
//   const res = NextResponse.next()
//   res.cookies.set({
//     name: 'session',
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   })
//   return res
// }


export async function updateSession(request: NextRequest) {
  const sessionValue = cookies().get('session')?.value
  const res = NextResponse.next()
  try {
    // 세션이 만료인 경우 -> 로그아웃
    if (!sessionValue) {
      console.error('JWT 세션 만료! (세션 없음)')
      throw Error('JWt session expired')
      // NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // console.log('updatesession!')

    const decodePayload = await decrypt(sessionValue)
    const { exp } = decodePayload

    if (exp <= Math.floor(Date.now() / 1000) + 300) {
      // 만료시간 되기 5분전에 실행 (5분간 아무 응답이 없으면 로그인 세션 만료)
      const newEncryptToken = await encrypt({ ...decodePayload })
      res.cookies.set({
        name: 'session',
        value: newEncryptToken,
        httpOnly: true,
        expires: sessionExpireDate,
      })
      // console.info('[!] newToken:', newEncryptToken, '\n', 'sessionExpireDate', sessionExpireDate, 'NEWexpireJWT', exp);
    }
    // console.info('now1000:', Math.floor(Date.now() / 1000), 'expire:', exp, '만료까지 남은시간:', exp - Math.floor(Date.now() / 1000), '세션만료:', sessionExpireDate);
  } catch (error) {
    // JWt 토큰 만료인 경우 -> 재발급
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  return res
}


export async function appRedirect(route: string) {
  redirect(route)
}

// use it with async-await
