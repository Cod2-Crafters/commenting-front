// import { NextApiRequest, NextApiResponse } from 'next'
// import NextAuth from 'next-auth/next'
// import GoogleProvider from 'next-auth/providers/google'

// export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
//   return NextAuth(req, res, {
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLEINT_SECRET!,
//       }),
//     ],
//     callbacks: {
//       async session({ session, token, user }) {
//         return session
//       },
//     },
//   })
// }
