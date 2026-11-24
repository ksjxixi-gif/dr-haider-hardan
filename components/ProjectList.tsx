'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import type { Project } from '@/content/projects'
import type { Img } from '@/content/images'
import { StageBadge } from './ui'

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
  const shown = active === 'all' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by field">
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
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const im = images[p.slug]
          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="card-img object-cover" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <StageBadge stage={p.stage} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-navy-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    <Lock size={12} aria-hidden /> NDA
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-brand">{sectorTitles[p.sector]}</p>
                <h3 className="h3 mt-2">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-7 text-body">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.seeking.map((s) => (
                    <span key={s} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-ink">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="link mt-6">
                  View project <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      {shown.length === 0 && <p className="py-12 text-center text-body">No public projects in this field yet. Ask us about confidential work.</p>}
    </>
  )
}
