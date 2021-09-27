import { useImperativeHandle, useRef } from "react"

export interface DOMRefHandler<T> {
  getDOMNode(): React.RefObject<T>
}

function useDOMRef<T extends HTMLElement = HTMLElement>(ref: React.Ref<T>): React.RefObject<T> {
  const domRef = useRef(null)
  useImperativeHandle(
    ref,
    (): any => ({
      getDOMNode() {
        return domRef.current
      },
    }),
    []
  )

  return domRef
}

export default useDOMRef
