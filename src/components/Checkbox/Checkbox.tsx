import clsx from "clsx"
import React, { memo, useRef } from "react"
import { useCheckbox } from "@/hooks"

import Icon from "../Icon/Icon"
import styles from "./Checkbox.module.css"

import checkmark from "@/assets/icons/checkmark.svg"

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  isDisabled?: boolean
  checked?: boolean
  value?: string
  onChange?(): any
  children?: React.ReactNode
}

const Checkbox = (props: CheckboxProps): React.ReactElement => {
  const { label, isDisabled, children } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const { inputProps } = useCheckbox(props, inputRef)
  const { checked } = inputProps

  const checkStyleProps = clsx(styles.checkbox)
  const boxStyleProps = clsx(
    styles.checkbox__box,
    checked && styles["checkbox__box--checked"],
    isDisabled && styles["checkbox_box--disabled"]
  )
  const svgStyleProps = clsx(styles.checkbox__svg)
  const labelStyleProps = clsx(styles.checkbox__label)

  return (
    <label className={checkStyleProps}>
      <input type="checkbox" hidden {...inputProps} ref={inputRef} />
      <Icon
        iconSrc={checkmark.url}
        label={label}
        iconStyleProps={boxStyleProps}
        svgStyleProps={svgStyleProps}
        labelStyleProps={labelStyleProps}
      />
      {children}
    </label>
  )
}

export default memo(Checkbox)
