import type { Metadata } from 'next'
import Image from 'next/image'
import { Building2, Check, Coins, Cpu, Factory, GraduationCap, Microscope } from 'lucide-react'
import { photo as sitePhoto } from '@/content/site'
import { img } from '@/content/images'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Strategic Partnerships',
  description: 'SEEH partners with industrial companies, technology firms, research centres, universities, investors and manufacturers.',
}

const partners = [
  { Icon: Building2, t: 'Industrial companies', bring: 'Production capability and market access', get: 'New products and technologies for your portfolio' },
  { Icon: Cpu, t: 'Technology companies', bring: 'Engineering, software and data expertise', get: 'Co-developed IP and new applications' },
  { Icon: Microscope, t: 'Research centres', bring: 'Laboratories, testing and scientific rigour', get: 'Applied, commercially relevant problems' },
  { Icon: GraduationCap, t: 'Universities', bring: 'Researchers and academic validation', get: 'Real-world projects and industry links' },
  { Icon: Coins, t: 'Investors', bring: 'Capital and strategic guidance', get: 'Early access to a diversified pipeline' },
  { Icon: Factory, t: 'Manufacturers & distributors', bring: 'Scale, supply chains and channels', get: 'Protected products ready for your markets' },
]

const models = ['Joint development agreements', 'Technology licensing', 'Manufacturing & supply partnerships', 'Research collaboration & pilots', 'Regional distribution rights']

export default function Partnerships() {
  const photo = sitePhoto.factoryFair
  return (
    <>
      <PageHero
        eyebrow="Strategic Partnerships"
        title={<>Partnerships that turn <span className="sun-text">ideas into industries.</span></>}
        intro="We work with industrial companies, technology firms, research centres, universities, investors and manufacturers to bring promising ideas to market."
        image={img.earth}
      />

      <Section>
        <SectionHeader eyebrow="Who we partner with" title="What you bring. What you get." center />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map(({ Icon, t, bring, get }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="card flex flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{t}</h3>
              <dl className="mt-5 grid gap-3 text-[15px]">
                <div className="rounded-xl bg-soft p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-body">You bring</dt>
                  <dd className="mt-1 text-ink">{bring}</dd>
                </div>
                <div className="rounded-xl bg-amber-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-amber-700">You get</dt>
                  <dd className="mt-1 text-ink">{get}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">How we collaborate</p>
            <h2 className="h2 mt-4">Models that fit how you work</h2>
            <ul className="mt-8 space-y-3">
              {models.map((m) => (
                <li key={m} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-line">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-leaf">
                    <Check size={16} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="font-medium">{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 450px, 90vw" className="object-cover object-[center_20%]" />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 pt-16 text-[15px] text-white">{photo.caption}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        image={img.solarInstall}
        title={<>Let’s explore <span className="sun-text">a partnership.</span></>}
        intro="Tell us about your organisation and what you’d like to build together."
        primary={{ href: '/contact?topic=partnership', label: 'Become a partner' }}
        secondary={{ href: '/projects', label: 'Our projects' }}
      />
    </>
  )
}
