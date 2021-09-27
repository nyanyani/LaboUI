import { useMemo } from "react"
import { useControlledState } from "../shared/state/useControlledState"
import { ValueBase, InputBase } from "@/typed/shared/inputs"

export interface CheckboxGroupStateProps extends ValueBase<string[]>, InputBase {}

export interface CheckboxGroupState {
  /** Current selected values. */
  value: readonly string[]
  /** Whether the checkbox group is disabled. */
  isDisabled: boolean
  /** Whether the checkbox group is read only. */
  isReadonly: boolean
  isGroup: boolean

  /** Returns whether the given value is selected. */
  isSelected(value: string): boolean
  /** Sets the selected values. */
  setValue(value: string[]): void
  /** Adds a value to the set of selected values. */
  addValue(value: string): void
  /** Removes a value from the set of selected values. */
  removeValue(value: string): void
  /** Toggles a value in the set of selected values. */
  toggleValue(value: string): void
}

function useCheckboxGroupState(props: CheckboxGroupStateProps): CheckboxGroupState {
  const { isReadonly, isDisabled, value, defaultValue, onChange } = props
  const [selectedValues, setSelectedValues] = useControlledState(value, defaultValue || [], onChange)

  const state: CheckboxGroupState = useMemo(
    () => ({
      value: selectedValues,
      isDisabled: !!isDisabled,
      isReadonly: !!isReadonly,
      isGroup: true,
      setValue(currValue) {
        if (isReadonly || isDisabled) {
          return
        }

        setSelectedValues(currValue)
      },
      isSelected(currValue) {
        return selectedValues.includes(currValue)
      },
      addValue(currValue) {
        if (isReadonly || isDisabled) {
          return
        }
        setSelectedValues((prevValues) => {
          if (!prevValues.includes(currValue)) {
            return prevValues.concat(currValue)
          }
          return prevValues
        })
      },
      removeValue(currValue) {
        if (isReadonly || isDisabled) {
          return
        }
        setSelectedValues((prevValues) => {
          if (prevValues.includes(currValue)) {
            return prevValues.filter((existingValue) => existingValue !== currValue)
          }
          return prevValues
        })
      },
      toggleValue(currValue) {
        if (isReadonly || isDisabled) {
          return
        }
        setSelectedValues((prevValues) => {
          if (prevValues.includes(currValue)) {
            return prevValues.filter((existingValue) => existingValue !== currValue)
          }
          return prevValues.concat(currValue)
        })
      },
    }),
    [isDisabled, isReadonly, selectedValues, setSelectedValues]
  )

  return state
}

export default useCheckboxGroupState
