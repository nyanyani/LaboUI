import clsx from "clsx"
import chainFn from "./chainFn"

export interface Props {
  [key: string]: any
}

type TupleTypes<T> = { [K in keyof T]: T[K] } extends { [key: number]: infer P } ? P : never
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

const isEventHandlerReg = /^on[A-Z]/
/**
 *
 * @param props - merge non-undefined props
 */
export default function mergeProps<T extends Props[]>(...props: T): UnionToIntersection<TupleTypes<T>> {
  const { length } = props
  const merged = { ...props[0] }

  for (let i = 1; i < length; i++) {
    const sourceProp = props[i]
    for (const key in sourceProp) {
      if (Object.prototype.hasOwnProperty.call(sourceProp, key)) {
        const mergedValue = merged[key]
        const sourceValue = sourceProp[key]

        if (typeof mergeProps === "function" && isEventHandlerReg.test(key)) {
          merged[key] = chainFn(mergedValue, sourceValue)
        } else if (key === "className") {
          merged[key] = clsx(mergedValue, sourceValue)
        } else if (sourceValue) {
          merged[key] = sourceValue
        }
      }
    }
  }

  return merged as UnionToIntersection<TupleTypes<T>>
}
