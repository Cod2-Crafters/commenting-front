'use client'
import { setCredentials } from '@/app/auth/authSlice'
import { RootState } from '@/store'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  session?: string
  children: ReactNode
}

const TokenProvider = ({ session, children }: Props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth); // Redux 상태에서 토큰을 가져옴
  const [initialized, setInitialized] = useState(false); // 상태 초기화를 한번만 하도록 플래그

  console.log('auth-provider-token-1', auth.token); // 상태 출력

  useEffect(() => {
    if (session && !auth.token && !initialized) {
      try {
        // session 값을 파싱하여 유효한 토큰이 있는지 확인
        const sessionObj = JSON.parse(session);

        if (sessionObj && sessionObj.user && sessionObj.user.token) {
          // Redux 상태 업데이트
          dispatch(
            setCredentials({
              user: { email: sessionObj.user.email },
              token: sessionObj.user.token,
              userId: sessionObj.user.userId,
            })
          );
          setInitialized(true); // 상태가 업데이트되면 초기화됨
        }
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }
  }, [session, auth.token, initialized, dispatch]); // 상태가 변경될 때만 useEffect가 실행됨

  return <>{children}</>;
};

export default TokenProvider;
