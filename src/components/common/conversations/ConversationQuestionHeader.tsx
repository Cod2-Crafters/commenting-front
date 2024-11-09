'use client'
import React, { ReactNode } from 'react'

interface ConversationQuestionHeaderProps {
  children?: ReactNode
}

const ConversationQuestionDialogHeader = ({ children }: ConversationQuestionHeaderProps) => {
  return (
    <div className="w-full -mt-2 text-right py-2 min-h-8 flex flex-row-reverse gap-2">
      <>{children}</>
    </div>
  )
}

export default ConversationQuestionDialogHeader
