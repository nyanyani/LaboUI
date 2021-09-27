import { useCallback } from "react"
import { useControlledState } from "../shared/state/useControlledState"
import { ValueBase, InputBase } from "@/typed/shared/inputs"

export interface RadioGroupStateProps extends ValueBase<string>, InputBase {
  name?: string
}

export interface RadioGroupState {
  readonly name: string
  /** Whether the radio components are in the radio group. */
  readonly isGroup: boolean
  /** Whether the radio group is disabled. */
  readonly isDisabled: boolean
  /** Whether the radio group is read only. */
  readonly isReadonly: boolean
  /** The currently selected value. */
  readonly selectedValue: string | null
  /** Sets the selected value. */
  setSelectedValue(value: string): void
}

function useRadioGroupState(props: RadioGroupStateProps): RadioGroupState {
  const { name = "", value, defaultValue, onChange, isDisabled = false, isReadonly = false } = props
  const [selectedValue, setSelectedValue] = useControlledState<string | null>(value, defaultValue, onChange)

  const setCurrSelectedValue = useCallback(
    (currValue: string) => {
      if (!isReadonly && !isDisabled) {
        setSelectedValue(currValue)
      }
    },
    [isDisabled, isReadonly, setSelectedValue]
  )

  return {
    name,
    isGroup: true,
    isDisabled,
    isReadonly,
    selectedValue,
    setSelectedValue: setCurrSelectedValue,
  }
}

export default useRadioGroupState
