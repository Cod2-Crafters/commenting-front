'use client'

import axiosClient from "@/axios.config"
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from "next/image";
import { Button } from "../ui/button";
import { useNotificationStore } from "@/stores/notifiicationStore";
import NotificationDialog from "./NotificationDialog";
import { useState } from "react";

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

function NewNotificationList({ guestId }) {
    const token = useSelector((state: RootState) => state.auth.token);
    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMstId, setSelectedMstId] = useState(null);
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
            clearNotifications();
        },
    });

    const notifications = data?.data;

    const openDialog = (mstId: number) => {
        console.log(mstId)
        setSelectedMstId(mstId);
        if (!dialogOpen) setDialogOpen(true);
    }
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching notifications</div>;

    return (
        <div className="container mx-auto">
            <NotificationDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} mstId={selectedMstId} showerGuestId={guestId} />

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
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-center mb-4 pb-4 border-b border-gray-700 ${!notification.isRead ? 'bg-gray-800' : ''
                                    }`}
                                onClick={() => { openDialog(notification.mstId) }}
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