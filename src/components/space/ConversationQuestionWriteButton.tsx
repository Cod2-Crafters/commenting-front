'use client'
import ConversationQuestionWriteDialog from '../common/conversations/ConversationQuestionWriteDialog'

interface AnswerWriteButtonProps {
  label?: string
}

const AnswerWriteButton = ({ label }: AnswerWriteButtonProps) => {
  return (
    <>
      <ConversationQuestionWriteDialog label={label} />
    </>
  )
}

export default AnswerWriteButton
