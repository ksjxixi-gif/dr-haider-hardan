'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { nav } from '@/content/site'
import { Logo } from './ui'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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

  // Every page starts with a dark photo hero, so the bar is transparent/white-text until scrolled.
  const solid = scrolled || open
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`sticky top-0 z-50 h-[76px] transition-[background-color,box-shadow] duration-300 ${
        solid ? 'bg-white/95 shadow-[0_1px_0_#e3eaf3,0_8px_30px_-12px_rgba(11,27,58,0.15)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="SEEH home" className="shrink-0">
          <Logo light={!solid} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                solid
                  ? isActive(n.href)
                    ? 'bg-blue-50 text-brand'
                    : 'text-ink hover:bg-soft hover:text-brand'
                  : isActive(n.href)
                    ? 'bg-white/15 text-white'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden !h-11 !px-5 !text-[15px] sm:inline-flex">
            Contact us
          </Link>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${solid ? 'bg-soft text-ink' : 'bg-white/15 text-white'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-white lg:hidden">
        <nav className="wrap flex flex-col py-6" aria-label="Mobile">
          {[{ href: '/', label: 'Home' }, ...nav].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center justify-between border-b border-line py-4 text-lg font-semibold ${
                (n.href === '/' ? pathname === '/' : isActive(n.href)) ? 'text-brand' : 'text-ink'
              }`}
            >
              {n.label}
              <ArrowRight size={18} className="text-slate-400" aria-hidden />
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary mt-8">
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  )
}
