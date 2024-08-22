import { HeartIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const HeartLikeButton = (props: Props) => {
  return (
    <Button className="flex justify-start text-white" variant={'link'} size={'sm'}>
    <HeartIcon width={16} height={16} />
    <label className="">5</label>
  </Button>
  )
}

export default HeartLikeButton