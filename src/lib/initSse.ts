'use client'
import { useNotificationStore } from '@/stores/notifiicationStore'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

export const initSSE = (token: string) => {
  const EventSource = EventSourcePolyfill || NativeEventSource
  let eventSource: EventSourcePolyfill | null = null
  let retryCount = 0
  const maxRetryCount = 5
  const retryDelayInitial = 1000
  const retryDelayMax = 16000

  const createEventSource = () => {
    if (eventSource) {
      eventSource.close()
    }

    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscribe`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      heartbeatTimeout: 1200000,
      withCredentials: true,
    })

    eventSource.onopen = (event) => {
      console.log('SSE connection opened', event)
      retryCount = 0
    }

    const handleEvent = (event: MessageEvent) => {
      console.log('New message received:', event)
      try {
        // 메시지가 JSON 형식인지 확인
        if (event.data && typeof event.data === 'string' && event.data.startsWith('{')) {
          const data = JSON.parse(event.data)
          const { addNotification } = useNotificationStore.getState()
          addNotification(data.message)
        } else {
          console.warn('Received non-JSON message:', event.data)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    eventSource.onmessage = handleEvent

    // 서버에서 보내는 모든 이벤트 타입에 대해 리스너 추가
    ;['sse', 'custom-event'].forEach((eventType) => {
      eventSource.addEventListener(eventType, handleEvent)
    })

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource?.close()

      const retryDelay = Math.min(retryDelayInitial * 2 ** (retryCount - 1), retryDelayMax)
      if (retryCount < maxRetryCount) {
        retryCount++
        setTimeout(createEventSource, retryDelay)
      } else {
        console.error('Max retry count reached. Aborting reconnection attempts.')
      }
    }
  }

  createEventSource()

  window.addEventListener('offline', () => {
    console.log('Network connection lost. Closing EventSource.')
    eventSource?.close()
  })

  window.addEventListener('online', () => {
    console.log('Network connection restored. Reconnecting EventSource.')
    createEventSource()
  })

  return eventSource
}
