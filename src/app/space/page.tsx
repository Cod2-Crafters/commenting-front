'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

import MyProfileModifyButton from '@/components/space/MyProfileModifyButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentIcon from '/public/assets/comment.svg'
import HeartIcon from '/public/assets/heart.svg'
import MoreIcon from '/public/assets/more.svg'
import ShareIcon from '/public/assets/share.svg'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex flex-row justify-center min-h-screen bg-background">
      <div className="flex flex-col max-w-[574px] bg-background text-white pt-8 space-y-6 sm:px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center ">
            <p className="text-2xl font-semibold">뉴니</p>
            <p className="mt-1 text-base font-semibold text-white">사용자A</p>
          </div>
          {/* <Image
            className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white"
            src="/assets/no-user.png"
            width={84}
            height={84}
            alt="image"
          /> */}
          <Avatar className="w-[84px] h-[84px]">
            <AvatarImage src="/assets/user.png" alt="profile" />
            <AvatarFallback>
              <div>
                <Image
                  className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1"
                  src="/assets/no-user.png"
                  alt="profile"
                  width={84}
                  height={84}
                />
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="text-base font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fuga
          rerum tempora quam omnis accusantium, id voluptatum accusamus animi
          aut eveniet obcaecati veritatis laboriosam maxime, praesentium
          repellat vero facere dolore.
        </p>
        <div className="inline-flex space-x-4 text-xl font-semibold ">
          <label>답변</label>
          <span>2개</span>
          <label>고마워요!</label>
          <span>2개</span>
        </div>
        <MyProfileModifyButton label="프로필 편집" />
        <Tabs defaultValue="receive" className="mt-8">
          <TabsList className="w-full">
            <TabsTrigger value="receive" className="w-full">
              받은 질문
            </TabsTrigger>
            <TabsTrigger value="send" className="w-full">
              보낸 질문
            </TabsTrigger>
          </TabsList>
          <TabsContent value="receive">
            <div className="py-10">
              {[1, 2].map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center space-x-2">
                        <Avatar className="w-[36px] h-[36px]">
                          <AvatarImage src="/assets/user.png" alt="profile" />
                          <AvatarFallback>
                            <div>
                              <Image
                                className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1"
                                src="/assets/no-user.png"
                                alt="profile"
                                width={84}
                                height={84}
                              />
                            </div>
                          </AvatarFallback>
                        </Avatar>
                        <b className="text-base font-semibold">사용자B</b>
                        <span className="text-sm font-medium text-muted">
                          30일전
                        </span>
                      </div>

                      <div className="relative">
                        <Button
                          variant={'outline'}
                          size={'icon'}
                          className="border-0"
                        >
                          <MoreIcon width={24} height={24} />
                        </Button>
                      </div>
                    </div>
                    <div className="relative ">
                      {/* after */}
                      <div className="flex flex-row w-full space-x-2">
                        <div className="w-[36px] flex flex-col items-center mt-0 flex-shrink-0">
                          <span className="w-[0.5px] h-full bg-white my-2">
                            {' '}
                          </span>
                        </div>

                        <div className="w-full pb-4">
                          <div className="flex flex-col">
                            <p className="pt-2 pr-2 text-base break-all text-wrap">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Consectetur ullam repellat
                              placeat maxime aperiam asperiores, veritatis animi
                              iusto laudantium culpa ipsam pariatur, omnis autem
                              iste iure quia accusantium reiciendis cupiditate?
                            </p>
                            <div className="flex flex-row items-center -ml-3 space-x-4 text-sm ">
                              <Button
                                className="flex justify-start text-white"
                                variant={'link'}
                                size={'sm'}
                              >
                                <HeartIcon width={16} height={16} />
                                <label className="">5</label>
                              </Button>
                              <Button
                                className="text-white rounded-full"
                                variant={'link'}
                              >
                                {' '}
                                <CommentIcon width={16} height={16} />
                              </Button>
                              <Button
                                className="text-white rounded-full "
                                variant={'link'}
                              >
                                <ShareIcon width={16} height={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 미사용 코드 */}
                      {/*                       
                      <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-[12.5px]">
                        &nbsp;
                      </p>
                      <div className="flex flex-col items-start py-2 text-base break-all mr-11 ml-11 text-wrap">
                        <p className="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                          {item == 2
                            ? ' Lorem ipsum dolor sit amet consectetur adipisicingelit._Lorem ipsum dolor sit amet consecteturadipisicing elit.'
                            : ''}
                        </p>
                        <div className="flex flex-row space-x-2">
                          <span>item1</span>
                          <span>item2</span>
                          <span>item3</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>
          <TabsContent value="send">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
