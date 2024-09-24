'use client'

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl, getTimeDiffText } from '@/lib/utils';
import axiosClient from '@/axios.config';
import { useDispatch } from 'react-redux';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import MoreIcon from '/public/assets/more.svg';
import HeartIcon from '/public/assets/heart.svg';
import HeartFillIcon from '/public/assets/heart-fill.svg';
import ShareIcon from '/public/assets/share.svg';
import AnswerWriteButton from '../space/ConversationQuestionWriteButton'
import { deleteQuestion, toggleQuestionLikeIt } from '@/app/space/conversationSlice';
import { AppDispatch } from '@/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';



const fetchConversationDetails = async (mstId) => {
    if (!mstId) return;
    const response = await axiosClient.get(`/api/conversations/details/${mstId}`);
    return response.data.data;
};



const NotificationDialog = ({ isOpen, setIsOpen, mstId, showerGuestId }) => {
    const dispatch: AppDispatch = useDispatch();

    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { data: conversations, refetch } = useQuery({
        queryKey: ['conversationDetails', mstId],
        queryFn: () => fetchConversationDetails(mstId),
        enabled: isOpen && !!mstId,
        staleTime: 0,
    });

    useEffect(() => {
        if (isOpen && mstId) {
            refetch();
        }
    }, [isOpen, mstId, refetch]);

    const handleAnswerSubmit = async () => {
        // setIsLoading(true);
        setTimeout(async () => {
            await queryClient.invalidateQueries({ queryKey: ['conversationDetails', mstId] });
            // setIsLoading(false);
        }, 1000)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[800px] h-[500px] p-8">
                {isLoading ? <>로딩중...</> : <><DialogTitle>대화 상세</DialogTitle>
                    <DialogDescription className="overflow-y-auto h-[400px]">
                        {conversations && conversations.map((conversation, index) => (
                            <div key={conversation.conId} className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-[36px] h-[36px]">
                                            <AvatarImage src={getImageUrl(conversation.avatarPath)} alt="profile" />
                                            <AvatarFallback>
                                                <img className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-0 border-white p-1" src="/assets/no-user.png" alt="profile" width={84} height={84} />
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-base font-semibold">익명 {conversation.isQuestion ? '(질문)' : '(답변)'}</p>
                                        <span className="text-sm font-medium text-muted">{getTimeDiffText(conversation.modifiedAt)}</span>
                                    </div>
                                    {showerGuestId === conversation.ownerId && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button variant={'outline'} size={'icon'}>
                                                    <MoreIcon width={24} height={24} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='overflow-hidden'>
                                                <DropdownMenuItem>
                                                    <Button variant={'outline'} size={'lg'} onClick={() => dispatch(deleteQuestion(conversation.mstId))}>
                                                        삭제
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                                <div className='flex flex-row'>
                                    <div className='w-[36px]'>
                                        <div className="w-[36px] h-full flex flex-col items-center mt-0 flex-shrink-0">
                                            {/* 다음 질문 글이 답변이면 선을 표시함 */}
                                            <span
                                                className={`w-[0.5px] h-full bg-white my-2 ${conversations[index + 1]?.isQuestion === false ? ' visible' : ' hidden'}`}
                                            >
                                                {' '}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-base break-all text-wrap">{conversation.content}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <Button className="flex justify-start text-red" variant={'link'} size={'sm'} onClick={() => dispatch(toggleQuestionLikeIt({ conId: conversation.conId, userId: showerGuestId }))}>
                                                {showerGuestId !== 0 && conversation.isGood ? <HeartFillIcon width={16} height={16} /> : <HeartIcon width={16} height={16} />}
                                            </Button>
                                            {conversation.isQuestion && (
                                                <>
                                                    <AnswerWriteButton label='' questionMstId={conversation.mstId} onAnswerSubmit={handleAnswerSubmit} />
                                                    <Button className="text-white rounded-full" variant={'link'}>
                                                        <ShareIcon width={16} height={16} />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </DialogDescription></>}

            </DialogContent>
        </Dialog>
    );
};

export default NotificationDialog;