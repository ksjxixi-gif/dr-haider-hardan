import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects, stages } from '@/content/projects'
import { sectors } from '@/content/site'
import { ButtonLink, Section, StageTag } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const p = getProject((await params).slug)
  return p ? { title: p.title, description: p.summary } : {}
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const sector = sectors.find((s) => s.key === p.sector)!
  const stageIdx = stages.indexOf(p.stage)
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3)

  return (
    <>
      <section className="pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="wrap">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-12 text-xs uppercase tracking-[0.2em] text-dim">
              <Link href="/projects" className="hover:text-gold">Projects</Link> <span className="mx-2">/</span> {sector.short}
            </nav>
            <div className="mb-8 flex flex-wrap items-center gap-6">
              <span className="kicker">{sector.title}</span>
              <StageTag stage={p.stage} />
            </div>
            <h1 className="display max-w-5xl !text-[clamp(2.6rem,6vw,5.5rem)]">{p.title}</h1>
            <p className="lead mt-10 max-w-2xl">{p.summary}</p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-24">
          <div className="space-y-14">
            {[
              ['The challenge', p.challenge],
              ['The opportunity', p.opportunity],
              ['Our approach', p.approach],
            ].map(([t, b], i) => (
              <Reveal key={t} className="grid gap-4 md:grid-cols-[56px_1fr]">
                <span className="num text-xl">0{i + 1}</span>
                <div>
                  <h2 className="h-card">{t}</h2>
                  <p className="mt-4 text-[17px] font-light leading-8 text-[#cfc7b9]">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="h-fit border rule p-8 lg:sticky lg:top-32">
            <p className="kicker mb-6">Key facts</p>
            <dl>
              {[
                ['Sector', sector.title],
                ['Stage', p.stage],
                ['IP status', p.ip],
                ['Target markets', p.markets],
                ['Seeking', p.seeking.join(', ')],
              ].map(([k, v]) => (
                <div key={k} className="border-b rule-soft py-4">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-dim">{k}</dt>
                  <dd className="mt-1 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 [&_a]:w-full">
              <ButtonLink href={`/contact?topic=nda&project=${p.slug}`} variant="gold">Request briefing</ButtonLink>
            </div>
            <p className="mt-4 text-center text-xs text-dim">Details shared under mutual NDA</p>
          </aside>
        </div>
      </Section>

      <Section>
        <p className="kicker mb-10">Where it stands</p>
        <ol className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {stages.map((s, i) => (
            <li key={s}>
              <span className={`block h-px ${i <= stageIdx ? 'bg-gold' : 'bg-[rgba(239,232,220,0.12)]'}`} />
              <span className={`mt-4 block text-xs uppercase tracking-[0.16em] ${i === stageIdx ? 'text-gold' : i < stageIdx ? 'text-ivory' : 'text-dim'}`}>{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <p className="kicker mb-10">More projects</p>
        <ul className="border-t rule">
          {related.map((r) => (
            <li key={r.slug} className="border-b rule">
              <Link href={`/projects/${r.slug}`} className="row-hover group flex items-center justify-between gap-6 py-8">
                <span className="h-card transition-colors group-hover:text-gold-2">{r.title}</span>
                <span className="text-gold" aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
