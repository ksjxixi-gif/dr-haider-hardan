'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav } from '@/content/site'
import { Logo } from './ui'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-b rule-soft bg-ink/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-20 items-center justify-between md:h-24">
        <Link href="/" className="flex items-center gap-3.5" aria-label="SEEH home">
          <Logo />
          <span className="text-[14px] font-medium tracking-[0.42em]">SEEH</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`text-[13px] tracking-[0.08em] transition-colors hover:text-ivory ${isActive(n.href) ? 'text-gold' : 'text-muted'}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="hidden border-b border-gold pb-1 text-[13px] tracking-[0.08em] text-gold transition-colors hover:text-gold-2 sm:inline"
          >
            Contact
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-px w-6 bg-ivory transition-transform duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-ivory transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t rule-soft bg-ink lg:hidden"
      >
        <nav className="wrap flex flex-col py-10" aria-label="Mobile">
          {[...nav, { href: '/contact', label: 'Contact' }].map((n, i) => (
            <Link key={n.href} href={n.href} className="flex items-baseline gap-5 border-b rule-soft py-5">
              <span className="num text-sm">0{i + 1}</span>
              <span className={`font-serif text-4xl font-light ${isActive(n.href) ? 'text-gold-2' : ''}`}>{n.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
