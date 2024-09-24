'use client'
import { setCredentials } from '@/app/auth/authSlice'
import { RootState } from '@/store'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  session?: string
  children: ReactNode
}

const TokenProvider = ({ session, ...props }: Props) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  console.log('auth-provider-token-1', auth.token)
  const sessionObj = JSON.parse(session)

  if (sessionObj) {
    if (auth.token == null) {
      dispatch(
        setCredentials({
          user: { email: sessionObj.user.email },
          token: sessionObj.user.token,
          userId: sessionObj.user.userId
        }),
      )
    }
  }

  return <>{props.children}</>
}

export default TokenProvider
