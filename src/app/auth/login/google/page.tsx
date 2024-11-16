"use client";
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code'); // 구글에서 받은 인증 코드
  const executed = useRef(false); // 무한 반복 방지 플래그

  useEffect(() => {
    const fetchToken = async () => {
      if (code && !executed.current) {
        executed.current = true; // 플래그 설정으로 한 번만 실행되도록 함

        try {
          const params = new URLSearchParams();
          params.append('code', code);
          params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
          params.append('client_secret', process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET || '');
          params.append('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '');
          params.append('grant_type', 'authorization_code');

          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
          });

          const tokenData = await tokenResponse.json();
          if (tokenData.access_token) {
            const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            });

            const userData = await userResponse.json();
            console.log(userData);
            if (userData) {
              const login = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/member/sign-in`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userData.email,
                  provider: 'GOOGLE',
                }),
              });

              const loginData = await login.json();
              if (loginData && loginData.data) {
                // 부모 창으로 메시지 전달
                window.opener.postMessage({
                  token: loginData.data.token,
                  email: loginData.data.email,
                  userId: loginData.data.userId,
                }, window.location.origin);

                window.close(); // 팝업 창 닫기
              }
            }
          } else {
            console.error('Failed to fetch access token', tokenData);
          }
        } catch (error) {
          console.error('Error during token exchange:', error);
        }
      }
    };

    fetchToken();
  }, [code]);

  return null; // 렌더링할 내용이 없음
};

export default GoogleLogin;
