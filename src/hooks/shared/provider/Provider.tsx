import React, { createContext, DOMElement, forwardRef, useContext, useMemo } from "react"
import { mergeProps } from "@/utils"
import { ColorScheme, Theme } from "@/hooks/Theme/Theme"

export interface ContextProps {
  /** Whether descendants should be displayed with the quiet style. */
  isQuiet?: boolean
  /** Whether descendants should be displayed with the emphasized style. */
  isEmphasized?: boolean
  /** Whether descendants should be disabled. */
  isDisabled?: boolean
  /** Whether descendants should be displayed with the required style. */
  isRequired?: boolean
  /** Whether descendants should be read only. */
  isReadonly?: boolean
  /** Whether descendants should be displayed with the validation state style. */
  validationState?: "valid" | "invalid"
}

export interface ProviderContext extends ContextProps {
  theme?: Theme
  colorScheme?: string
  scale?: string
}

export interface ProviderProps extends ContextProps {
  theme?: Theme
  colorScheme?: ColorScheme
  className?: string
  children: React.ReactNode
}

const Context = createContext<ProviderContext>({})

/** Global provider which merges (not overrides with undefined) upper Provider's theme, color scheme and etc settings */
const Provider = (props: ProviderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    theme,
    colorScheme,
    children,
    className,
    isQuiet,
    isEmphasized,
    isDisabled,
    isRequired,
    isReadonly,
    validationState,
    ...otherProps
  } = props

  const prevContext = useProviderContext()
  const context = useMemo(
    () =>
      mergeProps(prevContext, {
        theme,
        isQuiet,
        isEmphasized,
        isDisabled,
        isRequired,
        isReadonly,
        validationState,
      }),
    [isDisabled, isEmphasized, isQuiet, isReadonly, isRequired, prevContext, theme, validationState]
  )

  return (
    <Context.Provider value={context}>
      <div ref={ref} className={className} {...otherProps}>
        {children}
      </div>
    </Context.Provider>
  )
}

export default forwardRef(Provider)

export function useProviderContext() {
  return useContext(Context)
}

export function useProviderProps<T>(props: T): T {
  const context = useProviderContext()
  const mergedContext = { ...context }

  if (!context) {
    return props
  }

  return mergedContext as T
}
