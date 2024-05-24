'use client'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

type Props = {
  children: ReactNode
}

const MainDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnOk = () => {}

  useEffect(() => {
    setIsOpen(true)

    return () => {
      false
    }
  }, [])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className="p-4 bg-red-300">11</div>
        </DialogTrigger>
        <DialogContent className="w-[600px] min-h-[100px] p-4">
          <div className="w-full -mt-2 text-right">
            <Button variant={'primary'} size={'lg'} className="text-right">
              저장
            </Button>
          </div>
          <div className="text-white ">
            <DialogHeader className="text-white">
              <DialogTitle>1111</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[420px]">
              <div className="flex flex-col space-y-4 max-h-[420px]">
                {/* items */}
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                  return (
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
                      <div className="relative my-4 ">
                        {/* after */}
                        <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5">
                          &nbsp;
                        </p>
                        <p className="flex items-center py-2 text-base break-all mr-14 ml-14 text-wrap">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                          {item == 2
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
                      ></Textarea>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>500</DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      {isOpen.toString()}
    </>
  )
}

export default MainDialog
