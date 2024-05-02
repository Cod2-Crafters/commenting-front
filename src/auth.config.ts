// // src/auth.config.ts

// // import type {NextAuthConfig} from 'next-auth'

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbakcs: {
//     authroized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user

//       const isOnProtected = !(nextUrl.pathname.startWith('/login'));

//       if(isOnProtected){
//         if(isLoggedIn) return true;
//         return false;
//       } else if(isLoggedIn){
//         return Response.redirect(new URL('/', nextUrl));
//       }
//       return true;
//     },
//   },
// } satisfies NextAuthConfig;
