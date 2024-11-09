import { FormError } from '@/components/form-error'
import ProfileCard from '@/components/profile-card'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormControl, Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import React, { ReactNode, useEffect, useState } from 'react'
import { ConversationQuestionDialog } from './ConversationDialogMain'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConversationQuestionWriteSchema, ConversationQuestionWriteSchemaState } from '@/schemas'
import { createQuestion } from '@/app/space/conversationSlice'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useSpaceContext } from '@/hooks/useSpaceContext'
import { getImageUrl, getNickname } from '@/lib/utils'

interface ConversationQWriteDialogProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  trigger?: ReactNode
}

// 비어 있는 상황에서 질문 작성하기

const ConversationQWriteDialog = ({ setIsOpen, isOpen, trigger }: ConversationQWriteDialogProps) => {
  let { showerGuestId, spaceOwnerId, writeMaxMstId, guestProfileData } = useSpaceContext()

  // if (!showerGuestId) {
  //   showerGuestId = 18
  //   spaceOwnerId = 18
  //   writeMaxMstId = 491
  // }

  // const [isOpen, setIsOpen] = useState(true)

  const dispatch: AppDispatch = useDispatch()

  // 폼 초기화
  const writeForm = useForm<ConversationQuestionWriteSchemaState>({
    resolver: zodResolver(ConversationQuestionWriteSchema),
    defaultValues: {
      ownerId: Number(spaceOwnerId),
      guestId: Number(showerGuestId)
    },
  })

  // 서브밋 핸들링
  const onSubmit = async (values: ConversationQuestionWriteSchemaState) => {
    dispatch(createQuestion({ ...values, maxMstId: writeMaxMstId }))
    alert('submit!')
    setIsOpen(false);
  }

  // 서브밋 오류 핸들링
  const onInvalid = (errors) => {
    alert('invalid:' + errors)
  }

  useEffect(() => {
    writeForm.reset();

  }, [isOpen === true])

  return (
    <ConversationQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      {isOpen === true && (
        <Form {...writeForm}>
          <form onSubmit={writeForm.handleSubmit(onSubmit, onInvalid)}>
            <>
              <ConversationQuestionDialog.Header>
                <Button type="submit" variant={'primary'} size={'lg'} className="text-right">
                  작성
                </Button>
              </ConversationQuestionDialog.Header>
              <ConversationQuestionDialog.Content>
                <div className="flex flex-col space-y-4 max-h-[420px]">
                  {/* items */}
                  <div>
                    <ProfileCard name={getNickname(null)} imagePath={getImageUrl(guestProfileData?.avatarPath)} />
                    {/*  내용 */}
                    <div className="relative my-4">
                      {/* after */}
                      <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">&nbsp;</p>
                      <div className="py-2 mr-14 ml-14">
                        <FormField
                          control={writeForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <>
                                  <Textarea {...field} className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2" placeholder="궁금한 것을 적어주세요" maxLength={500} />
                                  {writeForm.formState.errors.content && <FormError message={writeForm.formState.errors.content.message} />}
                                </>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ConversationQuestionDialog.Content>
            </>
          </form>
        </Form>
      )}
    </ConversationQuestionDialog>
  )
}

export default ConversationQWriteDialog
