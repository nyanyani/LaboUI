import { useCallback, useRef } from "react"

export interface Listeners {
  addListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  addListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  removeListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
  removeListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
  removeAllListeners(): void
}

export default function useListeners() {
  const listenersRef = useRef(new Map())

  const addListener = useCallback((eventTarget, type, listener, options) => {
    const listenersMap = listenersRef.current
    listenersMap.set(listener, { type, eventTarget, options })
    eventTarget.addEventListener(type, listener, options)
  }, [])

  const removeListener = useCallback((eventTarget, type, listener, options) => {
    const listenersMap = listenersRef.current
    eventTarget.removeEventListener(type, listener, options)
    listenersMap.delete(listener)
  }, [])

  const removeAllListeners = useCallback(() => {
    const listenersMap = listenersRef.current
    listenersMap.forEach((config, listener) => {
      config.eventTarget.removeEventListener(config.type, listener, config.options)
    })
    listenersMap.clear()
  }, [])

  return {
    addListener,
    removeListener,
    removeAllListeners,
  }
}
