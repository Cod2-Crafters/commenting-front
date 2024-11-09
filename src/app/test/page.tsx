'use server'

import { getSession } from "@/lib/login"
import { redirect } from "next/navigation";

type Props = {}

const TestPage = async (props: Props) => {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login')
  }
  return (
    <div className="bg-red-300">
      1111
    </div>
  )
}

export default TestPage
