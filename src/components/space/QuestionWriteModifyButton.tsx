'use client'
import { useState } from 'react'
import ConversationQuestionWriteDialog from '../common/conversations/ConversationQuestionWriteDialog'
import ConversationQWriteDialog from '../common/conversations/ConversationQWriteDialog'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import ConversationQModifyDialog from '../common/conversations/ConversationQModifyDialog'
import { ConversationSchemaState } from '@/schemas'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface QuestionWriteModifyButtonProps {
  label?: string
  type: 'write' | 'modify'
  // modifyConversation?: ConversationSchemaState
  modifyMstId?: number
}

const QuestionWriteModifyButton = ({ type, modifyMstId }: QuestionWriteModifyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {type === 'write' && (
        <ConversationQWriteDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          trigger={
            <Button className="w-full" variant={'outline'} onClick={() => setIsOpen(true)}>
              궁금해요
            </Button>
          }
        />
      )}
      {type === 'modify' && (
        <ConversationQModifyDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          trigger={
            <Button className="w-full" variant={'outline'} onClick={() => setIsOpen(true)}>
              수정(질문)
            </Button>
          }
          // targetConvesation={modifyConversation}
          targetMstId={modifyMstId}
        />
      )}
    </>
  )
}

export default QuestionWriteModifyButton
