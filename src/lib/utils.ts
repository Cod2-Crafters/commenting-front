'use client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs, { Dayjs } from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import { useContext } from 'react'
import { SpaceContext } from '@/components/space/space-context'
dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(fileName?: string) {
  // if (!fullUrl) return ''

  // const slahIndex = fullUrl.lastIndexOf('/') + 1
  // let fileName = fullUrl.substring(slahIndex)

  // return process.env.NEXT_PUBLIC_SERVER_URL + `/api/profile/file/${fileName}`
  return process.env.NEXT_PUBLIC_SERVER_URL + `/api/profile/file/${fileName}`
}

export function convertRecursiveNullToEmptyString(obj: any) {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = ''
    } else if (typeof obj[key] === 'object') {
      convertRecursiveNullToEmptyString(obj[key]) // 객체인 경우 재귀적으로 처리
    }
  }
}


export function isMySpace(spaceOwnerId: number, showerGuestId: number)
{
  return (spaceOwnerId === showerGuestId)
}



export function getTimeDiffText(timeToCompare: Date): string {
  const timeDiffDuration: Duration = dayjs.duration(dayjs().diff(dayjs(timeToCompare)))
  const yearDiff: number = parseInt(timeDiffDuration.format('Y'))
  const monthDiff: number = parseInt(timeDiffDuration.format('M'))
  const dateDiff: number = parseInt(timeDiffDuration.format('D'))
  const hourDiff: number = parseInt(timeDiffDuration.format('H'))
  const minuteDiff: number = parseInt(timeDiffDuration.format('m'))
  const secondDiff: number = parseInt(timeDiffDuration.format('s'))

  if (yearDiff > 0) {
    return `${yearDiff}년 전`
  } else if (monthDiff > 0) {
    return `${monthDiff}달 전`
  } else if (dateDiff > 0) {
    return `${dateDiff}일 전`
  } else if (hourDiff > 0) {
    return `${hourDiff}시간 전`
  } else if (minuteDiff > 0) {
    return `${minuteDiff}분 전`
  } else if (secondDiff > 0) {
    return `${secondDiff}초 전`
  } else {
    return ''
  }
}
