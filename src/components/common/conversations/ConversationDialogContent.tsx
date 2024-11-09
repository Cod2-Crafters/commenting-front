'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { ReactNode } from "react"


interface ConversationQuestionDialogContentProps {
  children?: ReactNode
}

const ConversationQuestionDialogContent = ({ children }: ConversationQuestionDialogContentProps) => {
  return (
    <div className="text-white">
        <ScrollArea className="p-4">
          {children}
        </ScrollArea>
    </div>
  )
}

export default ConversationQuestionDialogContent
