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
import { useNotificationStore } from '@/stores/notifiicationStore'

const Header = (props: HeaderProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;
  const { clearEventSource } = useNotificationStore();



  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      console.log(response)
      if (response.ok) {
        clearEventSource();
        dispatch(clearCredentials());
        window.location.reload();
      }
    })
  }
  const login = () => {
    router.push('/auth/login');
  }
  return (
    <header className=" fixed top-0 left-0 w-full bg-background " style={{ zIndex: 100 }}>
      <div className="flex max-w-[1230px] m-auto py-8 justify-between items-center px-2">
        <Link href={'/'}>
          <h2 className="text-primary font-light text-2xl">
            <Image src="/assets/logo.png" alt="logo" width={75} height={25} />
          </h2>
        </Link>
        <div className="cursor-pointer">
          <div className='flex items-center'>
            <div className='pr-10 space-x-4 flex flex-row'>
              <div className='relative flex flex-row'>
                <Image src="/icons/bell.png" alt="bell" width={15} height={10} onClick={() => {
                  router.push('/notifications');
                }} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-8 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
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
