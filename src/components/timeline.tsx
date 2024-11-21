import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { deleteQuestion, fetchConversations, toggleQuestionLikeIt, toggleQuestionThanked } from '@/app/space/conversationSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImageUrl, getNickname, getTimeDiffText } from '@/lib/utils'
import { AppDispatch, RootState } from '@/store'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpaceContext } from './space/space-context'
import CommentIcon from '/public/assets/comment.svg'
import HeartIcon from '/public/assets/heart.svg'
import HeartFillIcon from '/public/assets/heart-fill.svg'
import ThanksIcon from '/public/assets/thanks.svg'
import ThanksFillIcon from '/public/assets/thanks-fill.svg'

import MoreIcon from '/public/assets/more.svg'
import ShareIcon from '/public/assets/share.svg'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { APIResponseMsg, ConversationQuestionLikeItResponse, ConversationQuestionLikeItSchemaState, ConversationSchema, ConversationSchemaState } from '@/schemas'
import QuestionWriteModifyButton from './space/QuestionWriteModifyButton'
import AnswerWriteModifyButton from './space/AnswerWriteModifyButton'

interface TimelineProps {
  conversations: ConversationSchemaState[]
}

const Timeline = ({ conversations, ...props }: TimelineProps) => {
  const dispatch: AppDispatch = useDispatch()

  const { spaceOwnerId, showerGuestId, writeMaxMstId } = useContext(SpaceContext)
  const receiveConversationsStatus = useSelector((state: RootState) => state.conversations.loading)

  // const [dropDownMenuIsOpen, setDropDownMenuIsOpen] = useState(false);


  return (
    <div>
      {/* <p>
        스페이스 주인: {spaceOwnerId} / 로그인한 조회자: {showerGuestId} / maxMstId: {writeMaxMstId} / {receiveConversationsStatus.toString()}
      </p> */}
      {receiveConversationsStatus == 'successed' && conversations?.length == 0 && <h2>작성된 질문이 없습니다.</h2>}
      {conversations?.map((conversation, index) => {
        return (
          <React.Fragment key={index}>
            {conversation.isQuestion && index > 0 && <hr className="py-4" />}
            <div className="flex flex-row justify-between">
              {/* 아바타 카드 */}
              <div className="flex flex-row items-center space-x-2">
                <Avatar className="w-[36px] h-[36px]">
                  <AvatarImage src={getImageUrl(conversation.avatarPath)} alt="profile" />
                  <AvatarFallback>
                    <div>
                      <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={84} height={84} />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <b className="text-base font-semibold">
                  {getNickname(conversation.writerId == showerGuestId || conversation.ownerId == conversation.writerId ? conversation.nickname : null)}
                  {/* ow${conversation.ownerId} gu: ${conversation.guestId}`} / wr:${conversation.writerId} */}
                </b>
                <span className="text-sm font-medium text-muted">{getTimeDiffText(conversation.modifiedAt)}</span>
              </div>
              {/* 아바타카드 끝 */}

              <div className="relative">
                {conversation.isQuestion === true && conversation.writerId === showerGuestId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* ... 아이콘 버튼 */}
                      <Button className="test" variant={'ghost'} size={'icon'}>
                        <MoreIcon width={24} height={24} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {conversation.isQuestion === true && conversation.writerId === showerGuestId && (
                        <div className="flex flex-col">
                          <DropdownMenuItem asChild>
                            <Button
                              variant={'outline'}
                              size={'lg'}
                              onClick={() => {
                                dispatch(deleteQuestion(conversation.mstId))
                              }}
                            >
                              삭제
                            </Button>
                          </DropdownMenuItem>
                          {conversation.isQuestion === true ? (
                            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                                  <QuestionWriteModifyButton type="modify" modifyMstId={conversation.mstId} />
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem asChild>
                              <AnswerWriteModifyButton type="modify" modifyConversation={conversation} />
                            </DropdownMenuItem>
                          )}
                        </div>
                      )}
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
                      {/* 내가 작성하지 않은 질문에 대해서 좋아요 누를 수 있음  */}
                      {conversation.writerId !== spaceOwnerId && conversation.isQuestion === true && (
                        <Button
                          className="flex justify-start text-red "
                          variant={'link'}
                          size={'sm'}
                          onClick={async () => {
                            dispatch(toggleQuestionLikeIt({ conId: conversation.conId, userId: showerGuestId }))
                          }}
                        >
                          {conversation.isGood === true ? <HeartFillIcon width={16} height={16} /> : <HeartIcon width={16} height={16} />}
                        </Button>
                      )}

                      {conversation.isQuestion === false && (
                        <Button
                          className="flex justify-start text-red "
                          variant={'link'}
                          size={'sm'}
                          onClick={async () => {
                            dispatch(toggleQuestionThanked({ conId: conversation.conId, userId: showerGuestId }))
                          }}
                        >
                          {conversation.isThanked === true ? <ThanksFillIcon width={20} height={20} /> : <ThanksIcon width={20} height={20} />}
                        </Button>
                      )}

                      {/* 답변 작성: 답변은 내가 내 워크스페이스에서만 달 수 있음 */}
                      {conversation.isQuestion == true && <>{conversation.ownerId == showerGuestId && <AnswerWriteModifyButton mstId={conversation.mstId} type={'write'} />}</>}
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
