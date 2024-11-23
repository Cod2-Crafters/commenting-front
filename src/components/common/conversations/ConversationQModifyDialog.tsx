import { FormError } from "@/components/form-error";
import ProfileCard from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React, { ReactNode, useEffect, useState } from "react";
import { ConversationQuestionDialog } from "./ConversationDialogMain";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ConversationAnswerModifySchema,
  ConversationAnswerModifySchemaState,
  ConversationQuestionModifySchema,
  ConversationQuestionModifySchemaState,
  ConversationQuestionWriteSchema,
  ConversationQuestionWriteSchemaState,
  ConversationSchemaState,
} from "@/schemas";
import {
  createQuestion,
  fetchConversationsByMstId,
  modifyAnswer,
  modifyQuestion,
} from "@/app/space/conversationSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSpaceContext } from "@/hooks/useSpaceContext";
import { getImageUrl, getNickname } from "@/lib/utils";
import useFetchQueryConversations from "@/hooks/useFetchQueryConversations";

interface ConversationAModifyDialogProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  trigger?: ReactNode;
  // targetConvesation: ConversationSchemaState
  targetMstId: number;
}

// 비어 있는 상황에서 질문 작성하기

const ConversationQModifyDialog = ({
  setIsOpen,
  isOpen,
  trigger,
  targetMstId,
}: ConversationAModifyDialogProps) => {
  const { showerGuestId, spaceOwnerId, guestProfileData } = useSpaceContext();

  const [modifyConversation, setModifyConversation] =
    useState<ConversationSchemaState>();

  // const [isOpen, setIsOpen] = useState(true)
  const dispatch: AppDispatch = useDispatch();

  const conversationsQuery = useFetchQueryConversations(targetMstId, isOpen, 0);
  useEffect(() => {
    const questionConversation = conversationsQuery.data?.find(
      (conversation) =>
        conversation.isQuestion == true && conversation.mstId == targetMstId
    );
    setModifyConversation(questionConversation);
    modifyForm.reset({ ...questionConversation });
  }, [conversationsQuery.data && isOpen == true]);

  // 폼 초기화
  const modifyForm = useForm<ConversationAnswerModifySchemaState>({
    resolver: zodResolver(ConversationAnswerModifySchema),
    defaultValues: {
      ownerId: modifyConversation?.ownerId,
      guestId: modifyConversation?.guestId,
      content: modifyConversation?.content,
      conId: modifyConversation?.conId,
      isQuestion: true,
      isPrivate: false,
    },
  });

  // 서브밋 핸들링
  const onSubmit = async (values: ConversationAnswerModifySchemaState) => {
    try {
      await dispatch(modifyQuestion({ ...values })).unwrap();
    } catch (error) {
      modifyForm.setError("content", { message: error.message });
      return;
    }
    alert("modify submit!" + JSON.stringify({ ...values }));
    setIsOpen(false);
  };

  // 서브밋 오류 핸들링
  const onInvalid = (errors) => {
    alert("modify invalid:" + errors);
  };

  return (
    <ConversationQuestionDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={trigger}
    >
      {isOpen === true && (
        <Form {...modifyForm}>
          <form onSubmit={modifyForm.handleSubmit(onSubmit, onInvalid)}>
            <ConversationQuestionDialog.Header>
              <Button
                type="submit"
                variant={"primary"}
                size={"lg"}
                className="text-right"
              >
                수정
              </Button>
            </ConversationQuestionDialog.Header>
            <ConversationQuestionDialog.Content>
              <div className="flex flex-col space-y-4 max-h-[420px]">
                {/* items */}
                <div>
                  <ProfileCard
                    name={getNickname(guestProfileData?.nickname)}
                    imagePath={getImageUrl(guestProfileData?.avatarPath)}
                  />
                  {/*  내용 */}
                  <div className="relative my-4">
                    {/* after */}
                    <p className="absolute h-full my-auto -translate-y-1/2 border-r-2 top-1/2 border-talkborder left-5 ">
                      &nbsp;
                    </p>
                    <div className="py-2 mr-14 ml-14">
                      <FormField
                        control={modifyForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <>
                                <Textarea
                                  {...field}
                                  className="text-base bg-transparent border-0 placeholder:text-xl focus:border-secondary-variant min-h-28 focus:border-2"
                                  placeholder="궁금한 것을 적어주세요"
                                  maxLength={500}
                                />
                                {modifyForm.formState.errors.content && (
                                  <FormError
                                    message={
                                      modifyForm.formState.errors.content
                                        .message
                                    }
                                  />
                                )}
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
          </form>
        </Form>
      )}
    </ConversationQuestionDialog>
  );
};

export default ConversationQModifyDialog;
