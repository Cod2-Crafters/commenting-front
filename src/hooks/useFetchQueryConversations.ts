'use client'

import { fetchConversationsByMstId } from '@/app/space/conversationSlice'
import axiosClient from '@/axios.config'
import { APIResponseMsg, ConversationSchemaState } from '@/schemas'
import { AppDispatch } from '@/store'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useDispatch } from 'react-redux'


const useFetchQueryConversations = (mstId: number, isOpen: boolean, doubleClickConId: number) => {

  const dispatch: AppDispatch = useDispatch();

  const query = useQuery({

    queryKey: ['question', mstId, doubleClickConId !== 0],
    queryFn: async() => { return dispatch(fetchConversationsByMstId(mstId)).unwrap() }
  })
  return query
}

export default useFetchQueryConversations
