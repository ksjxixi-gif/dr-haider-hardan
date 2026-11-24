import type { Metadata } from 'next'
import { process, sectors } from '@/content/site'
import { CtaBand, PageHero, Section, SectionHead } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Innovation & R&D',
  description: 'How SEEH turns unconventional ideas into protected, manufacturable and marketable solutions.',
}

const stageDetail = [
  'Every project starts with a real, unmet need or an angle the market has overlooked. We capture ideas broadly and filter them hard.',
  'We study the market, the technology and the existing patents to understand what has been tried, what is protected and where the real gap is.',
  'Feasibility, cost, risk and commercial potential are scored honestly. Ideas that do not pass are parked, not forced.',
  'Concepts become prototypes, working with engineers, scientists and specialists. We test, learn and iterate quickly.',
  'We bring in industrial partners early to design for manufacturing, cost and scale rather than retrofit them later.',
  'Products reach the market through direct launch, licensing or joint ventures, whichever creates the most value.',
]

export default function Innovation() {
  return (
    <>
      <PageHero kicker="Innovation & R&D" title={<>From idea <em>to industry.</em></>}>
        A disciplined process that turns unconventional ideas into protected, manufacturable and marketable solutions.
      </PageHero>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead kicker="Our process" title={<>Six stages. <em>No shortcuts.</em></>} className="!mb-0">
              Every project moves through the same gates, so partners always know where it stands and what comes next.
            </SectionHead>
          </div>
          <ol className="border-t rule">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className="grid grid-cols-[56px_1fr] gap-4 border-b rule py-10">
                <span className="num text-2xl">0{i + 1}</span>
                <div>
                  <h3 className="h-card">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">{stageDetail[i]}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Research directions" title={<>Where our R&amp;D <em>is focused.</em></>} />
        <div className="grid gap-px bg-[rgba(140,170,230,0.16)] md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 80} className="bg-ink p-8 md:p-10">
              <span className="num text-xl">0{i + 1}</span>
              <h3 className="h-card mt-8">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{s.body}</p>
            </Reveal>
          ))}
          <div className="hidden bg-ink lg:block" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead kicker="Intellectual property" title={<>Protecting <em>what we build.</em></>} className="!mb-0">
            We talk about ideas at a high level in public and share technical depth only with qualified partners, step by step.
          </SectionHead>
          <div className="border-t rule">
            {[
              ['Protect first', 'Inventions are documented and protection is pursued before detailed disclosure.'],
              ['NDA-first sharing', 'Technical details, data and designs are shared under a mutual non-disclosure agreement.'],
              ['Staged disclosure', 'Information is opened up as trust and commitment grow on both sides.'],
            ].map(([t, b]) => (
              <Reveal key={t} className="border-b rule py-8">
                <h3 className="text-[15px] font-medium tracking-wide">{t}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Research institution <em>or university?</em></>}
        body="We collaborate on applied research, validation and joint development."
        primary={{ href: '/contact?topic=research', label: 'Propose a collaboration' }}
        secondary={{ href: '/projects', label: 'View projects' }}
      />
    </>
  )
}
