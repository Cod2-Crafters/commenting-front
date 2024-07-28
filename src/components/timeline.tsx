import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { fetchConversations } from '@/app/space/conversationSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImageUrl } from '@/lib/utils'
import { AppDispatch, RootState } from '@/store'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpaceContext } from './space/space-context'
import CommentIcon from '/public/assets/comment.svg'
import HeartIcon from '/public/assets/heart.svg'
import MoreIcon from '/public/assets/more.svg'
import ShareIcon from '/public/assets/share.svg'

type TimelineProps = {}

const Timeline = ({ ...props }: TimelineProps) => {
  //   const [converSations, setConverSations] =
  //     useState<ConversationSchemaState[]>()

  const dispatch: AppDispatch = useDispatch()
  const conversations = useSelector((state: RootState) => state.conversations.entities)
  const status = useSelector((state: RootState) => state.conversations.loading)

  const { ownerId, guestId } = useContext(SpaceContext)

  //   const loadConversation = async () => {
  //     const response = await axiosClient.get<
  //       APIResponseMsg<ConversationSchemaState[]>
  //     >(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/timeline/${ownerId} `,
  //     )

  //     return response.data
  //   }
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchConversations(ownerId))
      alert('fetchConversations ')
    }
    // loadConversation().then((conversations) => {
    //   dispatch(setConversations(conversations.data))
    //   //setConverSations(conversations.data)
    // })
  }, [dispatch, status])

  return (
    <div>
      {status == 'successed' && conversations?.length == 0 && <h2>작성된 질문이 없습니다.</h2>}
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
                <b className="text-base font-semibold">익명이 </b>
                <span className="text-sm font-medium text-muted">30일전</span>
              </div>

              <div className="relative">
                <Button variant={'outline'} size={'icon'} className="border-0">
                  <MoreIcon width={24} height={24} />
                </Button>
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
                      <Button className="flex justify-start text-white" variant={'link'} size={'sm'}>
                        <HeartIcon width={16} height={16} />
                        <label className="">5</label>
                      </Button>
                      <Button className="text-white rounded-full" variant={'link'}>
                        {' '}
                        <CommentIcon width={16} height={16} />
                      </Button>
                      <Button className="text-white rounded-full " variant={'link'}>
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
}

export default Timeline
