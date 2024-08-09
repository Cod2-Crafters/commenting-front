'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

import AnswerWriteButton from '@/components/space/ConversationQuestionWriteButton'
import MyProfileModifyButton from '@/components/space/MyProfileModifyButton'
import { SpaceContext } from '@/components/space/space-context'
import Timeline from '@/components/timeline'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfileSchemaState } from '@/schemas'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchConversations } from './conversationSlice'

interface SpacePageProps {
  ownerId: number
  guestId: number
  profileData: ProfileSchemaState
}

const SpaceForm = ({ ownerId, guestId, profileData }: SpacePageProps) => {

  const status = useSelector((state: RootState) => state.conversations.loading)
  const dispatch: AppDispatch = useDispatch()


  const [maxMasterId, setMaxMasterId] = useState(0)
  const conversations = useSelector((state: RootState) => state.conversations.entities)
  

  useEffect(() => {
    if (status === 'idle') {
      // conversations 가져오기
      dispatch(fetchConversations(ownerId))
      alert('fetchConversations-spaceform ')
    }
    if (status == 'successed') {
      setMaxMasterId(conversations?.length && conversations[0].mstId || 0)
    }
    
  }, [dispatch, status])

  useEffect(() => {
    alert('maxMasterId:' + maxMasterId);
  }, [maxMasterId])


  return (
    <>
      <SpaceContext.Provider
        value={{
          spaceOwnerId: ownerId,
          showerGuestId: guestId,
          conversationsMaxMasterId: maxMasterId
        }}
      >
        <div className="flex flex-row justify-center min-h-screen bg-background">
          <div className="flex flex-col max-w-[574px] bg-background text-white pt-8 space-y-6 sm:px-2 w-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-semibold">{profileData?.email}</p>
                <p className="mt-1 text-base font-semibold text-white">{profileData?.nickname}</p>
              </div>
              {/* <Image
            className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white"
            src="/assets/no-user.png"
            width={84}
            height={84}
            alt="image"
          /> */}
              <Avatar className="w-[84px] h-[84px]">
                <AvatarImage src={profileData?.avatarPath} alt="profile" />
                <AvatarFallback>
                  <div>
                    <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={84} height={84} />
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <p className="text-base font-semibold">{profileData?.introduce}</p>
            <div className="inline-flex space-x-4 text-xl font-semibold ">
              <label>답변</label>
              <span>N개</span>
              <label>고마워요!</label>
              <span>N개</span>
            </div>
            {/* 궁금해요 <> 프로필 편집 */}

            {(guestId || ownerId) && <MyProfileModifyButton label="프로필 편집" data={profileData} />}

            {/* 궁금해요 시작 */}
            {(guestId || ownerId) && <AnswerWriteButton label="궁금해요 (test)" />}

            {/* 궁금해요 끝 */}

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
                  <Timeline conversations={conversations} />

                  {/* 
              {[].length == 0 && <h2>작성된 질문이 없습니다.</h2>}
              {[1].map((item, index) => {
                return (
                  <div key={index}>
                    {[].map((item) => {
                      return (
                        <React.Fragment key={item}>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center space-x-2">
                              <Avatar className="w-[36px] h-[36px]">
                                
                                <AvatarImage
                                  src={profileData?.avatarPath}
                                  alt="profile"
                                />
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
                              <b className="text-base font-semibold">익명이 </b>
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
                                    placeat maxime aperiam asperiores, veritatis
                                    animi iusto laudantium culpa ipsam pariatur,
                                    omnis autem iste iure quia accusantium
                                    reiciendis cupiditate?
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

                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                )
              })}
                */}
                </div>
              </TabsContent>
              <TabsContent value="send">Change your password here.</TabsContent>
            </Tabs>
          </div>
        </div>
      </SpaceContext.Provider>
    </>
  )
}

export default SpaceForm
