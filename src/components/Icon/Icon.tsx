import React, { memo } from "react"
import clsx from "clsx"

import styles from "./Icon.module.css"
// import "@/utils/getSVGIcons"

export interface IconProps {
  children?: React.ReactElement
  color?: string
  size?: string
  label?: string
  hidden?: boolean
  iconSrc?: string
  selectors?: string | string[]
  className?: string
  iconStyleProps?: string
  labelStyleProps?: string
  svgStyleProps?: string
}

const Icon = (props: IconProps): React.ReactElement => {
  const {
    color,
    iconSrc,
    label,
    size,
    hidden,
    selectors,
    children,
    className,
    iconStyleProps: iconStyle,
    svgStyleProps: svgStyle,
    labelStyleProps: labelStyle,
    ...other
  } = props

  const iconStyleProps = clsx(
    styles.icon,
    size && styles[`icon--${size}`],
    hidden && styles[`icon--${hidden}`],
    color && styles[`icon--color--${color}`],
    iconStyle,
    className
  )
  const svgStyleProps = clsx(
    styles.icon__svg,
    selectors && ([] as string[]).concat(selectors).map((selector) => styles[`icon__${selector}`]),
    svgStyle
  )
  const labelStyleProps = clsx(styles.icon__label, labelStyle)

  return (
    <div className={iconStyleProps} {...other}>
      <svg className={svgStyleProps}>
        <use xlinkHref={iconSrc} />
      </svg>
      {label ? <span className={labelStyleProps}>{label}</span> : null}
    </div>
  )
}

export default memo(Icon)

export interface IPresetProps {
  direction?: "up" | "right" | "down" | "up"
  size?: "sm" | "md" | "lg"
}
export const loadingPreset = () => ({ src: "loading", svg: "spinner--loading" })
export const arrowPreset = (options: IPresetProps) => {
  const { direction, size } = options

  return {
    src: "arrow",
    svg: direction ? `arrow--${direction}` : "arrow",
    size,
  }
}
