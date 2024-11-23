'use client'
import { APIResponseMsg, ConversationSchemaState, LikesQuestionItem } from '@/schemas'
import React, { useEffect, useState } from 'react'
import LikeQuestionItem from './like-question-item'
import ConversationQModifyDialog from '../common/conversations/ConversationQModifyDialog'
import axiosClient from '@/axios.config'
import { fetchQuestionConversation } from '@/app/space/conversationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import ConversationNotifyDialog from '../common/conversations/ConversationNotifyDialog'

interface LikeQuestionItemListProps {
  questions: LikesQuestionItem[]
  loginUserId: number
}

const LikeQuestionItemList = ({ questions, loginUserId }: LikeQuestionItemListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedMstId, setClickedMstId] = useState(0)

  const autht = useSelector((state: RootState) => state.auth.token)

  const showDialog = async (mstId: number) => {
    setClickedMstId(mstId)
    setIsOpen(true)
  }

  if (!loginUserId) return null

  return (
    <>
      {/* <span>{isOpen.toString()}</span>
      <span>{autht}</span>
      <span className="block my-36">{JSON.stringify(questions)}</span> */}
      {questions?.map((question) => {
        return <LikeQuestionItem key={question.mstId + '-'} data={question} showDialog={showDialog} loginUserId={loginUserId} />
      })}

      {questions && <ConversationNotifyDialog setIsOpen={setIsOpen} isOpen={isOpen} targetMstId={clickedMstId} loginUserId={loginUserId} />}
    </>
  )
}
export default LikeQuestionItemList
