'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Globe, Menu, X } from 'lucide-react'
import { nav } from '@/content/site'
import { siteAr } from '@/content/i18n'
import { Logo } from './ui'
import { useLang } from './LanguageProvider'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAr, toggleLang } = useLang()

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const labelFor = (href: string, fallback: string) => (isAr ? (siteAr.nav[href] ?? fallback) : fallback)

  return (
    <header
      className={`sticky top-0 z-50 h-[76px] transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-white shadow-[0_1px_0_#e3eaf3]' : 'bg-white shadow-[0_1px_0_#eef2f7]'
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={isAr ? siteAr.header.homeLabel : 'SEEH home'} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={isAr ? 'القائمة الرئيسية' : 'Main'}>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                isActive(n.href) ? 'text-ink underline decoration-orange-500 decoration-2 underline-offset-[10px]' : 'text-body hover:text-ink'
              }`}
            >
              {labelFor(n.href, n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[14px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <Globe size={16} aria-hidden />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>
          <Link href="/contact" className="btn btn-primary hidden !h-11 !px-5 !text-[15px] sm:inline-flex">
            {isAr ? siteAr.header.contact : 'Contact us'}
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink lg:hidden"
            aria-label={open ? (isAr ? siteAr.header.closeMenu : 'Close menu') : (isAr ? siteAr.header.openMenu : 'Open menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-white lg:hidden">
        <nav className="wrap flex flex-col py-6" aria-label={isAr ? 'قائمة الجوال' : 'Mobile'}>
          {[{ href: '/', label: 'Home' }, ...nav].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center justify-between border-b border-line py-4 text-lg font-semibold ${
                (n.href === '/' ? pathname === '/' : isActive(n.href)) ? 'text-brand' : 'text-ink'
              }`}
            >
              {labelFor(n.href, n.label)}
              <ArrowRight size={18} className="rtl-flip text-slate-400" aria-hidden />
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary mt-8">
            {isAr ? siteAr.header.contact : 'Contact us'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
