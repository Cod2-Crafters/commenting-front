'use client'

import { store } from '@/store'
// import { SessionProvider } from "next-auth/react"
import React from 'react'
import { Provider } from 'react-redux'

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <>{children}</>
    </Provider>
    // <SessionProvider>{children}</SessionProvider>
    // <>{children}</>
  )
}

export default AuthProvider
