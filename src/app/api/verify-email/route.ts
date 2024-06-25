import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log(req)
  if (req.method === 'POST') {
    const body = await req.json()

    const { email, isVerify } = body

    if (!email || !isVerify) {
      return NextResponse.json(
        { error: 'Missing email or isVerify' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 },
    )
  } else {
    return NextResponse.json({ message: 'Method not Allowed' }, { status: 405 })
  }
}
