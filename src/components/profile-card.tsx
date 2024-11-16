'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getImageUrl } from '@/lib/utils'

import Image from 'next/image'

interface ProfileCardProps {
  name: string
  imagePath: string
  imageSize?: number // defualt value: 50
  isZoom?: boolean
}

const ProfileCard = ({ name, imagePath, imageSize = 50, isZoom = false }: ProfileCardProps) => {

  const avatarSizeClass = {
    80: 'w-20 h-20' // 80px
  }
  return (
    <div className="flex flex-row items-center space-x-2">
      {/* <span className="rounded-full">
                              <DefaultUserIcon width={50} height={50} />
                            </span> */}
      {/* before:bg-gradient-to-bl before:from-indigo-500 before:w-[50px] before:content-['_'] before:h-[50px] before:absolute before:top-0 before:rounded-full before:z-10 */}
      <div className="rounded-full relative">
        <Avatar className={`${avatarSizeClass[imageSize]} ${isZoom ? 'transition-transform hover:scale-125 cursor-pointer' : ''} `}>
          <AvatarImage src={getImageUrl(imagePath)} alt="profile" />
          <AvatarFallback>
            <div>
              <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={imageSize} height={imageSize} />
            </div>
          </AvatarFallback>
        </Avatar>
      </div>
      <b>{name}</b>
    </div>
  )
}

export default ProfileCard
