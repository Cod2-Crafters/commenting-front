import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {


  return (
    <main className="flex h-full felx-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-modern-gray to-medium-gray">
        <p className="text-white text-lg">
          메인 페이지
        </p>
    </main>
  )
}
