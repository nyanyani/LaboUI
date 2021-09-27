export interface InputBase {
  /** Whether the input is disabled. */
  isDisabled?: boolean
  /** Whether the input can be selected but not changed by the user. */
  isReadonly?: boolean
}

export interface ValueBase<T, C = T> {
  /** The current value (controlled). */
  value?: T
  /** The default value (uncontrolled). */
  defaultValue?: T
  /** Handler that is called when the value changes. */
  onChange?: (value: C | null) => void
}
