import axiosServer from '@/axios-server.config'
import ContentLayout from '@/components/layouts/content-layout'
import ProfileLabel from '@/components/profile/ProfileLabel'
import LikeQuestionItem from '@/components/questions/like-question-item'
import LikeQuestionItemList from '@/components/questions/like-question-item-list'
import { Label } from '@/components/ui/label'
import { LikesQuestionItem } from '@/schemas'
import React, { useEffect } from 'react'
import { fetchLikeQuestions } from './action'
import { getSession } from '@/lib/login'
import { SpaceContext } from '@/components/space/space-context'

type Props = {}

const page = async (props: Props) => {
  const response = await fetchLikeQuestions();
  const session = await getSession();

  return (
    <ContentLayout>
      <Label className='text-2xl'>좋은 질문들</Label>
      <LikeQuestionItemList questions={response?.data?.data} loginUserId={Number(session?.user?.userid) || 0} />
    </ContentLayout>
  )
}

export default page