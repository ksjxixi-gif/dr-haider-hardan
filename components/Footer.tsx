import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { nav, site } from '@/content/site'
import { Logo } from './ui'
import { SocialButtons } from './icons'

export function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="SEEH home">
            <Logo light />
          </Link>
          <p className="mt-6 max-w-xs text-[15px] leading-7 text-slate-300">
            Turning ideas into sustainable real-world solutions across clean energy, AI and health.
          </p>
          <div className="mt-6">
            <SocialButtons dark />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Explore</p>
          <ul className="mt-5 space-y-3 text-[15px] text-slate-300">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Work with us</p>
          <ul className="mt-5 space-y-3 text-[15px] text-slate-300">
            <li><Link href="/investment" className="hover:text-white">Investment opportunities</Link></li>
            <li><Link href="/partnerships" className="hover:text-white">Strategic partnerships</Link></li>
            <li><Link href="/contact?topic=nda" className="hover:text-white">Request NDA briefing</Link></li>
            <li><Link href="/contact?topic=media" className="hover:text-white">Media enquiries</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Get in touch</p>
          <ul className="mt-5 space-y-4 text-[15px] text-slate-300">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail size={18} className="text-sky-400" aria-hidden /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-sky-400" aria-hidden /> {site.location}
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-7 !h-11 !px-5 !text-[15px]">Contact us</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-slate-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} SEEH, Sustainability for Energy &amp; Health. All rights reserved.</p>
          <p>Founded by {site.founder}</p>
        </div>
      </div>
    </footer>
  )
}
