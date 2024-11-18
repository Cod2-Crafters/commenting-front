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
  unreadCount: number
  addNotification: (message: string) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
  setEventSource: (eventSource: EventSource) => void
  clearEventSource: () => void
  setUnreadCount: (count: number) => void
}

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      eventSource: null,
      addNotification: (message) => {
        set((state) => ({
          notifications: [
            {
              id: Date.now().toString(),
              message,
              timestamp: new Date(),
              isRead: false,
            },
            ...state.notifications,
          ],
          // unreadCount: state.unreadCount + 1, // 새 알림 추가 시 증가
        }))
      },
      markAsRead: (id) =>
        set((state) => {
          const updatedNotifications = state.notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
          const unreadCount = updatedNotifications.filter((notif) => !notif.isRead).length
          return { notifications: updatedNotifications, unreadCount }
        }),
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
      setUnreadCount: (count) => set({ unreadCount: count }),
      setEventSource: (eventSource) => set({ eventSource }),
      clearEventSource: () => {
        const { clearNotifications, eventSource } = useNotificationStore.getState()

        // 알림 초기화
        clearNotifications()

        // EventSource가 존재하면 닫음
        if (eventSource) {
          eventSource.close()
        }

        // 상태 초기화
        set({ eventSource: null, unreadCount: 0 })
      },
    }),
    {
      name: 'notification-storage',
      getStorage: () => sessionStorage,
    },
  ),
)

export { useNotificationStore }
