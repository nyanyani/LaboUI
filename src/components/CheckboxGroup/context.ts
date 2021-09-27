import { createContext, useContext } from "react"
import { CheckboxGroupState } from "@/hooks/CheckboxGroup/useCheckboxGroupState"

const defaultState = {
  value: [],
  isDisabled: false,
  isReadonly: false,
  isGroup: false,
  isSelected() {
    return false
  },
  setValue() {},
  addValue() {},
  removeValue() {},
  toggleValue() {},
}
const CheckboxGroupContext = createContext<CheckboxGroupState>(defaultState)

export function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext)
}
export default CheckboxGroupContext
