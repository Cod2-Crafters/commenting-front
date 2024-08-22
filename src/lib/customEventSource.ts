// lib/customEventSource.ts
export class CustomEventSource {
  private eventSource: EventSource | null = null
  private listeners: { [key: string]: Function[] } = {}

  constructor(url: string, token: string) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 2 && xhr.status === 200) {
        this.eventSource = new EventSource(url)
        this.eventSource.onmessage = (event) => {
          this.emit('message', event)
        }
        this.eventSource.onerror = (error) => {
          this.emit('error', error)
          this.eventSource?.close()
        }
      }
    }
    xhr.send()
  }

  addEventListener(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
  }

  private emit(event: string, data: any) {
    const listeners = this.listeners[event]
    if (listeners) {
      listeners.forEach((listener) => listener(data))
    }
  }
}
