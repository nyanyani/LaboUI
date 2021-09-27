import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  RefObject,
  useMemo,
} from "react"
import { mergeProps } from "@/utils"
import { PressHandlers, usePress } from "../shared/interactions/usePress"

export interface ButtonProps<T extends ElementType = "button"> extends PressHandlers, LinkButtonProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean
  /** The content to display in the button. */
  children?: React.ReactNode
  type?: "button" | "submit" | "reset"
  onClick?(e: MouseEvent): void
  elementType?: T | React.JSXElementConstructor<any>
  preventFocusOnPress?: boolean
}

export interface LinkButtonProps {
  /** A URL to link to if elementType is "a". */
  href?: string
  /** The target window for the link. */
  target?: string
  /** The relationship between the linked resource and the current page.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string
}

export interface ButtonState<T> {
  /** Props for the button element. */
  buttonProps: T
  /** Whether the button is currently pressed. */
  isPressed: boolean
  elementType?: T | React.JSXElementConstructor<any>
}

export function useButton(
  props: ButtonProps<"a">,
  ref: RefObject<HTMLAnchorElement>
): ButtonState<AnchorHTMLAttributes<HTMLAnchorElement>>
export function useButton(
  props: ButtonProps<"button">,
  ref: RefObject<HTMLButtonElement>
): ButtonState<ButtonHTMLAttributes<HTMLButtonElement>>
export function useButton(
  props: ButtonProps<"div">,
  ref: RefObject<HTMLDivElement>
): ButtonState<HTMLAttributes<HTMLDivElement>>
export function useButton(
  props: ButtonProps<"input">,
  ref: RefObject<HTMLInputElement>
): ButtonState<InputHTMLAttributes<HTMLInputElement>>
export function useButton(
  props: ButtonProps<"span">,
  ref: RefObject<HTMLSpanElement>
): ButtonState<HTMLAttributes<HTMLSpanElement>>
export function useButton(
  props: ButtonProps<ElementType>,
  ref: RefObject<HTMLElement>
): ButtonState<HTMLAttributes<HTMLElement>>

/**
 * Provides the behavior and accessibility implementation for a button component.
 * Handles mouse, keyboard, and touch interactions,
 * focus behavior for both native button elements and custom element types.
 * @param props - Props to be applied to the button.
 * @param ref - A ref to a DOM element for the button.
 */
export function useButton(props: ButtonProps<ElementType>, ref: RefObject<any>): ButtonState<HTMLAttributes<any>> {
  const {
    elementType = "button",
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onClick: deprecatedOnClick,
    preventFocusOnPress,
    href,
    target,
    rel,
    type = "button",
  } = props

  const { isPressed, pressProps } = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    isDisabled,
    preventFocusOnPress,
    ref,
  })

  const buttonProps = useMemo(() => {
    const additionalProps =
      elementType === "button"
        ? {
            type,
            disabled: isDisabled,
          }
        : {
            role: "button",
            tabIndex: isDisabled ? undefined : 0,
            href: elementType === "a" && isDisabled ? undefined : href,
            target: elementType === "a" ? target : undefined,
            type: elementType === "input" ? type : undefined,
            disabled: elementType === "input" ? isDisabled : undefined,
            rel: elementType === "a" ? rel : undefined,
          }
    return mergeProps(additionalProps, pressProps, {
      onClick: (e: MouseEvent) => {
        if (typeof deprecatedOnClick === "function") {
          deprecatedOnClick(e)
        }
      },
    })
  }, [deprecatedOnClick, elementType, href, isDisabled, pressProps, rel, target, type])

  return {
    isPressed,
    buttonProps,
  }
}
