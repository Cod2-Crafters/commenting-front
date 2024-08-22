'use client'
import ConversationQuestionWriteDialog from '../common/conversations/ConversationQuestionWriteDialog'

interface AnswerWriteButtonProps {
  label?: string
  questionMstId?: number
}

const AnswerWriteButton = ({ label, questionMstId = 0 }: AnswerWriteButtonProps) => {
  return (
    <>
      <ConversationQuestionWriteDialog label={label} questionMstId={questionMstId} />
    </>
  )
}

export default AnswerWriteButton
