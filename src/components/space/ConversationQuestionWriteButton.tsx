'use client'
import ConversationQuestionWriteDialog from '../common/conversations/ConversationQuestionWriteDialog'

interface AnswerWriteButtonProps {
  label?: string
  questionMstId?: number
  onAnswerSubmit?: () => void
}

const AnswerWriteButton = ({ label, questionMstId = 0, onAnswerSubmit }: AnswerWriteButtonProps) => {
  return (
    <>
      <ConversationQuestionWriteDialog label={label} questionMstId={questionMstId} onAnswerSubmit={onAnswerSubmit} />
    </>
  )
}

export default AnswerWriteButton