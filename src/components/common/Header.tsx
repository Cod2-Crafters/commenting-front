'use client'
interface HeaderProps {}

import Image from 'next/image'
import Link from 'next/link'
import HamburgerIcon from '/public/assets/ham.svg'

const Header = (props: HeaderProps) => {
  return (
    <header className="bg-background">
      <div className="flex max-w-[1230px] m-auto py-8 justify-between items-center px-2">
        <Link href={'/'}>
          <h2 className="text-primary font-light text-2xl">
            <Image src="/assets/logo.png" alt="logo" width={75} height={25} />
          </h2>
        </Link>
        <div className="cursor-pointer">
          <HamburgerIcon width={25} height={11} />
        </div>
      </div>
      <hr className="border-muted outline-none" />
    </header>
  )
}

export default Header
