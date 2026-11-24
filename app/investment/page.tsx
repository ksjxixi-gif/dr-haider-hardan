import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Coins, FileSignature, FlaskConical, Globe2, Handshake, Layers, PhoneCall, Rocket, Scale, Search, ShieldCheck, Factory } from 'lucide-react'
import { projects } from '@/content/projects'
import { sectors } from '@/content/site'
import { img, projectImg } from '@/content/images'
import { Button, CtaBand, PageHero, Section, SectionHeader, StageBadge } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Business & Investment',
  description: 'Invest in, license or co-develop SEEH ventures across clean energy, AI and health.',
}

const why = [
  { Icon: Rocket, t: 'Early access', b: 'Enter at the idea and research stage, where the upside is greatest.' },
  { Icon: Layers, t: 'Diversified pipeline', b: 'Several projects across five growing sectors, not a single bet.' },
  { Icon: ShieldCheck, t: 'IP first', b: 'Inventions are protected before they are commercialised.' },
  { Icon: Globe2, t: 'Global markets', b: 'Designed for Jordan, the wider region and international scale.' },
]
const models = [
  { Icon: Coins, t: 'Equity investment', b: 'Take a stake in a project or venture and grow with it.' },
  { Icon: Scale, t: 'Licensing', b: 'License a technology or product for your market or industry.' },
  { Icon: Handshake, t: 'Joint ventures', b: 'Build a dedicated company together around a specific opportunity.' },
  { Icon: FlaskConical, t: 'Co-development', b: 'Combine our ideas with your engineering, data or research capacity.' },
  { Icon: Factory, t: 'Manufacturing partnership', b: 'Produce our products at scale with shared upside.' },
  { Icon: Building2, t: 'Regional distribution', b: 'Take a product to market in your territory.' },
]
const steps = [
  { Icon: PhoneCall, t: 'Intro call', b: 'We learn your focus, sectors and the involvement you want.' },
  { Icon: FileSignature, t: 'Mutual NDA', b: 'Both sides are protected before any detail is shared.' },
  { Icon: Search, t: 'Deep dive', b: 'Technical, commercial and financial review of relevant projects.' },
  { Icon: Handshake, t: 'Agreement', b: 'We structure the deal and get to work.' },
]

export default function Investment() {
  const sectorShort = Object.fromEntries(sectors.map((s) => [s.key, s.short]))
  return (
    <>
      <PageHero
        eyebrow="Business & Investment"
        title={<>Investing in <span className="sun-text">what comes next.</span></>}
        intro="Opportunities to invest in, license or co-develop ventures across clean energy, artificial intelligence and health."
        image={img.windSunset}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact?topic=investment">Book an intro call</Button>
          <Button href="#opportunities" kind="glass" arrow={false}>View opportunities</Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Why SEEH" title="A pipeline, not a single bet" center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 80} className="card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-orange-600">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-body">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft" id="opportunities">
        <SectionHeader eyebrow="Open now" title="Current opportunities" intro="Select a project for a high-level overview, or request a confidential briefing." />
        <div className="space-y-4">
          {projects.map((p) => {
            const im = projectImg(p.slug, p.sector)
            return (
              <Reveal key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="card group grid items-center gap-5 overflow-hidden p-4 sm:grid-cols-[160px_1fr_auto] sm:gap-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-[4/3]">
                    <Image src={im.src} alt={im.alt} fill sizes="160px" className="card-img object-cover" />
                  </div>
                  <div className="px-2 sm:px-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-brand">{sectorShort[p.sector]}</span>
                      <StageBadge stage={p.stage} />
                    </div>
                    <h3 className="h3 mt-2">{p.title}</h3>
                    <p className="mt-1 text-[15px] text-body">
                      Seeking: <span className="font-medium text-ink">{p.seeking.join(' · ')}</span>
                    </p>
                  </div>
                  <span className="mx-2 mb-2 grid h-11 w-11 place-items-center rounded-full bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white sm:m-0 sm:mr-3">
                    <ArrowRight size={18} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Ways to engage" title="Flexible engagement models" center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="card hoverable flex gap-5 p-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand">
                <Icon size={22} aria-hidden />
              </span>
              <div>
                <h3 className="h3">{t}</h3>
                <p className="mt-1.5 text-[15.5px] leading-7 text-body">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeader eyebrow="Process" title="How an investment conversation works" center />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, t, b }, i) => (
            <Reveal as="li" key={t} delay={i * 80} className="rounded-xl border border-white/10 bg-white/5 p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-amber-300">
                  <Icon size={22} aria-hidden />
                </span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white/15">0{i + 1}</span>
              </div>
              <h3 className="h3 mt-6">{t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-slate-300">{b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        image={img.city}
        title={<>Ready to explore <span className="sun-text">an opportunity?</span></>}
        intro="Tell us your focus and we’ll match you with the most relevant projects."
        primary={{ href: '/contact?topic=investment', label: 'Contact us' }}
        secondary={{ href: '/projects', label: 'All projects' }}
      />
    </>
  )
}
