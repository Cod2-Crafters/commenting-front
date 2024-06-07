'use client'
import Image from 'next/image'
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

type Props = {
  children: ReactNode
}

const MainDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    setIsOpen(true)

    return () => {
      false
    }
  }, [])

  const handleOnChangeAnswer = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value)
  }

  const handleOnClickAnswerWrite = (event: MouseEvent<HTMLButtonElement>) => {
    alert('okay')
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className="p-4 bg-red-300">11</div>
          {isOpen.toString()}
        </DialogTrigger>
        <DialogContent className="w-[600px] min-h-[100px] p-4">
          <div className="w-full -mt-2 text-right py-2 min-h-8">
            <Button
              variant={'primary'}
              size={'lg'}
              className="text-right"
              onClick={handleOnClickAnswerWrite}
            >
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
                {/* items */}
                {[...Array(6)].map((_, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-row items-center space-x-2">
                        {/* <span className="rounded-full">
                          <DefaultUserIcon width={50} height={50} />
                        </span> */}
                        {/* before:bg-gradient-to-bl before:from-indigo-500 before:w-[50px] before:content-['_'] before:h-[50px] before:absolute before:top-0 before:rounded-full before:z-10 */}
                        <div className="rounded-full relative">
                          {/* <div className="absolute top-0 left-0 bg-red-300 w-full h-full rounded-full border-4 scale-100"></div> */}
                          {/* <Image
                            className="rounded-full relative bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white"
                            src="/assets/no-user.png"
                            alt="user"
                            width={50}
                            height={50}
                          ></Image> */}
                          <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="/assets/user.png" alt="profile" />
                            <AvatarFallback>
                              <div>
                                <Image
                                  className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1"
                                  src="/assets/no-user.png"
                                  alt="profile"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <b>사용자B</b>
                      </div>
                      <div className="relative my-4 ">
                        {/* after */}
                        <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5">
                          &nbsp;
                        </p>
                        <p className="flex items-center py-2 text-base break-all mr-14 ml-14 text-wrap">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                          {index == 2
                            ? ' Lorem ipsum dolor sit amet consectetur adipisicingelit._Lorem ipsum dolor sit amet consecteturadipisicing elit.'
                            : ''}
                        </p>
                      </div>
                    </div>
                  )
                })}

                <div>
                  <div className="flex flex-row items-center space-x-2">
                    <Image
                      className="rounded-full"
                      src="/assets/no-user.png"
                      alt="user"
                      width={50}
                      height={50}
                    ></Image>
                    <b>사용자B</b>
                  </div>
                  <div className="relative my-4">
                    {/* after */}
                    <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">
                      &nbsp;
                    </p>
                    <div className="py-2 mr-14 ml-14">
                      <Textarea
                        className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2"
                        placeholder="답변할 내용을 입력하세요"
                        onChange={handleOnChangeAnswer}
                        maxLength={500}
                      ></Textarea>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>{answer.length}</DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainDialog
