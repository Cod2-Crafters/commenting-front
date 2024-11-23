export async function GET(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { token } = req.query
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscribe`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'text/event-stream',
    },
  })

  response.body.pipeTo(res)
}
