'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

import MyProfileModifyButton from '@/components/space/MyProfileModifyButton'
import { SpaceContext } from '@/components/space/space-context'
import Timeline from '@/components/timeline'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { APIResponseMsg, PagerConversationsState, ProfileSchemaState } from '@/schemas'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { startTransition, Suspense, useEffect, useRef, useState } from 'react'
import { fetchConversations, setConversations, appendConversation, clearConversation } from './conversationSlice'
import { redirect } from 'next/navigation'
import QuestionWriteModifyButton from '@/components/space/QuestionWriteModifyButton'
import useFetchConversationsInfiniteQuery from '@/hooks/services/useConversationsQuery'
import ContentLayout from '@/components/layouts/content-layout'
import { useQueryClient } from '@tanstack/react-query'
import { getImageUrl } from '@/lib/utils'

interface SpacePageProps {
  ownerId: number // 조회대상 (주인)
  guestId: number // 로그인 사용자
  ownerProfileData: ProfileSchemaState // 조회하려는 정보
  guestProfileData: ProfileSchemaState // 로그인 사용자의 정보
}

const SpaceForm = ({ ownerId, guestId, ownerProfileData, guestProfileData }: SpacePageProps) => {
  const queryClient = useQueryClient()
  const status = useSelector((state: RootState) => state.conversations.loading)
  const conversations = useSelector((state: RootState) => state.conversations.entities)

  const sendConversationsStatus = useSelector((state: RootState) => state.sendConversations.loading)
  const sendConversations = useSelector((state: RootState) => state.sendConversations.entities)

  const dispatch: AppDispatch = useDispatch()
  const [maxMasterId, setMaxMasterId] = useState(0)
  const loginUserToken = useSelector((state: RootState) => state.auth.token)
  const loginUserToken2 = useSelector((state: RootState) => state.auth.user)

  const [selectedTab, setSetselectedTab] = useState<'receive' | 'send'>('receive')

  const [ownerProfileStateData, SetOwnerProfileStateData] = useState<ProfileSchemaState>()
  const [guestProfileStateData, SetGuestProfileStateData] = useState<ProfileSchemaState>()

  useEffect(() => {
    SetOwnerProfileStateData({ ...ownerProfileData, avatarPath: getImageUrl(ownerProfileData.avatarPath) })
    SetGuestProfileStateData({ ...guestProfileData, avatarPath: getImageUrl(guestProfileData.avatarPath) })
  }, [ownerId, guestId])

  // 무한스크롤 페이징
  const { infiniteQuery: conversationsInfiniteQurey, fetchNextPage } = useFetchConversationsInfiniteQuery(selectedTab, ownerId, guestId)
  const targetRefByRecv = useRef()
  const targetRefBySend = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage()
          }
        })
      },
      { threshold: 1 },
    )

    if (selectedTab === 'receive') {
      observer?.observe(targetRefByRecv?.current)
    } else if (selectedTab === 'send') {
      observer?.observe(targetRefBySend?.current)
    }
    return () => {
      //   return observer?.unobserve(targetRef?.current)
    }
  }, [selectedTab])

  useEffect(() => {
    // conversations 가져오기
    if (conversationsInfiniteQurey.data) {
      const newConversations = conversationsInfiniteQurey.data.pages.at(-1)
      dispatch(appendConversation(newConversations.data.conversations))
    }
  }, [conversationsInfiniteQurey?.data?.pages.length]) // 맨 끝페이지가 아닌 경우에만 불러옴

  // maxMasterId 자동 할당
  useEffect(() => {
    setMaxMasterId(conversations[0]?.mstId || 0)
  }, [0 < conversations?.length, selectedTab])

  if (!guestId) {
    redirect('/auth/login')
    return
  }

  function handleOnTabChange(value: 'receive' | 'send'): void {
    dispatch(clearConversation())
    queryClient.invalidateQueries({ queryKey: ['conversation', selectedTab] })
    setSetselectedTab(value)
  }

  return (
    <>
      <SpaceContext.Provider
        value={{
          spaceOwnerId: ownerId,
          showerGuestId: guestId,
          writeMaxMstId: maxMasterId,
          guestProfileData: guestProfileStateData,
          ownerProfileData: ownerProfileStateData,
        }}
      >
        <div className="text-red-300 fixed">
          {/* <p>TOKEN1: {JSON.stringify(loginUserToken)}</p>
          <p>TOKEN-USER: {JSON.stringify(loginUserToken2)}@</p> */}
          <p>{conversationsInfiniteQurey?.status}</p>
          <p>{conversationsInfiniteQurey?.error?.stack}</p>
          <p>#hasNextPage:#{conversationsInfiniteQurey.hasNextPage === true ? 'O' : 'X'}</p>
          <p>isFetched#{conversationsInfiniteQurey.isFetched === true ? 'O' : 'X'}</p>
          <p>isLoading#{conversationsInfiniteQurey.isLoading === true ? 'O' : 'X'}</p>
          <p>maxMstId: {maxMasterId}</p>
          <p>{conversationsInfiniteQurey?.data?.pages?.length}</p>
          {/* <p className='text-green-200'>
            {JSON.stringify(conversationsInfiniteQurey?.data?.pages)}
          </p> */}
        </div>
        <ContentLayout>
          {/* <div className="flex flex-row justify-center min-h-screen bg-background">
          <div className="flex flex-col max-w-[574px] bg-background text-white pt-8 space-y-6 sm:px-2 w-full"> */}
          <span className="text-green-300">{status.toString()}</span>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center ">
              <p className="text-2xl font-semibold">{ownerProfileData?.email}</p>
              <p className="mt-1 text-base font-semibold text-white">{ownerProfileData?.nickname}</p>
            </div>
            {/* <Image
            className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white"
            src="/assets/no-user.png"
            width={84}
            height={84}
            alt="image"
          /> */}
            <Avatar className="w-[84px] h-[84px]">
              <AvatarImage src={ownerProfileStateData?.avatarPath} alt="profile" />
              <AvatarFallback>
                <div>
                  <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={84} height={84} />
                </div>
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-base font-semibold">{ownerProfileData?.introduce}</p>

          {/* 궁금해요 <> 프로필 편집 */}
          <>
            {guestId === ownerId && <MyProfileModifyButton label="프로필 편집" data={guestProfileStateData} />}

            {/* 궁금해요 버튼 */}
            {guestId !== ownerId && <QuestionWriteModifyButton type="write" />}
            <span>
              gu:{guestId} @ ow:{ownerId} # {selectedTab}
            </span>

            {guestId == ownerId && (
              <>
                <p>좋아요: {ownerProfileData.likesCnt}</p>
                <p>답변 작성 수: {ownerProfileData.answerCnt}</p>
              </>
            )}
          </>

          <Tabs defaultValue="receive" className="mt-8" onValueChange={handleOnTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="receive" className="w-full">
                받은 질문
              </TabsTrigger>
              {ownerId === guestId && (
                <TabsTrigger value="send" className="w-full">
                  보낸 질문
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="receive">
              <div className="py-10">
                <Timeline conversations={conversations} />
                <div ref={targetRefByRecv}>---</div>
              </div>
            </TabsContent>
            {ownerId === guestId && (
              <TabsContent value="send">
                <div className="py-10">
                  <Timeline conversations={conversations} />
                  <div ref={targetRefBySend}>====</div>
                </div>
              </TabsContent>
            )}
          </Tabs>
          {/* </div>
        </div> */}
        </ContentLayout>
      </SpaceContext.Provider>
    </>
  )
}

export default SpaceForm
