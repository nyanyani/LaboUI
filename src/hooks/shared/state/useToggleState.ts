import { useCallback, useMemo } from "react"
import { useControlledState } from "./useControlledState"

/**
 * Provides state management for toggle components like checkboxes and switches.
 */
export interface UseToggleStateProps {
  defaultSelected?: boolean
  value?: string
  name?: string
  isSelected?: boolean
  isReadonly?: boolean
  onChange?(isSelected: boolean): void
}

export interface ToggleState {
  readonly isSelected: boolean
  setSelected(isSelected: boolean): void
  toggle(): void
}

export default function useToggleState(props: UseToggleStateProps): ToggleState {
  const { isReadonly, onChange } = props
  const [isSelected, setSelected] = useControlledState(
    props.isSelected,
    props.defaultSelected || false
    /* , () => {} | undefined
     ** do not pass "onChange" from props as a param,
     ** it will be invoked when component was on controlled.  */
  )
  const updateSelected = useCallback(
    (selectState) => {
      if (isReadonly) {
        return
      }
      setSelected(selectState)
      if (typeof onChange === "function") {
        onChange(selectState)
      }
    },
    [isReadonly, onChange, setSelected]
  )

  const toggleState = useCallback(() => {
    if (!isReadonly) {
      setSelected((prevState) => {
        const newState = !prevState
        if (typeof onChange === "function") {
          onChange(newState)
        }
        return newState
      })
    }
  }, [isReadonly, onChange, setSelected])

  return useMemo(
    () => ({
      isSelected,
      setSelected: updateSelected,
      toggle: toggleState,
    }),
    [isSelected, toggleState, updateSelected]
  )
}
