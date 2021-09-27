import { useCallback, useMemo } from "react"
import { ToggleState, UseToggleStateProps } from "@/hooks"
import { usePress } from "../interactions/usePress"

export interface UseToggle {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export interface UseToggleProps extends UseToggleStateProps {
  isDisabled?: boolean
}

export default function useToggle(props: UseToggleProps, state: ToggleState, propagate?: boolean): UseToggle {
  const { isDisabled = false, value, name } = props
  const { setSelected } = state
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!propagate) {
        e.stopPropagation()
      }
      setSelected(e.target.checked)
    },
    [propagate, setSelected]
  )

  const { pressProps } = usePress({ isDisabled })
  const inputProps = useMemo(
    () => ({
      disabled: isDisabled,
      onChange,
      value,
      name,
      ...pressProps,
    }),
    [isDisabled, name, onChange, pressProps, value]
  )

  return { inputProps }
}
