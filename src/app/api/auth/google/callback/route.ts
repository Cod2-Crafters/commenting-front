import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const backendUrl = 'http://43.202.121.141:8080/oauth/google'

  // const response = await fetch(backendUrl, {
  //     method: 'GET',
  //     headers : {
  //         'Content-Type' : 'application/json',
  //     }}

  // })
  console.log(code)
  return NextResponse.json({ message: code })
}
