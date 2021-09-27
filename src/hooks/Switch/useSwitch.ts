import { useMemo } from "react"
import { UseToggleStateProps, useToggleState } from ".."
import { useToggle } from "../shared/toggle"

export interface SwitchProps extends UseToggleStateProps {
  isDisabled?: boolean
}
export interface CheckboxInputProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export default function useSwitch(props: SwitchProps, inputRef: React.RefObject<HTMLInputElement>): CheckboxInputProps {
  const toggleState = useToggleState(props)
  const { inputProps } = useToggle(props, toggleState)

  return useMemo(
    () => ({
      inputProps: {
        ...inputProps,
        checked: toggleState.isSelected,
      },
      state: toggleState,
    }),
    [inputProps, toggleState]
  )
}
