'use client'
import { ConversationsItemState } from '@/app/space/conversationSlice'
import axiosClient from '@/axios.config'
import { FormError } from '@/components/form-error'
import { SpaceContext } from '@/components/space/space-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useSpaceContext } from '@/hooks/useSpaceContext'
import { getImageUrl } from '@/lib/utils'
import { APIResponseMsg, ConversationQuestionWriteSchema, ConversationSchemaState } from '@/schemas'
import { RootState } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { z } from 'zod'

interface AnswerWriteDialogProps {
  questionMstId?: number
  label: string
  children?: ReactNode
}

const AnswerWriteDialog = ({ questionMstId, label }: AnswerWriteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [questionConversation, setQuestionConverstaion] = useState<ConversationSchemaState>()
  const { spaceOwnerId, showerGuestId, conversationsMaxMasterId } = useSpaceContext()

  if (questionMstId) {
    useEffect(() => {
      // 질문 작성 다이얼로그에서 질문 표시하는 api 호출
      async function fetchQuestionConversations() {
        const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/details/${questionMstId}`)
        setQuestionConverstaion(response.data.data.find((question) => question.isQuestion == true))
      }
      fetchQuestionConversations()
    }, [])
  }

  const conversationQuestionWriteForm = useForm<z.infer<typeof ConversationQuestionWriteSchema>>({
    resolver: zodResolver(ConversationQuestionWriteSchema),
    defaultValues: {
      guestId: Number(showerGuestId),
      ownerId: Number(spaceOwnerId),
      content: '',
      mstId: Number(conversationsMaxMasterId)
    },
  })


  const { content } = conversationQuestionWriteForm.watch()
  const router = useRouter()
  async function onSubmit(values: z.infer<typeof ConversationQuestionWriteSchema>) {
    values.mstId = conversationsMaxMasterId
    alert('answer write success' + JSON.stringify(values) + '@' + conversationsMaxMasterId)  

    const response = await axiosClient.post<APIResponseMsg<number | string>>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/question`, {...values, mstId: conversationsMaxMasterId})

    if (response.data.status === 'SUCCESS') {
      alert('api success!' + conversationsMaxMasterId)
    }

    conversationQuestionWriteForm.reset()
    setIsOpen(false)
  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant={'outline'} asChild={false} onClick={() => conversationQuestionWriteForm.reset()}>
            {label}
            <span>{'guestid:' + showerGuestId + ' / ownerid:' + spaceOwnerId + ' / maxMstid:' + conversationsMaxMasterId}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[600px] min-h-[100px] p-4">
          <Form {...conversationQuestionWriteForm}>
            <form onSubmit={conversationQuestionWriteForm.handleSubmit(onSubmit)}>
              {}
              <div className="w-full -mt-2 text-right py-2 min-h-8">
                <Button type="submit" variant={'primary'} size={'lg'} className="text-right">
                  저장
                </Button>
              </div>
              <div className="text-white ">
                <DialogHeader className="text-white">
                  {/* <DialogTitle>1111</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
                </DialogHeader>
                <ScrollArea className="p-4">
                  <div className="flex flex-col space-y-4 max-h-[420px]">
                    {/* items */}
                    {questionMstId != 0 && questionConversation && (
                      <div>
                        <div className="flex flex-row items-center space-x-2">
                          {/* <span className="rounded-full">
                              <DefaultUserIcon width={50} height={50} />
                            </span> */}
                          {/* before:bg-gradient-to-bl before:from-indigo-500 before:w-[50px] before:content-['_'] before:h-[50px] before:absolute before:top-0 before:rounded-full before:z-10 */}
                          <div className="rounded-full relative">
                            <Avatar className="w-[50px] h-[50px]">
                              <AvatarImage src={getImageUrl(questionConversation.avatarPath)} alt="profile" />
                              <AvatarFallback>
                                <div>
                                  <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={50} height={50} />
                                </div>
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <b>익명이</b>
                        </div>
                        <div className="relative my-4 ">
                          {/* after */}
                          <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5">&nbsp;</p>
                          <p className="flex items-center py-2 text-base break-all mr-14 ml-14 text-wrap">
                            {questionConversation.content}
                            {/* {index == 2 ? ' Lorem ipsum dolor sit amet consectetur adipisicingelit._Lorem ipsum dolor sit amet consecteturadipisicing elit.' : ''} */}
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex flex-row items-center space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                          {/* /assets/user.png */}
                          <AvatarImage src={''} alt="profile" />
                          <AvatarFallback>
                            <div>
                              <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={50} height={50} />
                            </div>
                          </AvatarFallback>
                        </Avatar>

                        {/* <Image
                      className="rounded-full"
                      src="/assets/no-user.png"
                      alt="user"
                      width={50}
                      height={50}
                    ></Image> */}
                        <b>익명이</b>
                      </div>
                      <div className="relative my-4">
                        {/* after */}
                        <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">&nbsp;</p>
                        <div className="py-2 mr-14 ml-14">
                          <FormField
                            control={conversationQuestionWriteForm.control}
                            name="content"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormControl>
                                    <>
                                      <Textarea className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2" placeholder="궁금한 것을 적어주세요" maxLength={500} {...field} />
                                      {conversationQuestionWriteForm.formState.errors.content && <FormError message={conversationQuestionWriteForm.formState.errors.content.message} />}
                                    </>
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>{content.length}</DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AnswerWriteDialog
