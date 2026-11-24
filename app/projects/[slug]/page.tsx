import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react'
import { getProject, projects, stages } from '@/content/projects'
import { sectors } from '@/content/site'
import { projectImg } from '@/content/images'
import { Section, StageBadge } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SectorIcon } from '@/components/SectorIcon'

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
  const im = projectImg(p.slug, p.sector)

  return (
    <>
      <section className="on-dark relative -mt-[76px] overflow-hidden bg-navy-900 pt-[76px] text-white">
        <Image src={im.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/40" />
        <div className="wrap relative py-16 md:py-24">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
            <ArrowLeft size={16} aria-hidden /> All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
              <SectorIcon sector={p.sector} plain size={16} /> {sector.title}
            </span>
            <StageBadge stage={p.stage} />
          </div>
          <h1 className="h1 mt-6 max-w-4xl !text-[clamp(2.2rem,5vw,3.8rem)]">{p.title}</h1>
          <p className="lead mt-5 max-w-2xl">{p.summary}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="space-y-6">
            {[
              ['The challenge', p.challenge],
              ['The opportunity', p.opportunity],
              ['Our approach', p.approach],
            ].map(([t, b]) => (
              <Reveal key={t} className="card p-7 md:p-9">
                <h2 className="h3 !text-[1.45rem]">{t}</h2>
                <p className="mt-3 text-[17px] leading-8 text-body">{b}</p>
              </Reveal>
            ))}

            <Reveal className="card p-7 md:p-9">
              <h2 className="h3 !text-[1.45rem]">Where it stands</h2>
              <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {stages.map((s, i) => (
                  <li key={s} className="text-center">
                    <span
                      className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                        i < stageIdx ? 'bg-leaf text-white' : i === stageIdx ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-4 ring-amber-100' : 'bg-soft text-slate-400'
                      }`}
                    >
                      {i < stageIdx ? <Check size={16} aria-hidden /> : i + 1}
                    </span>
                    <span className={`mt-2 block text-xs font-medium ${i === stageIdx ? 'text-ink' : 'text-body'}`}>{s}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="card overflow-hidden">
              <div className="bg-navy-900 px-7 py-5 text-white">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">Key facts</p>
              </div>
              <dl className="divide-y divide-line px-7">
                {[
                  ['Field', sector.title],
                  ['Stage', p.stage],
                  ['IP status', p.ip],
                  ['Target markets', p.markets],
                  ['Seeking', p.seeking.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="py-4">
                    <dt className="text-sm text-body">{k}</dt>
                    <dd className="mt-0.5 font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line p-7">
                <Link href={`/contact?topic=nda&project=${p.slug}`} className="btn btn-primary w-full">
                  <Lock size={17} aria-hidden /> Request a briefing
                </Link>
                <p className="mt-3 text-center text-sm text-body">Details shared under a mutual NDA</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="soft">
        <h2 className="h2 mb-10">More projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((r) => {
            const ri = projectImg(r.slug, r.sector)
            return (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="card group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={ri.src} alt={ri.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="card-img object-cover" />
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <h3 className="h3">{r.title}</h3>
                  <ArrowRight size={18} className="shrink-0 text-brand" aria-hidden />
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}
