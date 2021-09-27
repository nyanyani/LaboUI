import { HTMLAttributes, useMemo, useRef, useState } from "react"
import { mergeProps } from "@/utils"
import useListeners, { Listeners } from "../utils/useListeners"

export interface PressHookProps extends PressProps {
  /** A ref to the target element. */
  ref?: { current: HTMLElement }
}
export interface PressProps extends PressHandlers {
  /** Whether the target is in a controlled press state (e.g. an overlay it triggers is open). */
  isPressed?: boolean
  /** Whether the press events should be disabled. */
  isDisabled?: boolean
  /** Whether the target should not receive focus on press. */
  preventFocusOnPress?: boolean
  /**
   * Whether press events should be canceled when the pointer leaves the target while pressed.
   * By default, this is `false`, which means if the pointer returns back over the target while
   * still pressed, onPressStart will be fired again. If set to `true`, the press is canceled
   * when the pointer leaves the target and onPressStart will not be fired if the pointer returns.
   * @default false
   */
  shouldCancelOnPointerExit?: boolean
}
export interface PressHandlers {
  /** Handler that is called when the press is released over the target. */
  onPress?: (event: PressEvent) => void
  /** Handler that is called when a press interaction starts. */
  onPressStart?: (event: PressEvent) => void
  /**
   * Handler that is called when a press interaction ends, either
   * over the target or when the pointer leaves the target.
   */
  onPressEnd?: (event: PressEvent) => void
  /** Handler that is called when the press state changes. */
  onPressChange?: (isPressed: boolean) => void
  /**
   * Handler that is called when a press is released over the target, regardless of
   * whether it started on the target or not.
   */
  onPressUp?: (event: PressEvent) => void
}
export interface PressEvent extends EventBase {
  /** The type of press event being fired. */
  type: "pressstart" | "pressend" | "pressup" | "press"
  /** The pointer type that triggered the press event. */
  pointerType: PointerType
  /** The target element of the press event. */
  target: HTMLElement
}
export interface EventBase {
  currentTarget: EventTarget
  /** Whether the shift keyboard modifier was held during the press event. */
  shiftKey: boolean
  /** Whether the ctrl keyboard modifier was held during the press event. */
  ctrlKey: boolean
  /** Whether the meta keyboard modifier was held during the press event. */
  metaKey: boolean
  /** Whether the alt keyboard modifier was held during the press event. */
  altKey: boolean
}

export interface PressState {
  isPressed: boolean
  ignoreEmulatedMouseEvents: boolean
  ignoreClickAfterPress: boolean
  didFirePressStart: boolean
  activePointerId: any
  target: HTMLElement | null
  pointerType: PointerType
  isOverTarget: boolean
}
export interface PressResult {
  /** Whether the target is currently pressed. */
  isPressed: boolean
  /** Props to spread on the target element. */
  pressProps: HTMLAttributes<HTMLElement>
}
export type PointerType = "mouse" | "pen" | "touch" | "keyboard" | null

const initPressState = {
  isPressed: false,
  ignoreEmulatedMouseEvents: false,
  ignoreClickAfterPress: false,
  didFirePressStart: false,
  activePointerId: null,
  target: null,
  isOverTarget: false,
  pointerType: null,
}

/**
 * Handles press interactions across mouse, touch, keyboard, and screen readers.
 * It normalizes behavior across browsers and platforms, and handles many nuances
 * of dealing with pointer and keyboard events.
 */
export function usePress(props: PressHookProps): PressResult {
  const {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    ref,
    ...domProps
  } = props

  const [isPressed, setPressed] = useState<boolean>(!!isPressedProp)

  /** Update hook props every time component rerendered by using useRef. */
  const pressHookPropsRef = useRef<PressHookProps>({})
  pressHookPropsRef.current = {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    ref,
    shouldCancelOnPointerExit,
  }

  const domPropsRef = useRef({})
  domPropsRef.current = { ...domProps }

  const pressPropsRef = useRef<PressState>(initPressState)

  const { addListener, removeListener, removeAllListeners } = useListeners()

  const pressProps = useMemo(() => {
    const originProps = getPressProps(pressPropsRef, pressHookPropsRef, {
      addListener,
      removeListener,
      removeAllListeners,
      setPressed,
    })
    return mergeProps(originProps, domPropsRef.current as HTMLAttributes<HTMLElement>)
  }, [addListener, removeAllListeners, removeListener])

  return {
    isPressed,
    pressProps,
  }
}

interface UpdatePressPropsHelpers extends Listeners {
  setPressed: React.Dispatch<React.SetStateAction<boolean>>
}
function getPressProps(
  pressPropsRef: React.MutableRefObject<PressState>,
  pressHookPropsRef: React.MutableRefObject<PressHookProps>,
  helpers: UpdatePressPropsHelpers
): HTMLAttributes<HTMLElement> {
  const state = pressPropsRef.current

  const { setPressed, addListener, removeAllListeners } = helpers

  const triggerPressStart = (originalEvent: EventBase, pointerType: PointerType) => {
    const { isDisabled, onPressStart, onPressChange } = pressHookPropsRef.current

    const target = originalEvent.currentTarget
    if (isDisabled || state.didFirePressStart || !target) {
      return
    }

    if (typeof onPressStart === "function") {
      onPressStart({
        ...originalEvent,
        target: target as HTMLElement,
        type: "pressstart",
        pointerType,
      })
    }

    if (typeof onPressChange === "function") {
      onPressChange(true)
    }

    state.didFirePressStart = true
    setPressed(true)
  }

  const triggerPressEnd = (originalEvent: EventBase, pointerType: PointerType, wasPressed = true) => {
    const { isDisabled, onPress, onPressEnd, onPressChange } = pressHookPropsRef.current
    const target = originalEvent.currentTarget

    if (!state.didFirePressStart || !target) {
      return
    }

    state.ignoreClickAfterPress = true
    state.didFirePressStart = false

    if (typeof onPressEnd === "function") {
      onPressEnd({
        ...originalEvent,
        target: target as HTMLElement,
        type: "pressend",
        pointerType,
      })
    }

    if (typeof onPressChange === "function") {
      onPressChange(false)
    }

    setPressed(false)

    if (typeof onPress === "function" && wasPressed && !isDisabled) {
      onPress({
        ...originalEvent,
        target: target as HTMLElement,
        type: "press",
        pointerType,
      })
    }
  }

  const triggerPressUp = (originalEvent: EventBase, pointerType: PointerType) => {
    const { isDisabled, onPressUp } = pressHookPropsRef.current

    const target = originalEvent.currentTarget

    if (isDisabled || !target) {
      return
    }

    if (typeof onPressUp === "function") {
      onPressUp({
        ...originalEvent,
        target: target as HTMLElement,
        type: "pressup",
        pointerType,
      })
    }
  }

  const cancel = (e: EventBase) => {
    const { isPressed, isOverTarget, target, pointerType } = state

    if (isPressed && target) {
      if (isOverTarget) {
        triggerPressEnd(createEvent(target, e), pointerType, false)
      }
      state.isPressed = false
      state.isOverTarget = false
      state.activePointerId = null
      state.pointerType = null

      removeAllListeners()
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { isPressed, target } = state

    if (!target || !e.target) {
      return
    }

    if (isPressed && isValidKeyboardEvent(e)) {
      e.preventDefault()
      e.stopPropagation()

      state.isPressed = false
      triggerPressEnd(createEvent(target, e as EventBase), "keyboard", e.target === target)
      removeAllListeners()

      // If the target is a link, trigger the click method to open the URL,
      // but defer triggering pressEnd until onClick event handler.
      if (e.target === target && isHTMLAnchorLink(target)) {
        target.click()
      }
    }
  }

  const pressProps: HTMLAttributes<HTMLElement> = {
    onKeyDown(e) {
      if (isValidKeyboardEvent(e.nativeEvent) && e.currentTarget.contains(e.target as HTMLElement)) {
        e.preventDefault()
        e.stopPropagation()

        // If the event is repeating, it may have started on a different element
        // after which focus moved to the current element. Ignore these events and
        // only handle the first key down event.
        if (!state.isPressed && !e.repeat) {
          state.target = e.currentTarget as HTMLElement
          state.isPressed = true
          triggerPressStart(e, "keyboard")

          // Focus may move before the key up event, so register the event on the document
          // instead of the same element where the key down event occurred.
          addListener(document, "keyup", onKeyUp, false)
        }
      }
    },

    onClick(e) {
      const { isDisabled } = pressHookPropsRef.current

      if (e && !e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      if (e && e.button === 0) {
        e.stopPropagation()
        if (isDisabled) {
          e.preventDefault()
        }

        state.ignoreEmulatedMouseEvents = false
        state.ignoreClickAfterPress = false
      }
    },
  }

  /**
   * Use pointerEvent first.
   */
  if (window.PointerEvent) {
    const onPointerMove = (e: PointerEvent) => {
      const { target, isOverTarget } = state
      if (e.pointerId !== state.activePointerId || !target) {
        return
      }

      if (isOverElement(e, target)) {
        if (!isOverTarget) {
          state.isOverTarget = true
          triggerPressStart(createEvent(target, e as EventBase), state.pointerType)
        }
      } else if (state.isOverTarget) {
        state.isOverTarget = false
        triggerPressEnd(createEvent(target, e as EventBase), state.pointerType, false)
        if (pressHookPropsRef.current.shouldCancelOnPointerExit) {
          cancel(e as EventBase)
        }
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      if (state.target && e.pointerId === state.activePointerId && state.isPressed && e.button === 0) {
        if (isOverElement(e, state.target)) {
          triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType)
        } else if (state.isOverTarget) {
          triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType, false)
        }

        state.isPressed = false
        state.isOverTarget = false
        state.activePointerId = null
        state.pointerType = null
        removeAllListeners()
      }
    }

    const onPointerCancel = (e: PointerEvent) => {
      cancel(e as EventBase)
    }

    pressProps.onPointerDown = (e) => {
      // Only handle left clicks, and ignore events that bubbled through portals.
      if (e.button !== 0 || !e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      state.pointerType = e.pointerType
      if (!state.isPressed) {
        state.isPressed = true
        state.isOverTarget = true
        state.activePointerId = e.pointerId
        state.target = e.currentTarget

        triggerPressStart(e, state.pointerType)

        addListener(document, "pointermove", onPointerMove, false)
        addListener(document, "pointerup", onPointerUp, false)
        addListener(document, "pointercancel", onPointerCancel, false)
      }
    }

    pressProps.onMouseDown = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      if (e.button === 0) {
        // Chrome and Firefox on touch Windows devices require mouse down events
        // to be canceled in addition to pointer events, or an extra asynchronous
        // focus event will be fired.
        e.preventDefault()
        e.stopPropagation()
      }
    }

    pressProps.onPointerUp = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      // Only handle left clicks
      // Safari on iOS sometimes fires pointerup events, even
      // when the touch isn't over the target, so double check.
      if (e.button === 0 && isOverElement(e, e.currentTarget)) {
        triggerPressUp(e, state.pointerType || e.pointerType)
      }
    }
  } else {
    const onMouseUp = (e: MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0 || !state.target) {
        return
      }

      state.isPressed = false
      removeAllListeners()

      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false
        return
      }

      if (isOverElement(e, state.target)) {
        triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType)
      } else if (state.isOverTarget) {
        triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType, false)
      }

      state.isOverTarget = false
    }

    pressProps.onMouseUp = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      if (!state.ignoreEmulatedMouseEvents && e.button === 0) {
        triggerPressUp(e, state.pointerType)
      }
    }

    pressProps.onMouseDown = (e) => {
      // Only handle left clicks
      if (e.button !== 0 || !e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      // Due to browser inconsistencies, especially on mobile browsers, we prevent
      // default on mouse down and handle focusing the pressable element ourselves.
      e.preventDefault()
      e.stopPropagation()

      if (state.ignoreEmulatedMouseEvents) {
        return
      }

      state.isPressed = true
      state.isOverTarget = true
      state.target = e.currentTarget
      state.pointerType = "mouse"

      triggerPressStart(e, state.pointerType)

      addListener(document, "mouseup", onMouseUp, false)
    }

    pressProps.onMouseEnter = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
        state.isOverTarget = true
        triggerPressStart(e, state.pointerType)
      }
    }

    pressProps.onMouseLeave = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
        state.isOverTarget = false
        triggerPressEnd(e, state.pointerType, false)
        if (pressHookPropsRef.current.shouldCancelOnPointerExit) {
          cancel(e)
        }
      }
    }

    const onScroll = (e: Event) => {
      if (state.isPressed && (e.target as HTMLElement).contains(state.target)) {
        cancel({
          currentTarget: state.target!,
          shiftKey: false,
          ctrlKey: false,
          metaKey: false,
          altKey: false,
        })
      }
    }

    pressProps.onTouchStart = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      const touch = getTouchFromEvent(e.nativeEvent)
      if (!touch) {
        return
      }
      state.activePointerId = touch.identifier
      state.ignoreEmulatedMouseEvents = true
      state.isOverTarget = true
      state.isPressed = true
      state.target = e.currentTarget
      state.pointerType = "touch"

      triggerPressStart(e, state.pointerType)

      addListener(window, "scroll", onScroll, true)
    }

    pressProps.onTouchMove = (e) => {
      const { pointerType, activePointerId, isOverTarget } = state
      const { shouldCancelOnPointerExit } = pressHookPropsRef.current

      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      if (!state.isPressed) {
        return
      }

      const touch = getTouchById(e.nativeEvent, activePointerId)
      if (touch && isOverElement(touch, e.currentTarget)) {
        if (!isOverTarget) {
          state.isOverTarget = true
          triggerPressStart(e, pointerType)
        }
      } else if (isOverTarget) {
        state.isOverTarget = false
        triggerPressEnd(e, pointerType, false)
        if (shouldCancelOnPointerExit) {
          cancel(e)
        }
      }
    }

    pressProps.onTouchEnd = (e) => {
      const { isPressed, pointerType, activePointerId, isOverTarget } = state

      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      if (!isPressed) {
        return
      }

      const touch = getTouchById(e.nativeEvent, activePointerId)
      if (touch && isOverElement(touch, e.currentTarget)) {
        triggerPressUp(e, pointerType)
        triggerPressEnd(e, pointerType)
      } else if (isOverTarget) {
        triggerPressEnd(e, pointerType, false)
      }

      state.isPressed = false
      state.activePointerId = null
      state.isOverTarget = false
      state.ignoreEmulatedMouseEvents = true
      removeAllListeners()
    }

    pressProps.onTouchCancel = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      e.stopPropagation()
      if (state.isPressed) {
        cancel(e)
      }
    }

    pressProps.onDragStart = (e) => {
      if (!e.currentTarget.contains(e.target as HTMLElement)) {
        return
      }

      cancel(e)
    }
  }

  return pressProps
}

/**
 * Keyboard Event should be triggered by Space or Enter key only.
 * @param event
 * @returns
 */
function isValidKeyboardEvent(event: KeyboardEvent): boolean {
  const { key, target } = event
  const element = target as HTMLElement
  const { tagName, isContentEditable } = element
  const role = element.getAttribute("role")

  return (
    (key === "Enter" || key === " ") &&
    tagName !== "INPUT" &&
    tagName !== "TEXTAREA" &&
    isContentEditable !== true &&
    // A link with a valid href should be handled natively,
    // unless it also has role='button' and was triggered using Space.
    (!isHTMLAnchorLink(element) || (role === "button" && key !== "Enter")) &&
    // An element with role='link' should only trigger with Enter key
    !(role === "link" && key !== "Enter")
  )
}

function isHTMLAnchorLink(target: HTMLElement): boolean {
  return target.tagName === "A" && target.hasAttribute("href")
}

function getTouchFromEvent(event: TouchEvent): Touch | null {
  const { targetTouches } = event
  if (targetTouches.length > 0) {
    return targetTouches[0]
  }
  return null
}

function getTouchById(event: TouchEvent, pointerId: null | number): null | Touch {
  const { changedTouches } = event
  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i]
    if (touch.identifier === pointerId) {
      return touch
    }
  }
  return null
}

function createEvent(target: HTMLElement, e: EventBase): EventBase {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey,
  }
}

interface Rect {
  top: number
  right: number
  bottom: number
  left: number
}

interface EventPoint {
  clientX: number
  clientY: number
  width?: number
  height?: number
  radiusX?: number
  radiusY?: number
}

function getPointClientRect(point: EventPoint): Rect {
  const offsetX = point.width ? point.width / 2 : point.radiusX || 0
  const offsetY = point.height ? point.height / 2 : point.radiusY || 0

  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX,
  }
}

function areRectanglesOverlapping(a: Rect, b: Rect) {
  // check if they cannot overlap on x axis
  if (a.left > b.right || b.left > a.right) {
    return false
  }
  // check if they cannot overlap on y axis
  if (a.top > b.bottom || b.top > a.bottom) {
    return false
  }
  return true
}

function isOverElement(point: EventPoint, target: HTMLElement) {
  const rect = target.getBoundingClientRect()
  const pointRect = getPointClientRect(point)
  return areRectanglesOverlapping(rect, pointRect)
}
