'use client'
import { setCredentials } from '@/app/auth/authSlice'
import { TokenPayload } from '@/lib/login'
import { RootState } from '@/store'
import { JWTPayload } from 'jose'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  session?: JWTPayload & TokenPayload
  children: ReactNode
}

const TokenProvider = ({ session, ...props }: Props) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  console.log('token-provider:', session);

  if (session && !auth.token) {
    dispatch(
      setCredentials({
        user: {
          ...session.user
        },
        token: session.user.token
      }),
    )
  }

  return <>{props.children}</>
}

export default TokenProvider
