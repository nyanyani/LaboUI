import { useCallback, useRef, useState } from "react"
/**
 *
 * @param value Controlled value.
 * @param defaultValue  Uncontrolled defaultValue which only applied when param "value" were equal to undefined.
 * @param onChange Optional callback function which invoked when state is controlled.
 * @returns [state, setState]
 */
export function useControlledState<T>(
  value?: T,
  defaultValue?: T,
  onChange?: (value: T) => void
): [T, (value: T | ((prevState: T) => T)) => void] {
  const isControlled = typeof value !== "undefined"
  const [stateValue, setStateValue] = useState<T>((isControlled ? value : defaultValue) as T)

  /** Use mutable ref object to store previous uncontrolled value. */
  const controlledValueRef = useRef(stateValue)

  const setCurrStateValue = useCallback(
    (currValue) => {
      /** handle the passed function argument */
      if (typeof currValue === "function") {
        setStateValue((prevValue) => {
          const updatedValue = currValue(isControlled ? controlledValueRef.current : prevValue)
          updateControlledValue(controlledValueRef, updatedValue, isControlled, onChange)
          if (!isControlled) {
            return updatedValue
          }
          return prevValue
        })
      } else {
        if (!isControlled) {
          setStateValue(currValue)
        }
        updateControlledValue(controlledValueRef, currValue, isControlled, onChange)
      }
    },
    [isControlled, onChange]
  )

  if (!isControlled) {
    return [stateValue, setCurrStateValue]
  }
  controlledValueRef.current = value
  return [value, setCurrStateValue]
}

function updateControlledValue<T>(
  controlledValueRef: React.MutableRefObject<T>,
  currValue: T,
  isControlled: boolean,
  handler?: (value: T) => void
) {
  if (typeof handler === "function" && !Object.is(controlledValueRef.current, currValue)) {
    handler(currValue)
  }

  if (!isControlled) {
    controlledValueRef.current = currValue
  }
}
