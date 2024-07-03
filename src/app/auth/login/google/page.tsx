"use client";
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const GoogleLogin = () => {
  // const searchParams = useSearchParams();
  // const code = searchParams.get('code');
  // const executed = useRef(false); 

  // useEffect(() => {
  //   const fetchToken = async () => {
  //   if (code && !executed.current) {
  //       executed.current = true; 
  //       try {
  //         const params = new URLSearchParams();
  //         params.append('code', code);
  //         params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
  //         params.append('client_secret', process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET || '');
  //         params.append('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '');
  //         params.append('grant_type', 'authorization_code');

  //         const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //           },
  //           body: params.toString()
  //         });

  //         const tokenData = await tokenResponse.json();

  //         if (tokenData.access_token) {
  //           const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
  //             method: 'GET',
  //             headers: {
  //               'Authorization': `Bearer ${tokenData.access_token}`
  //             }
  //           });

  //           const userData = await userResponse.json();
  //           console.log(userData);

  //           if (userData) {
  //             const login = await fetch('http://13.125.249.102:8080/api/member/sign-in', {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json"
  //               },
  //               body: JSON.stringify({
  //                 email: userData.email,
  //                 provider: "GOOGLE"
  //               })
  //             });

  //             const loginData = await login.json();
  //             console.log(loginData);
  //           }
  //         } else {
  //           console.error(tokenData);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchToken();
  // }, [code]);

  return <div>Google 로그인 중...</div>;
};

export default GoogleLogin;
