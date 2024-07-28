import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(fullUrl?: string) {
  if (!fullUrl) return ''

  const slahIndex = fullUrl.lastIndexOf('/') + 1
  let fileName = fullUrl.substring(slahIndex)

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
