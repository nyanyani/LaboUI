import { createContext, useContext } from "react"

export interface RadioGroupContextState {
  readonly isDisabled: boolean
  readonly isReadonly: boolean
  readonly isGroup: boolean
  selectedValue: string | null
  setSelectedValue(value: string): void
}

const defaultState: RadioGroupContextState = {
  isDisabled: false,
  isReadonly: false,
  isGroup: false,
  selectedValue: null,
  setSelectedValue: () => {},
}
const RadioGroupContext = createContext<RadioGroupContextState>(defaultState)

export function useRadioGroupContext() {
  return useContext(RadioGroupContext)
}
export default RadioGroupContext
