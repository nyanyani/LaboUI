import clsx from "clsx"
import React, { HTMLProps, useMemo } from "react"
import styles from "./Layout.module.css"

export interface LayoutProps extends HTMLProps<HTMLDivElement> {}
function Layout(props: LayoutProps) {
  const { children } = props
  const className = useMemo(
    () =>
      clsx({
        [styles.layout]: true,
      }),
    []
  )
  return (
    <div className={className}>
      {children}
      test
    </div>
  )
}

export default Layout
