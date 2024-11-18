'use client'

import axiosClient from "@/axios.config"
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from "next/image";
import { Button } from "../ui/button";
import { useNotificationStore } from "@/stores/notifiicationStore";
import NotificationDialog from "./NotificationDialog";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

async function getNotifications(token: string) {
    const { data } = await axiosClient.get('/api/notifications', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

async function markAllNotificationsAsRead(token: string) {
    const { data } = await axiosClient.put('/api/notifications/mark-read', null, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return data;
}

async function markReadNotification(token: string, notificationId: number, mstId: number) {
    const { data } = await axiosClient.request({
        method: 'POST', // API가 GET을 사용한다고 가정
        url: `/api/notifications/${notificationId}/mark-read`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            mstId: mstId,
            isRead: false
        }
    });
    return data;
}


function NewNotificationList({ guestId }) {
    const token = useSelector((state: RootState) => state.auth.token);
    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMstId, setSelectedMstId] = useState(null);
    const { setUnreadCount } = useNotificationStore();

    // const session = await getSession()

    const { clearNotifications, clearEventSource } = useNotificationStore();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notification', token],
        queryFn: () => getNotifications(token),
        enabled: !!token,
    });

    const markReadMutation = useMutation({
        mutationFn: () => markAllNotificationsAsRead(token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notification', token] });
            setUnreadCount(0);
            clearNotifications();
        },
    });


    const readNotification = useMutation({
        mutationFn: (notificationId: number) => markReadNotification(token, notificationId, selectedMstId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notification', token] });
            setUnreadCount((useNotificationStore.getState().unreadCount || 0) - 1);


        },
    });


    const notifications = data?.data;

    const openDialog = (mstId: number, notificationId: number) => {
        console.log(mstId)
        setSelectedMstId(mstId);
        readNotification.mutate(notificationId)
        if (!dialogOpen) setDialogOpen(true);
    }
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching notifications</div>;

    return (
        <div className="container mx-auto">
            <NotificationDialog token={token} isOpen={dialogOpen} setIsOpen={setDialogOpen} mstId={selectedMstId} showerGuestId={guestId} />

            <div className="bg-gray-900 text-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">알림</h2>
                    <label className="flex items-center">
                        <Button
                            className="mr-2"
                            onClick={() => markReadMutation.mutate()}
                        > <p className="text-black">모두 읽음</p>
                        </Button>
                    </label>
                </div>
                {!notifications || notifications.length === 0 ? (
                    <p>새로운 알림이 없습니다.</p>
                ) : (
                    <>
                        {notifications.map((notification: { id: Key; isRead: any; mstId: number; message: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode>; createdAt: string | number | Date; }) => (
                            <div
                                key={notification.id}
                                className={`flex items-center mb-4 pb-4 border-b border-gray-700 ${!notification.isRead ? 'bg-gray-800' : ''
                                    }`}
                                onClick={() => { openDialog(notification.mstId, Number(notification.id)) }}
                            >
                                <div className="mr-4 text-red-500">❤️</div>
                                <Image
                                    src="/icons/avatar.png"
                                    alt="User avatar"
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-4"
                                />
                                <div>
                                    <p>{notification.message}</p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default NewNotificationList;