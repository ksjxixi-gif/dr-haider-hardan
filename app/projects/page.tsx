import type { Metadata } from 'next'
import { projects, stages } from '@/content/projects'
import { sectors } from '@/content/site'
import { CtaBand, PageHero, Section, StageTag } from '@/components/ui'
import { ProjectList } from '@/components/ProjectList'

export const metadata: Metadata = {
  title: 'Projects & Technologies',
  description: 'Current SEEH projects across clean energy, AI, health and inventions, presented at a high level to protect intellectual property.',
}

export default function Projects() {
  const used = new Set(projects.map((p) => p.sector))
  const filters = sectors.filter((s) => used.has(s.key)).map((s) => ({ key: s.key, label: s.short }))
  const sectorTitles = Object.fromEntries(sectors.map((s) => [s.key, s.title]))

  return (
    <>
      <PageHero kicker="Projects & Technologies" title={<>Ideas <em>in motion.</em></>}>
        A selection of current projects, shown at a high level to protect intellectual property. Technical details are available
        to qualified partners under NDA.
      </PageHero>

      <Section>
        <ProjectList projects={projects} filters={filters} sectorTitles={sectorTitles} />
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-dim">Stages</span>
          {stages.map((s) => (
            <StageTag key={s} stage={s} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={<>See something <em>worth exploring?</em></>}
        body="Request a confidential briefing. We’ll share details under a mutual NDA."
        primary={{ href: '/contact?topic=nda', label: 'Request NDA access' }}
        secondary={{ href: '/investment', label: 'Investment options' }}
      />
    </>
  )
}
