// notificationStore.ts
'use client'
import { selectUserId } from '@/app/auth/authSlice'
import { useSelector } from 'react-redux'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type NotificationType = {
  id: string
  message: string
  timestamp: Date
  isRead: boolean
  ownerId?: number
  // userId : number
}

type NotificationStore = {
  notifications: NotificationType[]
  eventSource: EventSource | null
  addNotification: (message: string) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
  setEventSource: (eventSource: EventSource) => void
  clearEventSource: () => void
}

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      eventSource: null,
      addNotification: (message) => {
        const userId = useSelector(selectUserId)
        set((state) => ({
          notifications: [
            {
              id: Date.now().toString(),
              message,
              timestamp: new Date(),
              isRead: false,
              userId: userId,
            },
            ...state.notifications,
          ],
        }))
      },
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
        })),
      clearNotifications: () => set({ notifications: [] }),
      setEventSource: (eventSource) => set({ eventSource }),
      clearEventSource: () => {
        const { clearNotifications, eventSource } = useNotificationStore.getState()
        clearNotifications()
        if (eventSource) eventSource.close()
        set({ eventSource: null })
      },
    }),
    {
      name: 'notification-storage',
      getStorage: () => sessionStorage,
    },
  ),
)

export { useNotificationStore }
