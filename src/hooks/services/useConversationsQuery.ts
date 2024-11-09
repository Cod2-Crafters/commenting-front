'use client'
import { appendConversation } from '@/app/space/conversationSlice'
import axiosClient from '@/axios.config'
import { APIResponseMsg, PagerConversationsState } from '@/schemas'
import { AppDispatch, RootState } from '@/store'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const useFetchConversationsInfiniteQuery = (type: 'receive' | 'send', ownerId: number, guestId: number) => {
  const authToken = useSelector((state: RootState) => state.auth.token)
  const fetchConversations = async (type, ownerId, guestId, pageNumber) => {
    if (type === 'receive') {
        const response = await axiosClient.get<APIResponseMsg<PagerConversationsState>>(`/api/conversations/timeline/${ownerId}/${pageNumber}`, {
          headers: {
            Authorization: `Bearer ${authToken || ''}`,
          },
        })
        return response.data
    }
    else if (type === 'send') {
      const response = await axiosClient.get<APIResponseMsg<PagerConversationsState>>(`/api/conversations/send-question/${guestId}/${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${authToken || ''}`,
        },
      })
      return response.data
    }
  }

  const infiniteQuery = useInfiniteQuery({
    queryKey: ['conversations', type],
    queryFn: ({ pageParam }) => {
        return fetchConversations(type, ownerId, guestId, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      if (lastPage.data.lastPage) { 
        // lastPage 값은 page를 의미하며, 맨 끝에 참조되는 lagePage는 true/false로 backend에서 계산하여 API로 응답받음.
        return undefined // 더 이상 요청할 페이지가 없음
      } else {
        // 다음 페이지를 요청하기 위해 페이지 번호를 반환
        return allPages.length+1
      }
    },
    gcTime: 0,
    staleTime: 0
  })

  const fetchNextPage = () => {
    infiniteQuery.fetchNextPage()
  }

  return {
    infiniteQuery,
    fetchNextPage,
  }
}

export default useFetchConversationsInfiniteQuery
