'use server'
import axiosServer from '@/axios-server.config'
import { getSession } from '@/lib/login'
import { getImageUrl } from '@/lib/utils'
import { ProfileResponseState } from '@/schemas'
import SpaceForm from '../space-form'

const SpacePage = async ({ params }: { params: { ownerId: number } }) => {
  const session = await getSession()
  // if (!session) {
  //   console.log('no session-redirect')
  //   redirect('/auth/login')
  // }

  // let ownerId = 0
  // if (!Number.isNaN(params.ownerId)) {
  //   ownerId = session.user.id
  //   console.log('space connect - session.user.id')
  // } else {
  //   ownerId = params.ownerId
  //   console.log('space connect - params ownerId')
  // }

  // 조회대상자(ownerId)가 정보를 보는 사람(geustId)와 다른 경우 -> 댓글 작성 권한 허용
  // 조회대상자(ownerId)가 정보를 보는 사람(geustId)과 동일한 경우 -> 내 스페이스로 입장한 것과 동일, 댓글 작성 권한 X

  const loadProfileData = async () => {
    //session.user.id
    try {
      const response = await axiosServer.get<ProfileResponseState>(
        `/api/profile/${params.ownerId}`,
      )
      return response
    } catch (error) {
      console.log('loadProfileData Response error', error)
    }

    return null
  }

  const responseProfileData = (await loadProfileData())?.data

  if (responseProfileData?.data.avatarPath) {
    responseProfileData.data.avatarPath = getImageUrl(
      responseProfileData.data.avatarPath,
    )
  }

  return (
    <div>
      {/* data key in data key -> get response value data */}
      {responseProfileData && (
        <SpaceForm
          ownerId={params.ownerId}
          guestId={session.user.id}
          profileData={responseProfileData.data}
        />
      )}
    </div>
  )
}

export default SpacePage
