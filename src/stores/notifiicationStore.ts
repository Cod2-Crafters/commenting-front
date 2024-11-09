// notificationStore.ts
'use client'
import { create } from'zustand'
import { persist } from 'zustand/middleware'

type NotificationType = {
  id: string
  message: string
  timestamp: Date
  isRead: boolean
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
    (set) => ({
      notifications: [],
      eventSource: null,
      addNotification: (message) =>
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
        })),
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
      getStorage: () => sessionStorage
    },
  ),
)

export { useNotificationStore }
