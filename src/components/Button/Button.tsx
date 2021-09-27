import React, { forwardRef, memo, useMemo, RefObject, useState } from "react"
import clsx from "clsx"

import styles from "./Button.module.css"
import { Icon, loadingPreset } from "../Icon"
import { useButton } from "@/hooks/Button/useButton"

export type ButtonProps<T extends keyof JSX.IntrinsicElements> = {
  className?: string
  color?: string
  label?: string | number
  loading?: boolean
  primary?: boolean
  size?: "xm" | "sm" | "md" | "lg"
  href?: string
  component?: string
  handlePress?: () => any
} & JSX.IntrinsicElements[T] &
  ReturnType<typeof useButton>

const Button = forwardRef<HTMLElement, ButtonProps<any>>((props: ButtonProps<any>, ref) => {
  const {
    color,
    children,
    className,
    size,
    label = "Button",
    loading = false,
    primary,
    href,
    component = "button",
    handlePress,
    ...other
  } = props
  const ComponentTag = component || (href && "a") || "button"

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { buttonProps } = useButton(
    {
      ...props,
      elementType: ComponentTag,
      onPress: loading
        ? (...args) => {
            if (handlePress) {
              handlePress(...args)
            }
            setIsLoading((prev) => !prev)
          }
        : handlePress,
    },
    ref as RefObject<HTMLElement>
  )
  const buttonStyle = useMemo(
    () =>
      clsx(
        styles.btn,
        styles["btn--center"],
        size && styles[size],
        primary ? styles["btn--primary"] : styles["btn--secondary"],
        ComponentTag === "a" && styles.btn__link,
        size && styles[`btn--${size}`]
      ),
    [ComponentTag, primary, size]
  )

  const Label = isLoading ? <Icon {...loadingPreset()} label="Loading..." /> : <span>{label}</span>

  return (
    <ComponentTag className={buttonStyle} ref={ref} {...buttonProps} {...other}>
      {ComponentTag === "input" ? null : children || Label}
    </ComponentTag>
  )
})
Button.displayName = "Button"
// @ts-ignore
Button.whyDidYourRerender = true

export default memo(Button)

export interface ButtonGroupProps {
  children?: React.ReactNode
}

export const ButtonGroup = (props: ButtonGroupProps): React.ReactElement => {
  const { children } = props
  const groupStyles = clsx(styles.btn__group)
  return <div className={groupStyles}>{children}</div>
}
