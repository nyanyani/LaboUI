import clsx from "clsx"

export interface IUseFocusRing {
  (props: IUseFocusRingProps): {}
}

export interface IUseFocusRingProps {
  styles?: string | string[]
  isFocused?: boolean
  isFocusVisible?: boolean
  focusProps?: {}
}

export const useFocusRing: IUseFocusRing = (props) => {
  const { isFocused, styles, ...otherProps } = props
  const focusProps = { className: clsx(isFocused && styles), ...otherProps }

  return { focusProps, ...otherProps }
}
