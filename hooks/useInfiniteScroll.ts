import { useEffect } from 'react'

export function useInfiniteScroll<T extends Element | null>(
  ref: React.RefObject<T>,
  onIntersect: () => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect()
      },
      { threshold: 1.0 },
    )
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref, onIntersect, enabled])
}
