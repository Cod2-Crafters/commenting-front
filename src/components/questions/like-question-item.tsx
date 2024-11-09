'use client'
import { APIResponseMsg, ConversationSchemaState, LikesQuestionItem } from '@/schemas'
import React, { Dispatch, MouseEvent, ReactNode, SetStateAction, useEffect, useState } from 'react'
import HeartFillIcon from '/public/assets/heart-fill.svg'
import { Button } from '../ui/button'
import Link from 'next/link'
import ConversationQModifyDialog from '../common/conversations/ConversationQModifyDialog'
import axiosClient from '@/axios.config'
import { getNickname, getTimeDiffText } from '@/lib/utils'

interface LikeQuestionItemProps {
  data: LikesQuestionItem
  children?: ReactNode
  showDialog: Dispatch<SetStateAction<number>>
  loginUserId?: number
}

// 클릭하면 -> 링크 팝업 표시
  const LikeQuestionItem = ({ data, children, showDialog, loginUserId  }: LikeQuestionItemProps) => {
  

  const handleLikeQuestionItemClick = async (event: MouseEvent<HTMLDivElement>) => {
    showDialog(data.mstId);
  }

  return (
    <>
      <div className="group/likeitem" onClick={handleLikeQuestionItemClick}>
        <div className="group-hover/likeitem:cursor-pointer">
          <hr className="group-hover/likeitem:border-primary" />
          <div className="group-hover/likeitem:bg-surface group-hover/likeitem:text-white group-hover/likeitem:shadow-2xl shadow-black rounded-2xl rounded-t-none">
            <div className="pl-8 py-8">
              <div className="relative px-8">
                <div className="absolute left-0">
                  <HeartFillIcon width={24} height={24} />
                </div>
                <h4>{getNickname(data.ownerId === loginUserId ? data.ownerNickName : null) + '의 스페이스'}</h4>
                <div className="flex items-center">
                  <h4 className="text-base font-semibold">{getNickname(data.guestId === loginUserId ? data.guestNickname : null)}</h4>
                  <h5 className="text-base text-muted font-semibold ml-4">{getTimeDiffText(data.createAt)}</h5>
                </div>
                <p className="text-muted mt-8 group-hover/likeitem:text-primary">
                  {data.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>ㄱ
  )
}

export default LikeQuestionItem
