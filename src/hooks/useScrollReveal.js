import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches IntersectionObserver to a ref
 * Adds 'visible' class when element enters viewport.
 * Use with .reveal CSS class.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add stagger to children if they have .reveal
          const children = el.querySelectorAll('.reveal')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100)
          })
          // Also add visible to the element itself if it has .reveal
          if (el.classList.contains('reveal')) {
            el.classList.add('visible')
          }
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
