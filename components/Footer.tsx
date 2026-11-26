'use client'

import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { nav, site } from '@/content/site'
import { siteAr } from '@/content/i18n'
import { Logo } from './ui'
import { SocialButtons } from './icons'
import { useLang } from './LanguageProvider'

export function Footer() {
  const { isAr } = useLang()
  const f = siteAr.footer

  return (
    <footer className="border-t border-line bg-white text-ink">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label={isAr ? siteAr.header.homeLabel : 'SEEH home'}>
            <Logo />
          </Link>
          <p className="mt-6 max-w-xs text-[15px] leading-7 text-body">
            {isAr ? f.blurb : 'Turning ideas into sustainable real-world solutions across clean energy, AI and health.'}
          </p>
          <div className="mt-6">
            <SocialButtons />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">{isAr ? f.explore : 'Explore'}</p>
          <ul className="mt-5 space-y-3 text-[15px] text-body">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-ink">
                  {isAr ? (siteAr.nav[n.href] ?? n.label) : n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">{isAr ? f.workWithUs : 'Work with us'}</p>
          <ul className="mt-5 space-y-3 text-[15px] text-body">
            <li><Link href="/investment" className="hover:text-ink">{isAr ? f.investmentOpps : 'Investment opportunities'}</Link></li>
            <li><Link href="/partnerships" className="hover:text-ink">{isAr ? f.strategicPartnerships : 'Strategic partnerships'}</Link></li>
            <li><Link href="/contact?topic=nda" className="hover:text-ink">{isAr ? f.requestNda : 'Request NDA briefing'}</Link></li>
            <li><Link href="/contact?topic=media" className="hover:text-ink">{isAr ? f.mediaEnquiries : 'Media enquiries'}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">{isAr ? f.getInTouch : 'Get in touch'}</p>
          <ul className="mt-5 space-y-4 text-[15px] text-body">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-ink">
                <Mail size={18} className="text-brand" aria-hidden /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-brand" aria-hidden /> {isAr ? siteAr.location : site.location}
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-7 !h-11 !px-5 !text-[15px]">
            {isAr ? f.contactUs : 'Contact us'}
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-body sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()}{' '}
            {isAr ? f.rights : 'SEEH, Sustainability, Entrepreneurship, Energy & Health. All rights reserved.'}
          </p>
          <p>
            {isAr ? `${f.foundedBy} ${siteAr.founder}` : `Founded by ${site.founder}`}
          </p>
        </div>
      </div>
    </footer>
  )
}
