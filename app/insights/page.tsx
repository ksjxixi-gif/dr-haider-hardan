import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { insights } from '@/content/insights'
import { img } from '@/content/images'
import { PageHero, Section } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SocialButtons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Articles and perspectives from Dr. Haider N. Hardan on clean energy, AI, health and the business of innovation.',
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Insights() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title={<>Ideas, <span className="sun-text">out loud.</span></>}
        intro="Articles and perspectives on clean energy, artificial intelligence, health and the business of innovation."
        image={img.ai}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {sorted.map((a, i) => {
            const cover = a.cover ?? img.city
            return (
              <Reveal key={a.slug} delay={i * 100}>
                <Link href={`/insights/${a.slug}`} className="card group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={cover.src} alt={cover.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="card-img object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-brand">{a.category}</span>
                      <span className="text-body">{fmtDate(a.date)}</span>
                    </div>
                    <h2 className="h3 mt-4 !text-[1.45rem]">{a.title}</h2>
                    <p className="mt-3 flex-1 leading-7 text-body">{a.excerpt}</p>
                    <span className="link mt-6">
                      Read article <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section tone="soft">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="h3 !text-[1.5rem]">Follow Dr. Haider for more</h2>
            <p className="mt-2 text-body">Regular posts on energy, technology and innovation.</p>
          </div>
          <SocialButtons withLabel />
        </div>
      </Section>
    </>
  )
}
