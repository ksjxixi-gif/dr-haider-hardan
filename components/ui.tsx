import Link from 'next/link'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="#c9a96e" strokeWidth="1.3" aria-hidden="true">
      <path d="M16 3S7 13.5 7 19.5a9 9 0 0 0 18 0C25 13.5 16 3 16 3Z" />
      <path d="M12 23c0-5 3.5-8 8-8 0 4.5-3 8-8 8Z" />
    </svg>
  )
}

export function Arrow() {
  return <span aria-hidden="true">→</span>
}

export function ButtonLink({ href, children, variant = 'line' }: { href: string; children: ReactNode; variant?: 'line' | 'gold' }) {
  return (
    <Link href={href} className={`btn ${variant === 'gold' ? 'btn-gold' : 'btn-line'}`}>
      {children}
    </Link>
  )
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link-arrow">
      {children} <Arrow />
    </Link>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`border-t rule-soft py-24 md:py-32 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function SectionHead({ kicker, title, children, className = '' }: { kicker: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <Reveal className={`mb-14 md:mb-20 max-w-3xl ${className}`}>
      <p className="kicker mb-6">{kicker}</p>
      <h2 className="h-sec">{title}</h2>
      {children && <div className="lead mt-6">{children}</div>}
    </Reveal>
  )
}

export function PageHero({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute -right-60 -top-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(closest-side,rgba(201,169,110,0.09),transparent)]" />
      <div className="wrap relative">
        <Reveal>
          <p className="kicker mb-8">{kicker}</p>
          <h1 className="display max-w-5xl">{title}</h1>
          {children && <div className="lead mt-10 max-w-2xl">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}

export function StageTag({ stage }: { stage: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
      {stage}
    </span>
  )
}

export function CtaBand({
  title,
  body,
  primary = { href: '/contact', label: 'Start a conversation' },
  secondary,
}: {
  title: ReactNode
  body: ReactNode
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="border-t rule py-28 md:py-36">
      <div className="wrap">
        <Reveal className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="kicker mb-6">Let’s talk</p>
            <h2 className="h-sec">{title}</h2>
            <p className="lead mt-6 max-w-xl">{body}</p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center md:justify-end">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && <ArrowLink href={secondary.href}>{secondary.label}</ArrowLink>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
