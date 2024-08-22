import axiosClient from '@/axios.config'
import { APIResponseMsg, PagerConversationsState } from '@/schemas'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const fetchConversations = async (ownerId, pageNumber) => {
  console.log('fetchConversations call', ownerId, pageNumber)
  const response = await axiosClient.get<APIResponseMsg<PagerConversationsState>>(`/api/conversations/timeline/${ownerId}/${pageNumber}`)
  return response.data
}
const useFetchConversationsInfiniteQuery = (ownerId: number) => {
const [pageId, setPageId] = useState(1)

const fetchNextPage = () => {
  setPageId((prevPageId) => prevPageId + 1)
}

useEffect(() => {
  infiniteQuery.fetchNextPage();
}, [pageId])

  const infiniteQuery = useInfiniteQuery({
    queryKey: ['conversations_recv'],
    queryFn: ({ pageParam }) => {
      return fetchConversations(ownerId, pageParam)
    },
    initialPageParam: pageId,
    getNextPageParam(lastPage, allPages) {
      if (lastPage.data.lastPage) {
        return undefined // 더 이상 요청할 페이지가 없음1f
      } else {
        // 다음 페이지를 요청하기 위해 페이지 번호를 반환
        return pageId
      }
    },
    staleTime: 2 * 60 * 1000, // 2min
  })


  return {
    infiniteQuery,
    fetchNextPage,
  }
}

export default useFetchConversationsInfiniteQuery
