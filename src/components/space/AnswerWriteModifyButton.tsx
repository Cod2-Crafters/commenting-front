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
  onSubmit?: () => void; // 댓글 작성 완료 후 호출될 콜백

}

const AnswerWriteModifyButton = ({ type = 'write', mstId, modifyConversation, onSubmit }: AnswerWriteModifyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnSubmit = () => {
    if (onSubmit) {
      onSubmit(); // 작성 완료 후 콜백 호출
    }
    setIsOpen(false); // 다이얼로그 닫기
  };
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
          onSubmitT={handleOnSubmit} // 작성 완료 후 처리
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
