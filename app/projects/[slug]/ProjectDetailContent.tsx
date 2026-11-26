'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react'
import { stages, type Project } from '@/content/projects'
import type { SectorKey } from '@/content/site'
import { projectImg } from '@/content/images'
import { projectsAr, sectorsAr, stageLabelsAr } from '@/content/i18n'
import { Section, StageBadge } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SectorIcon } from '@/components/SectorIcon'
import { useLang } from '@/components/LanguageProvider'

export function ProjectDetailContent({
  project: p,
  sectorTitle,
  related,
}: {
  project: Project
  sectorTitle: string
  related: Project[]
}) {
  const { isAr } = useLang()
  const ar = projectsAr[p.slug]
  const stageIdx = stages.indexOf(p.stage)
  const im = projectImg(p.slug, p.sector)

  const title = isAr && ar ? ar.title : p.title
  const summary = isAr && ar ? ar.summary : p.summary
  const challenge = isAr && ar ? ar.challenge : p.challenge
  const opportunity = isAr && ar ? ar.opportunity : p.opportunity
  const approach = isAr && ar ? ar.approach : p.approach
  const ip = isAr && ar ? ar.ip : p.ip
  const markets = isAr && ar ? ar.markets : p.markets
  const seeking = isAr && ar ? ar.seeking : p.seeking
  const activeSectorTitle = isAr ? (sectorsAr[p.sector as SectorKey]?.title ?? sectorTitle) : sectorTitle

  return (
    <>
      <section className="bg-white text-ink">
        <div className="wrap pt-12 pb-14 md:pt-16 md:pb-20">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-ink">
            <ArrowLeft size={16} className="rtl-flip" aria-hidden /> {isAr ? 'جميع المشاريع' : 'All projects'}
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-ink">
                  <SectorIcon sector={p.sector} plain size={16} /> {activeSectorTitle}
                </span>
                <StageBadge stage={p.stage} />
              </div>
              <h1 className="h1 mt-6 !text-[clamp(2.2rem,5vw,3.6rem)]">{title}</h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="lead">{summary}</p>
            </div>
          </div>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl md:mt-14 md:aspect-[21/8]">
            <Image src={im.src} alt={im.alt} fill priority sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="space-y-6">
            {[
              [isAr ? 'التحدي' : 'The challenge', challenge],
              [isAr ? 'الفرصة' : 'The opportunity', opportunity],
              [isAr ? 'نهجنا' : 'Our approach', approach],
            ].map(([t, b]) => (
              <Reveal key={t} className="card p-7 md:p-9">
                <h2 className="h3 !text-[1.45rem]">{t}</h2>
                <p className="mt-3 text-[17px] leading-8 text-body">{b}</p>
              </Reveal>
            ))}

            <Reveal className="card p-7 md:p-9">
              <h2 className="h3 !text-[1.45rem]">{isAr ? 'أين يقف المشروع' : 'Where it stands'}</h2>
              <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {stages.map((s, i) => (
                  <li key={s} className="text-center">
                    <span
                      className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                        i < stageIdx
                          ? 'bg-leaf text-white'
                          : i === stageIdx
                            ? 'bg-orange-50 text-orange-600 ring-4 ring-amber-100'
                            : 'border border-line bg-white text-slate-400'
                      }`}
                    >
                      {i < stageIdx ? <Check size={16} aria-hidden /> : i + 1}
                    </span>
                    <span className={`mt-2 block text-xs font-medium ${i === stageIdx ? 'text-ink' : 'text-body'}`}>
                      {isAr ? stageLabelsAr[s] : s}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-white px-7 py-5 text-ink">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{isAr ? 'حقائق رئيسية' : 'Key facts'}</p>
              </div>
              <dl className="divide-y divide-line px-7">
                {[
                  [isAr ? 'المجال' : 'Field', activeSectorTitle],
                  [isAr ? 'المرحلة' : 'Stage', isAr ? stageLabelsAr[p.stage] : p.stage],
                  [isAr ? 'حالة الملكية الفكرية' : 'IP status', ip],
                  [isAr ? 'الأسواق المستهدفة' : 'Target markets', markets],
                  [isAr ? 'المطلوب' : 'Seeking', seeking.join('، ')],
                ].map(([k, v]) => (
                  <div key={k} className="py-4">
                    <dt className="text-sm text-body">{k}</dt>
                    <dd className="mt-0.5 font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line p-7">
                <Link href={`/contact?topic=nda&project=${p.slug}`} className="btn btn-primary w-full">
                  <Lock size={17} aria-hidden /> {isAr ? 'اطلب إحاطة سرية' : 'Request a briefing'}
                </Link>
                <p className="mt-3 text-center text-sm text-body">
                  {isAr ? 'تُشارك التفاصيل بموجب اتفاقية عدم إفصاح متبادلة' : 'Details shared under a mutual NDA'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section>
        <h2 className="h2 mb-10">{isAr ? 'مشاريع أخرى' : 'More projects'}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((r) => {
            const ri = projectImg(r.slug, r.sector)
            const rar = projectsAr[r.slug]
            return (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="card group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={ri.src} alt={ri.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="card-img object-cover" />
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <h3 className="h3">{isAr && rar ? rar.title : r.title}</h3>
                  <ArrowRight size={18} className="rtl-flip shrink-0 text-brand" aria-hidden />
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}
