import Header from '@/components/common/Header'
import { getSession } from '@/lib/login'
import AuthProvider from '@/providers/next-auth'
import TokenProvider from '@/providers/next-auth/TokenProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
// import { Provider } from 'react-redux';
// import {store} from '@/store'

const inter = Inter({ subsets: ['latin'] })

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/woff2/Pretendard-Black.woff2',
      weight: '900',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-ExtraBold.woff2',
      weight: '800',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/woff2/Pretendard-ExtraLight.woff2',
      weight: '200',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '코멘팅',
  description: 'Generated by Cod2-Crafters',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  console.log('rootLayout-session:', session)

  return (
    <html lang="en" className={`${pretendard.variable} h-full`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
        
      <body className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-modern-gray to-medium-gray h-full">
        <AuthProvider>
          <TokenProvider session={JSON.stringify(session)}>
            <Header />
            <div className="pt-16 mt-16 flex-grow">{children}</div>
          </TokenProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
