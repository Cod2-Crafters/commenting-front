// components/NotificationList.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useNotificationStore } from '@/stores/notifiicationStore';
import { initSSE } from '@/lib/initSse';

export const NotificationList: React.FC = () => {

    const [loading, setLoading] = useState(true);



    const { notifications, markAsRead, clearNotifications, addNotification, eventSource } = useNotificationStore();
    useEffect(() => {
        setLoading(false);
    }, []);


    useEffect(() => {
        if (eventSource) {
            const handleEvent = (event: MessageEvent) => {
                console.log('New message received:', event);
                try {
                    const data = JSON.parse(event.data);
                    console.log('Parsed message data:', data);
                    useNotificationStore.getState().addNotification(data.message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };

            eventSource.onmessage = handleEvent;

            return () => {
                eventSource.onmessage = null;
            };
        }
    }, [eventSource]);


    if (loading) {
        return <div className="bg-gray-900 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">알림</h2>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 모두 읽음
                </label>
            </div>
            <p>Loading......</p>
        </div>;
    }

    return (
        <div className="bg-gray-900 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">알림</h2>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 모두 읽음
                </label>
            </div>
            {!notifications || notifications.length === 0 ? (
                <p>새로운 알림이 없습니다.</p>
            ) : (
                <>
                    {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-center mb-4 pb-4 border-b border-gray-700">
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
                                <p className="text-sm text-gray-400">{notification.timestamp.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={clearNotifications}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        모든 알림 삭제
                    </button>
                </>
            )}
        </div>
    );
};