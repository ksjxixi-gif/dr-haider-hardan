'use client'

import { useEffect, useRef, type ReactNode, type ElementType } from 'react'

/** Fades children in once when scrolled into view. Content stays visible without JS. */
export function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }: { children: ReactNode; className?: string; as?: ElementType; delay?: number }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
