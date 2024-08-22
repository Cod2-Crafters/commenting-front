'use client'
import { useNotificationStore } from '@/stores/notifiicationStore'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useEffect } from 'react'

export const useSSE = (token: string) => {
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource

    console.log('Initializing EventSource with token:', token)

    let eventSource: EventSourcePolyfill | null = null
    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscribe`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      withCredentials: true,
    })

    eventSource.onopen = () => {
      console.log('EventSource connection opened')
    }

    eventSource.onmessage = (event) => {
      console.log('Event received:', event)
      try {
        const data = JSON.parse(event.data)
        console.log('Parsed data:', data)
        addNotification(data.message)
      } catch (error) {
        console.error('Error parsing SSE message:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return () => {
      console.log('Closing EventSource connection')
      eventSource.close()
    }
  }, [token, addNotification])
}
