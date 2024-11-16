import StatisticContent from '@/components/statistic/statistic-content'
import { getSession } from '@/lib/login';
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  return (
    <>
      <StatisticContent />
    </>
  )
}

export default page
