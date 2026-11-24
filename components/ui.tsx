import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Img } from '@/content/images'
import { Reveal } from './Reveal'

export function Logo({ light = false, size = 34 }: { light?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={light ? 'lg-l' : 'lg-d'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill={light ? 'rgba(255,255,255,0.12)' : '#0a1b3d'} />
        <g fill="none" stroke={`url(#${light ? 'lg-l' : 'lg-d'})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 8s-8 9.5-8 15a8 8 0 0 0 16 0c0-5.5-8-15-8-15Z" />
          <path d="M16.5 27c0-4.5 3-7 7-7 0 4-2.7 7-7 7Z" />
        </g>
      </svg>
      <span className="leading-none">
        <span className={`block font-[family-name:var(--font-display)] text-[19px] font-semibold tracking-[0.14em] ${light ? 'text-white' : 'text-ink'}`}>SEEH</span>
        <span className={`mt-1 block text-[9.5px] font-medium uppercase tracking-[0.12em] ${light ? 'text-white/70' : 'text-body'}`}>Sustainability for Energy &amp; Health</span>
      </span>
    </span>
  )
}

type BtnKind = 'primary' | 'blue' | 'outline' | 'glass'
export function Button({ href, children, kind = 'primary', arrow = true }: { href: string; children: ReactNode; kind?: BtnKind; arrow?: boolean }) {
  return (
    <Link href={href} className={`btn btn-${kind}`}>
      {children}
      {arrow && <ArrowRight size={18} strokeWidth={2.2} aria-hidden />}
    </Link>
  )
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link">
      {children} <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
    </Link>
  )
}

type Tone = 'white' | 'soft' | 'navy'
const toneCls: Record<Tone, string> = {
  white: 'bg-white',
  soft: 'bg-soft',
  navy: 'on-dark bg-navy-900 text-white',
}
export function Section({ children, tone = 'white', className = '', id }: { children: ReactNode; tone?: Tone; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${toneCls[tone]} ${className}`}>
      <div className="wrap relative">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  center = false,
  action,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  center?: boolean
  action?: ReactNode
}) {
  return (
    <Reveal className={`mb-12 flex flex-col gap-6 md:mb-16 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-3xl' : 'max-w-2xl'}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2 mt-4">{title}</h2>
        {intro && <p className="lead mt-5">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image: Img; children?: ReactNode }) {
  return (
    <section className="bg-white">
      <div className="wrap pt-14 md:pt-20">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="h1 mt-5">{title}</h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            {intro && <p className="lead">{intro}</p>}
            {children}
          </div>
        </Reveal>
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-xl md:mt-16 md:aspect-[21/8]">
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

const stageStyle: Record<string, string> = {
  Concept: 'bg-slate-100 text-slate-700',
  Research: 'bg-sky-50 text-sky-700',
  Development: 'bg-blue-50 text-blue-700',
  Prototype: 'bg-indigo-50 text-indigo-700',
  'Patent pending': 'bg-amber-50 text-amber-700',
  Ready: 'bg-emerald-50 text-emerald-700',
}
export function StageBadge({ stage }: { stage: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${stageStyle[stage] ?? 'bg-slate-100 text-slate-700'}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {stage}
    </span>
  )
}

export function CtaBand({
  title,
  intro,
  primary = { href: '/contact', label: 'Start a conversation' },
  secondary,
  image,
}: {
  title: ReactNode
  intro: ReactNode
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  image: Img
}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="wrap">
        <Reveal className="on-dark relative overflow-hidden rounded-xl bg-navy-900 text-white">
          <Image src={image.src} alt="" fill sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/20" />
          <div className="relative grid gap-10 px-7 py-14 md:px-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="h2">{title}</h2>
              <p className="lead mt-5 max-w-xl">{intro}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary && (
                <Button href={secondary.href} kind="glass" arrow={false}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
