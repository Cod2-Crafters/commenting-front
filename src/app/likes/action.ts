import axiosServer from "@/axios-server.config"
import { getSession } from "@/lib/login"
import { APIResponseMsg, LikesQuestionItem } from "@/schemas"

export const fetchLikeQuestions = async () => {
    //session.user.id
    const session = await getSession()    
    try {
      const response = await axiosServer.get<APIResponseMsg<LikesQuestionItem[]>>(`/api/recommends/good-questions`, {
        headers: {
            Authorization: `Bearer ${session.user.token}`
        }
      })
      return response
    } catch (error) {
      // alert('loadProfileData error')
    }
    return null
}