import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { deleteQuestion, fetchConversations, toggleQuestionLikeIt } from '@/app/space/conversationSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImageUrl, getTimeDiffText } from '@/lib/utils'
import { AppDispatch, RootState } from '@/store'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpaceContext } from './space/space-context'
import CommentIcon from '/public/assets/comment.svg'
import HeartIcon from '/public/assets/heart.svg'
import HeartFillIcon from '/public/assets/heart-fill.svg'

import MoreIcon from '/public/assets/more.svg'
import ShareIcon from '/public/assets/share.svg'
import { Dayjs } from 'dayjs'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import axiosClient from '@/axios.config'
import { APIResponseMsg, ConversationQuestionLikeItResponse, ConversationQuestionLikeItSchemaState, ConversationSchema, ConversationSchemaState } from '@/schemas'
import AnswerWriteButton from './space/ConversationQuestionWriteButton'

interface TimelineProps {
  conversations: ConversationSchemaState[]
}

const Timeline = ({ conversations, ...props }: TimelineProps) => {
  const dispatch: AppDispatch = useDispatch()

  const { spaceOwnerId, showerGuestId, conversationsMaxMasterId } = useContext(SpaceContext)

  // 좋아요 call api
  // const callToggleConversationLikeIt = async (conId: number, showerGuestId: number) => {
  //   const bodyData: ConversationQuestionLikeItSchemaState = {
  //     conId: conId,
  //     userId: showerGuestId
  //   }

  //   const response = await axiosClient.post<APIResponseMsg<ConversationQuestionLikeItResponse>>(`/api/recommend/likes`, bodyData);
  //   return response.data

  // }

  // const deleteQuestion = async (conId) => {
  //   const response = await axiosClient.delete<APIResponseMsg<number>>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/question/${conId}`)
  //   return response.data;
  // }

  const receiveConversationsStatus = useSelector((state: RootState) => state.conversations.loading)

  return (
    <div>
      <p>
        스페이스 주인: {spaceOwnerId} / 로그인한 조회자: {showerGuestId} / maxMstId: {conversationsMaxMasterId}
      </p>

      {receiveConversationsStatus == 'successed' && conversations?.length == 0 && <h2>작성된 질문이 없습니다.</h2>}
      {conversations?.map((conversation, index) => {
        return (
          <React.Fragment key={index}>
            {conversation.isQuestion && index > 0 && <hr className="py-4" />}
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Avatar className="w-[36px] h-[36px]">
                  {/* /assets/user.png */}
                  <AvatarImage src={getImageUrl(conversation.avatarPath)} alt="profile" />
                  <AvatarFallback>
                    <div>
                      <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={84} height={84} />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <b className="text-base font-semibold">익명이 {`(${conversation.mstId}, ${conversation.conId}) owner:${conversation.ownerId} gu: ${conversation.guestId}`} </b>
                <span className="text-sm font-medium text-muted">{getTimeDiffText(conversation.modifiedAt)}</span>
              </div>

                <div className="relative">
              {showerGuestId === conversation.ownerId && 
                <DropdownMenu >
                  <DropdownMenuTrigger>
                    <Button variant={'outline'} size={'icon'}>
                      <MoreIcon width={24} height={24} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='overflow-hidden'>
                    <DropdownMenuItem>
                    <Button variant={'outline'} size={'lg'} onClick={() => {
                      dispatch(deleteQuestion(conversation.mstId))
                    }}>
                      삭제
                    </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
}

                {/* <Button variant={'outline'} size={'icon'} className="border-0">
                  <MoreIcon width={24} height={24} />
                </Button> */}
              </div>
            
            </div>
            <div className="relative ">
              {/* after */}
              <div className="flex flex-row w-full space-x-2">
                <div className="w-[36px] flex flex-col items-center mt-0 flex-shrink-0">
                  {/* 다음 질문 글이 답변이면 선을 표시함 */}
                  <span
                    className={`w-[0.5px] h-full bg-white my-2
                    
                      ${conversations[index + 1]?.isQuestion === false ? ' visible' : ' hidden'}
                      `}
                  >
                    {' '}
                  </span>
                </div>

                <div className="w-full pb-4">
                  <div className="flex flex-col">
                    <p className="pt-2 pr-2 text-base break-all text-wrap">{conversation.content}</p>
                    <div className="flex flex-row items-center -ml-3 space-x-4 text-sm ">
                      <Button className="flex justify-start text-red " variant={'link'} size={'sm'} onClick={async() => {
                          dispatch(toggleQuestionLikeIt({conId:conversation.conId, userId: showerGuestId }))
                      }}>
                        {showerGuestId != 0 && conversation.isGood === true ? <HeartFillIcon width={16} height={16} /> : <HeartIcon width={16} height={16} />}
                      </Button>

                      {/* 질문인 경우에만 댓글 작성 아이콘 및 공유 아이콘 표시 */}
                      {conversation.isQuestion == true && (
                        <>
                        <AnswerWriteButton label='' questionMstId={conversation.mstId}/>
                          <Button className="text-white rounded-full " variant={'link'}>
                            <ShareIcon width={16} height={16} />
                          </Button>
                        </>
                      )}
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
}

export default Timeline
