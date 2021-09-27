import clsx from "clsx"
import React, { memo } from "react"
import useRadioGroupState, { RadioGroupStateProps } from "@/hooks/RadioGroup/useRadioGroupState"
import RadioGroupContext from "./context"
import styles from "./RadioGroup.module.css"

export interface RadioGroupProps extends RadioGroupStateProps {
  children?: React.ReactNode
}

const RadioGroup = (props: RadioGroupProps): React.ReactElement => {
  const { children } = props
  const radioGroupStyleProps = clsx(styles.radio)
  const state = useRadioGroupState(props)

  return (
    <div className={radioGroupStyleProps}>
      <RadioGroupContext.Provider value={state}>{children}</RadioGroupContext.Provider>
    </div>
  )
}
RadioGroup.displayName = "RadioGroup"

export default memo(RadioGroup)
