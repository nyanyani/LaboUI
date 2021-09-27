import clsx from "clsx"
import React, { forwardRef } from "react"
import styles from "./CheckboxGroup.module.css"
import useCheckboxGroupState, { CheckboxGroupStateProps } from "@/hooks/CheckboxGroup/useCheckboxGroupState"
import CheckboxGroupContext from "./context"
import { Provider } from "@/hooks/shared/provider"
import useDOMRef from "@/hooks/shared/utils/useDOMRef"

export interface CheckBoxGroupProps extends CheckboxGroupStateProps {
  label?: React.ReactNode
  children: React.ReactNode
}

const CheckboxGroup = (props: CheckBoxGroupProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const { children, label } = props
  const state = useCheckboxGroupState(props)
  const groupDOMRef = useDOMRef(ref)
  const groupStyleProps = clsx(styles["checkbox-group"])
  const labelStyleProps = clsx(styles["checkbox-group__label"])

  return (
    <Provider ref={groupDOMRef} className={groupStyleProps}>
      {label ? <span className={labelStyleProps}>{label}</span> : null}
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </Provider>
  )
}

export default forwardRef(CheckboxGroup)
