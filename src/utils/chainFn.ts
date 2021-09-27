export default function chainFn(...callbacks: Function[]): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args)
      }
    }
  }
}
