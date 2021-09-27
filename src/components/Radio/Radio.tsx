import clsx from "clsx"
import React, { useRef } from "react"
import { useRadio } from "@/hooks/Radio"

import { Icon } from "../Icon"
import styles from "./Radio.module.css"
import radiomark from "@/assets/icons/radiomark.svg"

export interface RadioProps {
  isDisabled?: boolean
  isReadonly?: boolean
  value?: string
  onChange?(checked: boolean): void
  label?: string
  children?: React.ReactNode
}

const Radio = (props: RadioProps) => {
  const { children, label } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const { inputProps } = useRadio(props, inputRef)
  const { checked, disabled } = inputProps

  const radioStyleProps = clsx(styles.radio)
  const boxStyleProps = clsx(
    styles.radio__box,
    checked && styles["radio__box--checked"],
    disabled && styles["radio__box-disabled"]
  )
  const svgStyleProps = clsx(styles.radio__svg)

  return (
    <label className={radioStyleProps}>
      <input type="radio" {...inputProps} hidden ref={inputRef} />
      <Icon iconSrc={radiomark.url} label={label} className={boxStyleProps} svgStyleProps={svgStyleProps} />
      {children}
    </label>
  )
}

export default Radio
