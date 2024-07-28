'use client'
interface HeaderProps { }

import Image from 'next/image'
import Link from 'next/link'
import HamburgerIcon from '/public/assets/ham.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { clearCredentials } from '@/app/auth/authSlice'

const Header = (props: HeaderProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();


  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      console.log(response)
      if (response.ok) {
        dispatch(clearCredentials());
        window.location.reload();
      }
    })
  }
  const login = () => {
    router.push('/auth/login');
  }
  return (
    <header className="fixed top-0 left-0 w-full bg-background">
      <div className="flex max-w-[1230px] m-auto py-8 justify-between items-center px-2">
        <Link href={'/'}>
          <h2 className="text-primary font-light text-2xl">
            <Image src="/assets/logo.png" alt="logo" width={75} height={25} />
          </h2>
        </Link>
        <div className="cursor-pointer">
          <div className='flex items-center'>
            <div className='pr-10'>
              <HamburgerIcon width={25} height={11} />
            </div>
            {token ? (
              <Button
                className="w-[62px] h-[32px] text-black"
                onClick={logout}
              >
                로그아웃
              </Button>
            ) : (
              <Button
                className="w-[62px] h-[32px] text-black"
                onClick={login}
              >
                로그인
              </Button>
            )}
          </div>

        </div>

      </div>
      <hr className="border-muted outline-none" />
    </header>
  )
}

export default Header
