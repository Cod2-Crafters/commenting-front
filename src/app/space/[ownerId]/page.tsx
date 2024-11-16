'use server'
import axiosServer from '@/axios-server.config'
import { getSession } from '@/lib/login'
import { ProfileResponseState } from '@/schemas'
import SpaceForm from '../space-form'
import { redirect } from 'next/navigation'
import { getImageUrl } from '@/lib/utils'

const SpacePage = async ({ params }: { params: { ownerId: number } }) => {
  // 조회대상자(ownerId)가 정보를 보는 사람(geustId)와 다른 경우 -> 댓글 작성 권한 허용
  // 조회대상자(ownerId)가 정보를 보는 사람(geustId)과 동일한 경우 -> 내 스페이스로 입장한 것과 동일, 댓글 작성 권한 X

  // 로그인을 하지 않은 경우 로그인으로 redirect (임시조치)

  const session = await getSession()
  if (!session) {
    redirect('/auth/login')
    return
  }

  const loadProfileData = async (userId: number) => {
    //session.user.id
    try {
      const response = await axiosServer.get<ProfileResponseState>(`/api/profile/${userId}`)
      return response
    } catch (error) {
      // alert('loadProfileData error')
    }

    return null
  }
  const ownerId = Number(params.ownerId) || 0
  const guestId = Number(session.user.userId) || 0;

  const ownerProfileData = (await loadProfileData(ownerId))?.data
  const guestProfileData = (await loadProfileData(guestId))?.data

  return (
    <div>
      {/* data key in data key -> get response value data */}
      {ownerProfileData && <SpaceForm ownerId={ownerId} guestId={guestId} ownerProfileData={ownerProfileData.data} guestProfileData={guestProfileData.data} />}
    </div>
  )
}

export default SpacePage
