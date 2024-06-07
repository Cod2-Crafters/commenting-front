'use client'
import { Fragment } from 'react'
import ProfileLabel from '../profile/ProfileLabel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

import Image from 'next/image'
import { Button } from '../ui/button'
import AddPhotoIcon from '/public/assets/add-photo.svg'
import InstagramIcon from '/public/assets/insta.svg'
import LinkLineIcon from '/public/assets/link-line.svg'

type MyProfileInfoDialogProps = {
  label: string
}

const MyProfileInfoDialog = ({ label }: MyProfileInfoDialogProps) => {
  return (
    <Dialog>
      {/* button of button solution asChilid=true */}
      <DialogTrigger asChild>
        <Button className="w-full" variant={'outline'} asChild={false}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] min-h-[100px] p-4">
        <div className="w-full -mt-2 text-right py-2 min-h-8">
          <Button variant={'primary'} size={'lg'} className="text-right">
            저장
          </Button>
        </div>

        <div className="text-white ">
          <DialogHeader className="text-white">
            {/* <DialogTitle>1111</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription> */}
          </DialogHeader>
          <ScrollArea className="p-4">
            <div className="flex flex-col space-y-4 max-h-[420px]">
              <div className="flex-shrink-0">
                <label
                  htmlFor="file-profile"
                  className="group/file-profile w-32 h-32 bg-red-300 rounded-full m-auto cursor-pointer block relative"
                >
                  <Input
                    id="file-profile"
                    type="file"
                    className="invisible file:border-0 cursor-pointer"
                  />
                  <Image
                    className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white absolute top-0"
                    src="/assets/user.png"
                    alt="user"
                    width={256}
                    height={256}
                  />

                  <div className="w-16 h-16 rounded-full bg-black/50 m-auto group-hover/file-profile:flex hidden items-center justify-center absolute top-1/2 translate-y-[-50%] left-0 translate-x-[50%]">
                    <AddPhotoIcon
                      className="scale-150"
                      width={17}
                      height={17}
                    />
                  </div>
                </label>
                <div>
                  <ProfileLabel htmlFor="input-nickname">닉네임</ProfileLabel>
                  <Input
                    type="text"
                    id="input-nickname"
                    sizeType={'lg'}
                    placeholder="닉네임"
                  />
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4">
                <section>
                  <ProfileLabel htmlFor="input-mydesc">자기소개</ProfileLabel>
                  <Textarea
                    className="min-h-28 resize-none placeholder:text-base"
                    placeholder="자신을 소개해주세요"
                  ></Textarea>
                </section>

                <section className="flex flex-col space-y-3">
                  {/* items */}
                  <div className="flex flex-row justify-between items-center space-x-2">
                    <InstagramIcon width={24} height={24} />
                    <Input
                      id="input-nickname"
                      sizeType={'lg'}
                      placeholder="인스타그램 아이디"
                    />
                  </div>
                  {[...Array(2)].map((_, index) => {
                    const id = index + 1
                    return (
                      <Fragment key={id}>
                        <div className="flex flex-row justify-between items-center space-x-2">
                          <LinkLineIcon width={24} height={24} />
                          <Input
                            id="input-nickname"
                            sizeType={'lg'}
                            placeholder={`링크${id}`}
                          />
                        </div>
                      </Fragment>
                    )
                  })}
                </section>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MyProfileInfoDialog
