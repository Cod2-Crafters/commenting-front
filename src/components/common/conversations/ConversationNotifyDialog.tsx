import { FormError } from '@/components/form-error'
import ProfileCard from '@/components/profile-card'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormControl, Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import React, { ReactNode, useEffect, useState } from 'react'
import { ConversationQuestionDialog } from './ConversationDialogMain'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConversationQuestionModifySchema, ConversationQuestionModifySchemaState, ConversationQuestionWriteSchema, ConversationQuestionWriteSchemaState, ConversationSchemaState } from '@/schemas'
import { createQuestion, modifyAnswer, modifyQuestion } from '@/app/space/conversationSlice'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useSpaceContext } from '@/hooks/useSpaceContext'
import { getImageUrl, getNickname } from '@/lib/utils'
import useFetchQueryConversations from '@/hooks/useFetchQueryConversations'

interface ConversationNotifyDialogProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  trigger?: ReactNode
  targetConvesation?: ConversationSchemaState
  targetMstId?: number
  loginUserId?: number
}

// 비어 있는 상황에서 질문 작성하기

const ConversationNotifyDialog = ({ setIsOpen, isOpen, trigger, targetConvesation, targetMstId, loginUserId }: ConversationNotifyDialogProps) => {
//   let { showerGuestId, spaceOwnerId, guestProfileData } = useSpaceContext()

  const dispatch: AppDispatch = useDispatch()

  const [question, setQuestion] = useState<ConversationSchemaState>()
  
  const [answers, setAnswers] = useState<ConversationSchemaState[]>()
  
  
  // 더블클릭 체크
  const [doubleClickConId, setDoubleClickConId] = useState(0)
  const conversationsQuery = useFetchQueryConversations(targetMstId, isOpen, doubleClickConId)

  // 폼 초기화
  const modifyForm = useForm<ConversationQuestionModifySchemaState>({
    resolver: zodResolver(ConversationQuestionModifySchema),
    // defaultValues: {
    //   conId: question?.conId,
    //   content: question?.content,
    //   isPrivate: false,
    //   isQuestion: question?.isQuestion,
    // },
  })

  // 서브밋 핸들링
  const onSubmit = async (values: ConversationQuestionModifySchemaState) => {
    try {
      await dispatch(modifyAnswer({ ...values })).unwrap()
    } catch (error) {
      modifyForm.setError('content', { message: error.message })
      return
    }
    alert('modify submit!' + JSON.stringify({ ...values }))
    setDoubleClickConId(0);
  }

  // 서브밋 오류 핸들링
  const onInvalid = (errors) => {
    alert('modify invalid:' + errors)
  }

    // 더블클릭 시, 폼에다가 값 반영
  useEffect(() => {
    const doubleClickAnswer = conversationsQuery?.data?.find((answer) => answer.conId === doubleClickConId )
    modifyForm.reset({
      ...doubleClickAnswer
    })
  }, [conversationsQuery.data]) 

  // 쿼리 갱신 완료되면 질문정보 및 답변정보 재설정
  useEffect(() => {
    const findQuestion = conversationsQuery.data?.find((question) => question.isQuestion && question.mstId == targetMstId)
    setQuestion(findQuestion)

    const fiteredAnswers = conversationsQuery?.data?.filter((conversation) => !conversation.isQuestion)
    setAnswers(fiteredAnswers)
  }, [isOpen === true, conversationsQuery.data])


  // 더블클릭 시 더블클릭모드 초기화
  useEffect(() => {
    setDoubleClickConId(0);
  }, [isOpen === false])

  if (!isOpen) return trigger;

  return (
    <ConversationQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      {/* <h4 className="text-custom-white">questionInfo {JSON.stringify(question) + '/' + targetMstId}</h4>
      <h4 className="text-custom-white">
        guestId: {showerGuestId} / {spaceOwnerId}
      </h4>
      <h4 className="text-custom-white">content: {question?.content}</h4> */}
      {isOpen === true && (
        <Form {...modifyForm}>
          <form onSubmit={modifyForm.handleSubmit(onSubmit, onInvalid)}>
            <ConversationQuestionDialog.Header>
                {doubleClickConId !== 0 && <>
                  <Button type="submit" variant={'primary'} size={'lg'} className="text-right">수정</Button>
                  <Button type="submit" variant={'primary'} size={'lg'} className="text-right" onClick={() => setDoubleClickConId(0)}>취소</Button>
                </>}
            </ConversationQuestionDialog.Header>
            <ConversationQuestionDialog.Content>
              <div className="flex flex-col space-y-4 max-h-[420px]">
                {/* items */}
                <div>
                  <ProfileCard name={getNickname(question?.guestId == loginUserId ? question.nickname : null)} imagePath={getImageUrl(question?.avatarPath)} />
                  {/*  내용 */}
                  <div className="relative my-4">
                    {/* after */}
                    <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">&nbsp;</p>
                    <div className="py-2 mr-14 ml-14">
                      <p>{question?.content}</p>
                    </div>
                  </div>
                </div>

                {conversationsQuery.isLoading && <div>Loading...</div>}
                {answers?.map((answer, index) => {
                  return (
                    <div key={answer.conId} onDoubleClick={() => {
                        if (doubleClickConId) return;
                        setDoubleClickConId(answer.conId)
                      }}>
                      <ProfileCard name={getNickname(answer.ownerId == loginUserId ? answer.nickname : null) + `${answer.ownerId === loginUserId ? ' (나)' : ''}`} imagePath={getImageUrl(answer?.avatarPath)} />
                      {/*  내용 */}
                      <div className="relative my-4">
                      {/* <p className='text-red-300 max-w-sm text-center break-words'>{JSON.stringify(answer)}</p> */}
                        {/* after */}
                        
                        {answers[index + 1] && <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">&nbsp;</p>}
                        <div className="py-2 mr-14 ml-14">
                          {doubleClickConId !== answer.conId ? (
                            <p className='text-wrap break-words'>{answer.content}</p>
                          ) : (
                            <>
                            <FormField
                              control={modifyForm.control}
                              name="content"
                              render={({ field }) => (
                                <FormItem >
                                  <FormControl>
                                    <>
                                      <Textarea {...field} className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2" placeholder="궁금한 것을 적어주세요" maxLength={500} />
                                      {modifyForm.formState.errors.content && <FormError message={modifyForm.formState.errors.content.message} />}
                                    </>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            </>

                          )}
                          
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ConversationQuestionDialog.Content>
          </form>
        </Form>
      )}
    </ConversationQuestionDialog>

    // <ConversationQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
    //   <h4 className='text-custom-white'>guestId: {showerGuestId}</h4>
    //   {isOpen === true && (
    //     <Form {...modifyForm}>
    //       <form onSubmit={modifyForm.handleSubmit(onSubmit, onInvalid)}>
    //         <ConversationQuestionDialog.Header>
    //           <Button type="submit" variant={'primary'} size={'lg'} className="text-right">
    //             수정
    //           </Button>
    //         </ConversationQuestionDialog.Header>
    //         <ConversationQuestionDialog.Content>
    //           <div className="flex flex-col space-y-4 max-h-[420px]">
    //             {/* items */}
    //             <div>
    //               <ProfileCard name={getNickname(guestProfileData?.nickname)} imagePath={getImageUrl(guestProfileData?.avatarPath)} />
    //               {/*  내용 */}
    //               <div className="relative my-4">
    //                 {/* after */}
    //                 <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">&nbsp;</p>
    //                 <div className="py-2 mr-14 ml-14">
    //                   <FormField
    //                     control={modifyForm.control}
    //                     name="content"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormControl>
    //                           <>
    //                             <Textarea {...field} className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2" placeholder="궁금한 것을 적어주세요" maxLength={500} />
    //                             {modifyForm.formState.errors.content && <FormError message={modifyForm.formState.errors.content.message} />}
    //                           </>
    //                         </FormControl>
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </ConversationQuestionDialog.Content>
    //       </form>
    //     </Form>
    //   )}
    // </ConversationQuestionDialog>
  )
}

export default ConversationNotifyDialog

