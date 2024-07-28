/* eslint-disable no-case-declarations */
'use client'

import { setCredentials } from '@/app/auth/authSlice'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {

  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as z from 'zod'

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })


  useEffect(() => {
    const handleMessage = (event: {
      origin: string
      data: { token: string }
    }) => {
      if (event.origin !== 'http://localhost:3000') return
      const { token } = event.data
      if (token) {
        console.log('Received token:', token)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [router])

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/member/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          provider: 'BASE',
        }),
      })
        .then(async (response) => {
          const data = await response.json()
          if (response.ok) {
            setSuccess('로그인이 성공적으로 완료되었습니다.')
            console.log('#login success response data:', data)
            fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userid: data.data.id,
                email: values.email,
                token: data.data.token,
              }),
            }).then(async (cookieResponse) => {
              console.log(cookieResponse)
              if (cookieResponse.ok) {
                dispatch(
                  setCredentials({
                    user: { email: values.email },
                    token: data.data.token,
                    // token : data
                  }),
                )
                router.push('/')
                // console.log("쿠키 set!");
              }
            })

            // console.log(data.data.token);
          } else {
            setError(data.message || '로그인에 실패했습니다.')
          }
        })
        .catch(() => {
          setError('네트워크 오류가 발생했습니다.')
        })
    })
  }

  const handleOAuthLogin = (
    event: React.MouseEvent<HTMLButtonElement>,
    provider: string,
  ) => {
    event.preventDefault()
    console.log(provider)
    // switch(provider){
    //     case 'kakao':
    //         const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    //         window.location.href = kakaoUrl;
    //         break;
    //     case 'google':
    //         const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email+profile`;
    //         window.open(googleUrl, '구글 로그인', 'width=700px, height=700px, scrollbars=yes');
    //         break;
    //     default:
    //         break;
    // }
  }

  return (
    <div>
      <h1 className="text-[25px] font-semibold text-center text-white pb-[20px]">
        코멘팅 로그인
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="이메일"
                      // type="email"
                      className="bg-surface w-[462px] h-[62.35px] rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="비밀번호"
                      type="password"
                      className="bg-surface w-[462px] h-[62.35px] rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-[462px] h-[62.35px] rounded-md text-black text-[18px]"
          >
            로그인
          </Button>
          <div className="flex flex-row justify-center mt-4 space-x-10">
            <Link href="/find-id-pw" className="text-white">
              ID/PW찾기
            </Link>
            <Link href="/auth/register" className="text-white">
              회원가입
            </Link>
          </div>
          <div className="flex justify-center mt-10 space-x-20">
            <button
              onClick={(e) => handleOAuthLogin(e, 'google')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
            >
              <Image
                src="/icons/google.png"
                alt="구글 로그인"
                width={50}
                height={50}
              />
            </button>
            <button
              onClick={(e) => handleOAuthLogin(e, 'kakao')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
            >
              <Image
                src="/icons/kakao.png"
                alt="카카오톡 로그인"
                width={50}
                height={50}
              />
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
