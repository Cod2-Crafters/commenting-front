import axios from 'axios'
import https from 'https'
import { convertRecursiveNullToEmptyString } from './lib/utils'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

const axiosClient = axios.create({})




// 라이브러리에 대한 timeout 값 재정의
// 이제 모든 요청은 시간 초과 전 2.5초 대기하는 인스턴스를 사용합니다.
axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL
axiosClient.defaults.timeout = 4000
axiosClient.defaults.headers.common['Content-Type'] = 'application/json'
axiosClient.defaults.httpsAgent = httpsAgent

axiosClient.interceptors.response.use(
  (response) => {
    //convertRecursiveNullToEmptyString(response.data)
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('요청이 중단되었습니다1.')
    }
    return Promise.reject(error)
  },
)

export default axiosClient
