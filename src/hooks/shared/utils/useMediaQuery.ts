import { useEffect, useMemo, useState } from "react"

const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function"

function useMediaQuery(query: string) {
  const matchQuery = useMemo(() => window.matchMedia(query), [query])
  const [matches, setMatches] = useState(() => supportMatchMedia && matchQuery.matches)

  useEffect(() => {
    if (!supportMatchMedia) {
      return
    }
    const onChange = (ev: MediaQueryListEvent) => setMatches(ev.matches)
    matchQuery.addEventListener("change", onChange)

    return () => {
      matchQuery.removeEventListener("change", onChange)
    }
  }, [matchQuery])

  return [matches, setMatches]
}

export default useMediaQuery
