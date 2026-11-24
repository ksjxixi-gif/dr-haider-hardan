import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { sectors } from '@/content/site'
import { ButtonLink, ArrowLink, CtaBand, PageHero, Section, SectionHead, StageTag } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Business & Investment',
  description: 'Invest in, license or co-develop SEEH ventures across clean energy, AI and health.',
}

const why = [
  ['Early access', 'Enter at the idea and research stage, where the upside is greatest.'],
  ['A diversified pipeline', 'Several projects across five growing sectors, not a single bet.'],
  ['IP first', 'Inventions are protected before they are commercialised.'],
  ['Built for global markets', 'Designed for Jordan, the wider region and international scale from day one.'],
]
const models = [
  ['Equity investment', 'Take a stake in a project or venture and grow with it.'],
  ['Licensing', 'License a technology or product for your market or industry.'],
  ['Joint ventures', 'Build a dedicated company together around a specific opportunity.'],
  ['Co-development', 'Combine our ideas with your engineering, data or research capacity.'],
  ['Manufacturing partnership', 'Produce our products at scale with shared upside.'],
  ['Regional distribution', 'Take a product to market in your territory.'],
]
const steps = [
  ['Intro call', 'We learn your focus, sectors and the kind of involvement you want.'],
  ['Mutual NDA', 'Both sides are protected before any detail is shared.'],
  ['Deep dive', 'Technical, commercial and financial review of the relevant projects.'],
  ['Agreement', 'We structure the deal and get to work.'],
]

export default function Investment() {
  const sectorShort = Object.fromEntries(sectors.map((s) => [s.key, s.short]))
  return (
    <>
      <PageHero kicker="Business & Investment" title={<>Investing in <em>what comes next.</em></>}>
        Opportunities to invest in, license or co-develop ventures across clean energy, artificial intelligence and health, built for
        international commercial growth.
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center">
          <ButtonLink href="/contact?topic=investment">Book an intro call</ButtonLink>
          <ArrowLink href="#opportunities">Open opportunities</ArrowLink>
        </div>
      </PageHero>

      <Section>
        <SectionHead kicker="Why SEEH" title={<>A pipeline, <em>not a single bet.</em></>} />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80} className="border-l rule pl-6">
              <h3 className="h-card">{t}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="opportunities">
        <SectionHead kicker="Open now" title={<>Current <em>opportunities.</em></>} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-y rule text-[11px] uppercase tracking-[0.2em] text-dim">
                <th className="py-5 pr-6 font-normal">Project</th>
                <th className="py-5 pr-6 font-normal">Sector</th>
                <th className="py-5 pr-6 font-normal">Stage</th>
                <th className="py-5 pr-6 font-normal">Seeking</th>
                <th className="py-5 font-normal"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.slug} className="row-hover border-b rule">
                  <td className="py-7 pr-6">
                    <Link href={`/projects/${p.slug}`} className="font-serif text-xl hover:text-gold-2">{p.title}</Link>
                  </td>
                  <td className="py-7 pr-6 text-sm text-muted">{sectorShort[p.sector]}</td>
                  <td className="py-7 pr-6"><StageTag stage={p.stage} /></td>
                  <td className="py-7 pr-6 text-sm text-muted">{p.seeking.join(' · ')}</td>
                  <td className="py-7 text-right"><Link href={`/projects/${p.slug}`} className="text-gold" aria-label={`Open ${p.title}`}>→</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Ways to engage" title={<>Flexible <em>engagement models.</em></>} />
        <div className="grid gap-px bg-[rgba(140,170,230,0.16)] md:grid-cols-2 lg:grid-cols-3">
          {models.map(([t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="bg-ink p-8 md:p-10">
              <span className="num text-lg">0{i + 1}</span>
              <h3 className="h-card mt-6">{t}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Process" title={<>How an investment <em>conversation works.</em></>} />
        <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <Reveal as="li" key={t} delay={i * 80} className="border-t rule pt-6">
              <span className="num text-2xl">0{i + 1}</span>
              <h3 className="mt-4 text-[15px] font-medium tracking-wide">{t}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={<>Ready to explore <em>an opportunity?</em></>}
        body="Tell us your focus and we’ll match you with the most relevant projects."
        primary={{ href: '/contact?topic=investment', label: 'Contact us' }}
        secondary={{ href: '/projects', label: 'All projects' }}
      />
    </>
  )
}
