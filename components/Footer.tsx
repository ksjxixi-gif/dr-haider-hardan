import Link from 'next/link'
import { nav, site } from '@/content/site'
import { Logo } from './ui'
import { SocialButtons } from './icons'

export function Footer() {
  return (
    <footer className="border-t rule bg-ink-2">
      <div className="wrap grid gap-14 py-20 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-3.5" aria-label="SEEH home">
            <Logo />
            <span className="text-[14px] font-medium tracking-[0.42em]">SEEH</span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
            Sustainability for Energy &amp; Health. Turning bold ideas into products and ventures with real commercial value.
          </p>
          <div className="mt-8">
            <SocialButtons />
          </div>
        </div>
        <div>
          <p className="kicker mb-6 text-dim">Explore</p>
          <ul className="space-y-3 text-sm text-muted">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-ivory">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker mb-6 text-dim">Work with us</p>
          <ul className="space-y-3 text-sm text-muted">
            <li><Link href="/investment" className="hover:text-ivory">Investment</Link></li>
            <li><Link href="/partnerships" className="hover:text-ivory">Partnerships</Link></li>
            <li><Link href="/contact?topic=nda" className="hover:text-ivory">Request NDA access</Link></li>
            <li><Link href="/contact" className="hover:text-ivory">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="kicker mb-6 text-dim">Contact</p>
          <ul className="space-y-3 text-sm text-muted">
            <li><a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a></li>
            <li>{site.location}</li>
            <li>seeh.company</li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t rule-soft py-8 text-xs text-dim sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} SEEH, Sustainability for Energy &amp; Health. All rights reserved.</p>
        <p>Founded by {site.founder}</p>
      </div>
    </footer>
  )
}
