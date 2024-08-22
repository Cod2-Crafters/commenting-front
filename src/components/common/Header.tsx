'use client'
interface HeaderProps { }

import { RootState } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { Button } from '../ui/button'
import HamburgerIcon from '/public/assets/ham.svg'
import { clearCredentials } from '@/app/auth/authSlice'
import { useNotificationStore } from '@/stores/notifiicationStore'

const Header = (props: HeaderProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;
  const { clearEventSource } = useNotificationStore();



  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const logout = () => {

    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      setIsMenuVisible(false)

      if (response.ok) {
        clearEventSource();
        dispatch(clearCredentials());
        window.location.reload();
      }
    })
  }
  const login = () => {
    console.log('로그인')
    router.push('/auth/login');
    setIsMenuVisible(false)
  }
  const navigateSpace = (event: MouseEvent) => {
    router.push('/space')
  }

  const handleOnMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsMenuVisible((prev) => !prev)
  }

  const ref = useOutsideClick(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false)
    }
  })

  return (
    <header className=" fixed top-0 left-0 w-full bg-background " style={{ zIndex: 100 }}>
      <div className="flex max-w-[1230px] m-auto py-8 justify-between items-center px-2">
        <a href={'/'}>
          <h2 className="text-primary font-light text-2xl">
            <Image src="/assets/logo.png" alt="logo" width={75} height={25} />
          </h2>
        </a>
        <div
          ref={ref}
          className="cursor-pointer focus:text-red-300 focus:bg-red-300"
        >
          <div className="flex items-center relative w-full">
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
            <Button variant={'link'} onClick={handleOnMenuClick}>

              <HamburgerIcon width={25} height={11} />
            </Button>
            {/* <div className="pr-10"></div> */}
            {/* round menu */}

            <div
              className={`absolute top-10 right-0 cursor-default ${!isMenuVisible ? 'hidden' : 'visibility'} `}
            >
              <div className="bg-black min-h-20 rounded-2xl py-6 px-10">
                <div className="flex flex-col space-y-2 m-auto">
                  {/* menu items */}
                  <div className="text-white text-nowrap">
                    <Link href={'/space'}>
                      <Button
                        variant={null}
                        className="hover:bg-surface rounded-md block p-2 transition-colors text-left w-full"
                        onClick={handleOnMenuClick}
                      >
                        내 스페이스
                      </Button>
                    </Link>
                  </div>

                  <div className="text-white text-nowrap">
                    <Link href={'/notification'}>
                      <Button
                        variant={null}
                        className="hover:bg-surface rounded-md block p-2 transition-colors text-left w-full"
                        onClick={handleOnMenuClick}
                      >
                        알림
                      </Button>
                    </Link>
                  </div>

                  <div className="text-white text-nowrap">
                    {/* <Link href={'#'}> */}

                    {token ? (
                      <Button
                        variant={null}
                        className="hover:bg-surface rounded-md block p-2 transition-colors text-left w-full"
                        onClick={(event) => {
                          handleOnMenuClick(event)
                          logout()
                        }}
                      >
                        로그아웃
                      </Button>
                    ) : (
                      <Button variant={null} className="hover:bg-surface rounded-md block p-2 transition-colors text-left w-full" onClick={login}>
                        로그인
                      </Button>
                    )}

                    {/* </Link> */}
                    {/* 
                    <Button
                      variant={null}
                      className="hover:bg-surface rounded-md block p-2 transition-colors text-left w-full"
                      onClick={(event) => {
                        handleOnMenuClick(event)
                        logout()
                      }}
                    >
                      로그아웃
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* {token ? (
              <Button className="w-[62px] h-[32px] text-black" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <Button className="w-[62px] h-[32px] text-black" onClick={login}>
                로그인
              </Button>
            )}

            <Button
              className="w-[62px] h-[32px] text-black"
              onClick={navigateSpace}
            >
              스페이스로 이동
            </Button> */}
          </div>
        </div>
      </div>
      <hr className="border-muted outline-none" />
    </header>
  )
}

export default Header
