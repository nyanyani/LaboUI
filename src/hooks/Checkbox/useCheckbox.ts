import { useMemo } from "react"
import { useCheckboxGroupContext } from "@/components/CheckboxGroup/context"
import { UseToggleStateProps, useToggleState } from ".."
import { useToggle } from "../shared/toggle"

export interface UseCheckboxProps extends UseToggleStateProps {
  isDisabled?: boolean
}
export interface CheckboxInputProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export default function useCheckbox(
  props: UseCheckboxProps,
  inputRef: React.RefObject<HTMLInputElement>
): CheckboxInputProps {
  const { value, onChange } = props
  const state = useCheckboxGroupContext()

  const isReadonly = props.isReadonly || state.isReadonly
  const isDisabled = props.isDisabled || state.isDisabled
  const isSelected = typeof value === "undefined" ? !isDisabled && !!props.isSelected : state.isSelected(value)
  const stateProps = useMemo(() => {
    if (state.isGroup) {
      return {
        isReadonly,
        isSelected,
        onChange(currSelected: boolean) {
          if (typeof value !== "undefined") {
            if (currSelected) {
              state.addValue(value)
            } else {
              state.removeValue(value)
            }
          }

          if (typeof onChange === "function") {
            onChange(currSelected)
          }
        },
      }
    }
    return {
      isSelected: state.isGroup ? isSelected : undefined,
      isReadonly,
      onChange,
    }
  }, [isReadonly, isSelected, onChange, state, value])

  const toggleState = useToggleState(stateProps)
  const { inputProps } = useToggle({ ...props, isReadonly, isDisabled }, toggleState)

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
