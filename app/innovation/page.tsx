import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FileLock2, Lock, Layers } from 'lucide-react'
import { process, sectors } from '@/content/site'
import { img, sectorImg } from '@/content/images'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SectorIcon } from '@/components/SectorIcon'

export const metadata: Metadata = {
  title: 'Innovation & R&D',
  description: 'How SEEH turns unconventional ideas into protected, manufacturable and marketable solutions.',
}

const stageDetail = [
  'Every project starts with a real, unmet need or an angle the market has overlooked. We capture ideas broadly and filter them hard.',
  'We study the market, the technology and existing patents to understand what has been tried, what is protected and where the real gap is.',
  'Feasibility, cost, risk and commercial potential are scored honestly. Ideas that do not pass are parked, not forced.',
  'Concepts become prototypes, working with engineers, scientists and specialists. We test, learn and iterate quickly.',
  'Industrial partners join early, so products are designed for manufacturing, cost and scale from the start.',
  'Products reach the market through direct launch, licensing or joint ventures, whichever creates the most value.',
]

export default function Innovation() {
  return (
    <>
      <PageHero
        eyebrow="Innovation & R&D"
        title={<>From idea <span className="sun-text">to industry.</span></>}
        intro="A disciplined process that turns unconventional ideas into protected, manufacturable and marketable solutions."
        image={img.engineerLab}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader eyebrow="Our process" title="Six stages. No shortcuts." intro="Every project moves through the same gates, so partners always know where it stands and what comes next." />
            <div className="relative -mt-4 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Image src={img.inventor.src} alt={img.inventor.alt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <ol className="relative space-y-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className="card flex gap-5 p-6 md:p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 font-[family-name:var(--font-display)] font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p className="mt-2 leading-7 text-body">{stageDetail[i]}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeader eyebrow="Research directions" title="Where our R&D is focused" center />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 80}>
              <article className="card group h-full overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={sectorImg[s.key].src} alt={sectorImg[s.key].alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="card-img object-cover" />
                </div>
                <div className="p-6">
                  <SectorIcon sector={s.key} className="-mt-12 mb-4 border-4 border-white" />
                  <h3 className="h3">{s.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-7 text-body">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal className="card flex flex-col justify-center bg-gradient-to-br from-navy-900 to-navy-800 p-8 text-white">
            <h3 className="h3">Research institution or university?</h3>
            <p className="mt-3 leading-7 text-slate-300">We collaborate on applied research, validation and joint development.</p>
            <Link href="/contact?topic=research" className="btn btn-primary mt-6 self-start">Propose a collaboration</Link>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Intellectual property"
          title="Protecting what we build"
          intro="Ideas are shared publicly at a high level only. Technical depth is opened up to qualified partners, step by step."
          center
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: FileLock2, t: 'Protect first', b: 'Inventions are documented and protection is pursued before detailed disclosure.' },
            { Icon: Lock, t: 'NDA-first sharing', b: 'Technical details, data and designs are shared under a mutual non-disclosure agreement.' },
            { Icon: Layers, t: 'Staged disclosure', b: 'Information is opened up as trust and commitment grow on both sides.' },
          ].map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 90} className="card p-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <Icon size={26} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{t}</h3>
              <p className="mt-2 leading-7 text-body">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.lab}
        title={<>Have an idea worth <span className="sun-text">developing?</span></>}
        intro="We work with inventors, researchers and companies to take ideas from concept to market."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/projects', label: 'View projects' }}
      />
    </>
  )
}
