import { HTMLAttributes } from "react"

export interface FilterProps<T> {
  [k: string]: HTMLAttributes<T>
}
export type Filter<P> = (props: P) => P

export default function filterProps<T extends FilterProps<HTMLElement>>(props: T): Filter<T> {
  const filtered = {} as T
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key]
      if (value) {
        filtered[key] = value
      }
    }
  }

  return filtered
}
