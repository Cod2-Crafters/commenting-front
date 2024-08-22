// NotificationManager.tsx
'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { initSSE } from '@/lib/initSse';
import { useNotificationStore } from '@/stores/notifiicationStore';

export default function NotificationManager() {
    const token = useSelector((state: RootState) => state.auth.token);
    const { setEventSource } = useNotificationStore();

    useEffect(() => {
        let eventSource: EventSource | null = null;

        if (token) {
            eventSource = initSSE(token);
            setEventSource(eventSource);
        }

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [token, setEventSource]);

    return null;
}