import axios from 'axios'
import { convertRecursiveNullToEmptyString } from './lib/utils'

const axiosServer = axios.create()

// 라이브러리에 대한 timeout 값 재정의
// 이제 모든 요청은 시간 초과 전 2.5초 대기하는 인스턴스를 사용합니다.
axiosServer.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL
axiosServer.defaults.timeout = 4000
axiosServer.defaults.headers.common['Content-Type'] = 'application/json'

axiosServer.interceptors.response.use(
  (response) => {
    // convertRecursiveNullToEmptyString(response.data)
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('요청이 중단되었습니다1.')
    }
    return Promise.reject(error)
  },
)

export default axiosServer
