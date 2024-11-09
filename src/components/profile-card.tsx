'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getImageUrl } from '@/lib/utils'

import Image from 'next/image'

interface ProfileCardProps {
  name: string
  imagePath: string
}

const ProfileCard = ({ name, imagePath }: ProfileCardProps) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      {/* <span className="rounded-full">
                              <DefaultUserIcon width={50} height={50} />
                            </span> */}
      {/* before:bg-gradient-to-bl before:from-indigo-500 before:w-[50px] before:content-['_'] before:h-[50px] before:absolute before:top-0 before:rounded-full before:z-10 */}
      <div className="rounded-full relative">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src={getImageUrl(imagePath)} alt="profile" />
          <AvatarFallback>
            <div>
              <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={50} height={50} />
            </div>
          </AvatarFallback>
        </Avatar>
      </div>
      <b>{name}</b>
    </div>
  )
}

export default ProfileCard
