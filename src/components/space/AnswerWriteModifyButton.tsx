'use client'
import { useState } from 'react'
import ConversationQModifyDialog from '../common/conversations/ConversationQModifyDialog'
import { Button } from '../ui/button'
import { ConversationSchemaState } from '@/schemas'
import CommentIcon from '/public/assets/comment.svg'
import ConversationAWriteDialog from '../common/conversations/ConversationAWriteDialog'
import ConversationAModifyDialog from '../common/conversations/ConversationAModifyDialog'

interface AnswerWriteModifyButtonProps {
  type: 'write' | 'modify'
  mstId?: number // write property
  modifyConversation?: ConversationSchemaState // modify property
}

const AnswerWriteModifyButton = ({ type = 'write', mstId, modifyConversation }: AnswerWriteModifyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {type === 'write' && (
        <ConversationAWriteDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          trigger={
            <Button className="text-white rounded-full" variant={'link'} onClick={() => setIsOpen(true)}>
              <CommentIcon width={16} height={16} />
            </Button>
          }
          mstId={mstId}
        />
      )}

      {type === 'modify' && (
        <ConversationAModifyDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          trigger={
            <Button className="w-full" variant={'outline'} onClick={() => setIsOpen(true)}>
              답변-수정
            </Button>
          }
          targetConvesation={modifyConversation}
        />
      )}
    </>
  )
}

export default AnswerWriteModifyButton
