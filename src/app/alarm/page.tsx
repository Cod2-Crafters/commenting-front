// pages/notifications.tsx
import { NotificationList } from '@/components/alarm/NotificationList';
import { useSSE } from '@/hooks/useSSE';
import React from 'react';

const NotificationsPage: React.FC = () => {


    return (
        <div className="container mx-auto">
            <NotificationList />
        </div>
    );
};

export default NotificationsPage;