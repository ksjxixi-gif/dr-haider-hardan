'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import type { Project } from '@/content/projects'
import type { Img } from '@/content/images'
import type { SectorKey } from '@/content/site'
import { projectsAr, sectorsAr } from '@/content/i18n'
import { StageBadge } from './ui'
import { useLang } from './LanguageProvider'

type Filter = { key: string; label: string }

export function ProjectList({
  projects,
  filters,
  sectorTitles,
  images,
}: {
  projects: Project[]
  filters: Filter[]
  sectorTitles: Record<string, string>
  images: Record<string, Img>
}) {
  const [active, setActive] = useState('all')
  const { isAr } = useLang()
  const shown = active === 'all' ? projects : projects.filter((p) => p.sector === active)

  const filterLabel = (f: Filter) => {
    if (f.key === 'all') return isAr ? 'جميع المشاريع' : f.label
    return isAr ? (sectorsAr[f.key as SectorKey]?.short ?? f.label) : f.label
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={isAr ? 'تصفية المشاريع حسب المجال' : 'Filter projects by field'}>
        {[{ key: 'all', label: 'All projects' }, ...filters].map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
            className={`h-10 rounded-full px-5 text-[15px] font-medium transition-colors ${
              active === f.key ? 'bg-navy-900 text-white' : 'border border-line bg-white text-ink hover:border-brand hover:text-brand'
            }`}
          >
            {filterLabel(f)}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {isAr ? `${shown.length} مشاريع معروضة` : `${shown.length} projects shown`}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const im = images[p.slug]
          const ar = projectsAr[p.slug]
          const title = isAr && ar ? ar.title : p.title
          const summary = isAr && ar ? ar.summary : p.summary
          const seeking = isAr && ar ? ar.seeking : p.seeking
          const sectorTitle = isAr ? (sectorsAr[p.sector]?.short ?? sectorTitles[p.sector]) : sectorTitles[p.sector]

          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="card-img object-cover" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <StageBadge stage={p.stage} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-navy-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    <Lock size={12} aria-hidden /> {isAr ? 'اتفاقية سرية' : 'NDA'}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-brand">{sectorTitle}</p>
                <h3 className="h3 mt-2">{title}</h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-7 text-body">{summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {seeking.map((s) => (
                    <span key={s} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="link mt-6">
                  {isAr ? 'عرض المشروع' : 'View project'} <ArrowRight size={16} strokeWidth={2.4} className="rtl-flip" aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      {shown.length === 0 && (
        <p className="py-12 text-center text-body">
          {isAr ? 'لا توجد مشاريع عامة في هذا المجال بعد. اسألنا عن الأعمال السرية.' : 'No public projects in this field yet. Ask us about confidential work.'}
        </p>
      )}
    </>
  )
}
