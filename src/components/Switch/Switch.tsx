import React, { useRef } from "react"
import clsx from "clsx"

import styles from "./Switch.module.css"
import { ValueBase, InputBase } from "@/typed/shared/inputs"
import { useSwitch } from "@/hooks/Switch"

export interface SwitchProps extends ValueBase<string, boolean>, InputBase {
  size?: string
  label?: string
}
const sizeMap = new Map([
  ["small", "sm"],
  ["medium", "md"],
  ["large", "lg"],
])
const Switch = (props: SwitchProps): React.ReactElement => {
  const { label, isReadonly, size } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const { inputProps } = useSwitch(props, inputRef)
  const { checked, disabled } = inputProps

  const switchStyleProps = clsx(
    styles.switch,
    disabled && styles["switch--disabled"],
    isReadonly && styles["switch--readonly"],
    size && styles[`switch--${sizeMap.get(size)}`]
  )
  const boxStyleProps = clsx(
    styles.switch__box,
    checked && styles["switch__box--checked"],
    isReadonly && styles["switch__box--isReadonly"]
  )
  const sliderStyleProps = clsx(styles.switch__slider, checked && styles["switch__slider--checked"])
  const labelStyleProps = clsx(styles.switch__label, checked && styles["switch__label--checked"])

  return (
    <label className={switchStyleProps}>
      <input type="checkbox" hidden ref={inputRef} {...inputProps} />
      <div className={boxStyleProps}>
        <span className={sliderStyleProps} />
      </div>
      <span className={labelStyleProps}>{label}</span>
    </label>
  )
}
export default Switch
