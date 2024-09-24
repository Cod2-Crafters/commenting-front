"use client";
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import axiosClient from '@/axios.config';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../authSlice';

const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const executed = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      if (code && !executed.current) {
        executed.current = true;
        try {
          const params = new URLSearchParams();
          params.append('code', code);
          params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
          params.append('client_secret', process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET || '');
          params.append('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '');
          params.append('grant_type', 'authorization_code');

          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
          });

          const tokenData = await tokenResponse.json();
          console.log(tokenData);
          if (tokenData.access_token) {
            const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
              }
            });

            const userData = await userResponse.json();
            console.log(userData);

            if (userData) {
              const login = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/member/sign-in', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: userData.email,
                  provider: "GOOGLE"
                })
              });

              const loginData = await login.json();
              if (loginData) {
                // dispatch(
                //   setCredentials({
                //     user: { email: loginData.data.email },
                //     token: loginData.data.token,
                //     // id : loginData.data.id
                //   }),
                // )
                window.opener.postMessage({ type: 'LOGIN_SUCCESS', token: loginData.data.token, email: loginData.data.email, id: loginData.data.id }, 'http://localhost:3000');

              }

              // 로그인 성공 시 부모 창으로 메시지 전달
              // window.opener.postMessage({ type: 'LOGIN_SUCCESS', data: loginData }, '*');


              // 현재 창 닫기
              window.close();
            }
          } else {
            console.error(tokenData);
          }
        } catch (error) {
          console.error(error);

          window.opener.postMessage({ type: 'LOGIN_FAILURE', error }, '*');
          window.close();
        }
      }
    };

    fetchToken();
  }, [code]);

};

export default GoogleLogin;
