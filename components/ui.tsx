import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Img } from '@/content/images'
import { Reveal } from './Reveal'

/** SEEH mark redrawn from the brand banner: outlined leaf over a blue water-drop crescent.
 *  TODO(client): replace with the official vector logo file when available. */
export function LogoMark({ light = false, size = 34 }: { light?: boolean; size?: number }) {
  const ink = light ? '#ffffff' : '#0a1b3d'
  const id = light ? 'seeh-drop-l' : 'seeh-drop-d'
  return (
    <svg viewBox="0 0 40 46" width={size} height={(size * 46) / 40} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6cc0f7" />
          <stop offset="1" stopColor="#1673e6" />
        </linearGradient>
      </defs>
      <path d="M10 13C3 20 2 33 10 40c6 5 15 6 21 2-10 1-19-5-21-14-1-5-1-10 0-15Z" fill={`url(#${id})`} />
      <path d="M14 40C7.5 29 11 13 28 3c6 13 3 29-14 37Z" stroke={ink} strokeWidth="2.6" strokeLinejoin="round" fill="none" />
      <path d="M16.5 33.5c.5-7.5 3.5-13 8.5-18 .5 7.5-2.5 13.5-8.5 18Z" fill={ink} />
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark light={light} size={30} />
      <span className="leading-none">
        <span className={`block font-[family-name:Michroma] text-[21px] tracking-[0.04em] ${light ? 'text-white' : 'text-ink'}`}>SEEH</span>
        <span className={`mt-1.5 block text-[10px] tracking-[0.04em] ${light ? 'text-white/70' : 'text-body'}`}>Sustainability for Energy &amp; Health</span>
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
