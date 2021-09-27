import clsx from "clsx"
import React, { ReactElement } from "react"
import { useFocusRing } from "./useFocusRing"

interface FocusRingProps {
  /** Child element to apply CSS classes to. */
  children: ReactElement
  /** CSS class to apply when the element is focused. */
  focusClass?: string
  /** CSS class to apply when the element has keyboard focus. */
  focusRingClass?: string
  /**
   * Whether to show the focus ring when something
   * inside the container element has focus (true), or
   * only if the container itself has focus (false).
   * @default false
   */
  within?: boolean
  /** Whether the element is a text input. */
  isTextInput?: boolean
  /** Whether the element will be auto focused. */
  autoFocus?: boolean
}

/**
 * A utility component that applies a CSS class when an element has keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
export function FocusRing(props: FocusRingProps) {
  const { children, focusClass, focusRingClass } = props
  const { isFocused, isFocusVisible, focusProps } = useFocusRing(props)
  const child = React.Children.only(children)

  return React.cloneElement(
    child,
    mergeProps(child.props, {
      ...focusProps,
      className: clsx({
        [focusClass || ""]: isFocused,
        [focusRingClass || ""]: isFocusVisible,
      }),
    })
  )
}
