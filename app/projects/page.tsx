import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { projects, stages } from '@/content/projects'
import { sectors } from '@/content/site'
import { img, projectImg } from '@/content/images'
import { CtaBand, PageHero, Section, StageBadge } from '@/components/ui'
import { ProjectList } from '@/components/ProjectList'

export const metadata: Metadata = {
  title: 'Projects & Technologies',
  description: 'Current SEEH projects across clean energy, AI, health and inventions, presented at a high level to protect intellectual property.',
}

export default function Projects() {
  const used = new Set(projects.map((p) => p.sector))
  const filters = sectors.filter((s) => used.has(s.key)).map((s) => ({ key: s.key, label: s.short }))
  const sectorTitles = Object.fromEntries(sectors.map((s) => [s.key, s.short]))
  const images = Object.fromEntries(projects.map((p) => [p.slug, projectImg(p.slug, p.sector)]))

  return (
    <>
      <PageHero
        eyebrow="Projects & Technologies"
        title={<>Ideas <span className="sun-text">in motion.</span></>}
        intro="A selection of current projects across clean energy, AI, health and new inventions."
        image={img.solarAerial}
      />

      <Section>
        <div className="mb-10 flex items-start gap-3 rounded-lg border border-sky-100 bg-sky-50 p-5 text-[15.5px] text-sky-900">
          <ShieldCheck size={22} className="mt-0.5 shrink-0" aria-hidden />
          <p>
            Projects are presented at a high level to protect intellectual property. Technical details are available to qualified
            partners under a mutual NDA.
          </p>
        </div>
        <ProjectList projects={projects} filters={filters} sectorTitles={sectorTitles} images={images} />
        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <span className="mr-2 text-sm font-semibold text-ink">Project stages:</span>
          {stages.map((s) => (
            <StageBadge key={s} stage={s} />
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.circuit}
        title={<>See something <span className="sun-text">worth exploring?</span></>}
        intro="Request a confidential briefing. We’ll share details under a mutual NDA."
        primary={{ href: '/contact?topic=nda', label: 'Request NDA briefing' }}
        secondary={{ href: '/investment', label: 'Investment options' }}
      />
    </>
  )
}
