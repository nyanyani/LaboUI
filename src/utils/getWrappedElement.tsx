import React, { ReactElement, ReactNode } from "react"

export function getWrappedElement(children: string | ReactElement | ReactNode): ReactElement {
  if (typeof children !== "string") {
    return React.Children.only(children) as ReactElement
  }
  return <span>{children}</span>
}
