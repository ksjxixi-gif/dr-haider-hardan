'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/content/projects'
import { StageTag } from './ui'

type Filter = { key: string; label: string }

export function ProjectList({ projects, filters, sectorTitles }: { projects: Project[]; filters: Filter[]; sectorTitles: Record<string, string> }) {
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
        {[{ key: 'all', label: 'All' }, ...filters].map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
            className={`h-10 border px-5 text-xs uppercase tracking-[0.16em] transition-colors ${
              active === f.key ? 'border-gold bg-gold text-ink' : 'rule text-muted hover:border-gold hover:text-ivory'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="border-t rule">
        {shown.map((p, i) => (
          <li key={p.slug} className="border-b rule">
            <Link href={`/projects/${p.slug}`} className="row-hover group grid gap-4 py-10 md:grid-cols-[64px_1.3fr_1fr_auto] md:items-center md:gap-10">
              <span className="num text-xl">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-dim">{sectorTitles[p.sector]}</p>
                <h3 className="h-card transition-colors group-hover:text-gold-2">{p.title}</h3>
              </div>
              <div>
                <p className="text-[15px] leading-7 text-muted">{p.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-dim">
                  Seeking: <span className="text-[#cfc6b7]">{p.seeking.join(' · ')}</span>
                </p>
              </div>
              <div className="flex items-center gap-8 md:flex-col md:items-end">
                <StageTag stage={p.stage} />
                <span className="text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="py-16 text-muted">No public projects in this field yet. Ask us about confidential work.</p>}
    </>
  )
}
