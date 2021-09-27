import { useCallback, useLayoutEffect, useMemo, useState } from "react"
import { useRadioGroupContext } from "@/components/RadioGroup/context"

export interface UseRadioProps {
  isDisabled?: boolean
  isReadonly?: boolean
  value?: string
  onChange?(checked: boolean): void
}
export interface CheckboxInputProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

const useRadio = (props: UseRadioProps, inputRef: React.RefObject<HTMLInputElement>, propagate = false) => {
  const { value, onChange } = props
  const state = useRadioGroupContext()
  const { setSelectedValue, selectedValue, isGroup } = state

  /** cannot set individual ratios to be readonly */
  const isReadonly = isGroup && (props.isReadonly || state.isReadonly)
  const isDisabled = props.isDisabled || state.isDisabled
  const [checked, setChecked] = useState(isGroup ? value === selectedValue : !!inputRef.current?.checked)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked
      if (isDisabled || isReadonly) {
        return
      }
      if (!propagate) {
        e.stopPropagation()
      }
      if (typeof onChange === "function") {
        onChange(isChecked)
      }
      if (isGroup) {
        if (isChecked && typeof value !== "undefined") {
          setSelectedValue(value)
        }
      } else {
        setChecked(isChecked)
      }
    },
    [isDisabled, isGroup, isReadonly, onChange, propagate, setSelectedValue, value]
  )

  useLayoutEffect(() => {
    if (isGroup) {
      setChecked(value === selectedValue)
    }
  }, [isGroup, selectedValue, value])

  const inputProps = useMemo(
    () => ({
      disabled: isDisabled,
      onChange: handleChange,
      checked,
    }),
    [checked, handleChange, isDisabled]
  )

  return { inputProps, state }
}

export default useRadio
