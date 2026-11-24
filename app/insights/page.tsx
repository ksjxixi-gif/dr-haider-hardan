import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { insights } from '@/content/insights'
import { PageHero, Section } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { LinkedInIcon, XIcon } from '@/components/icons'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Articles and perspectives from Dr. Haider N. Hardan on clean energy, AI, health and the business of innovation.',
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Insights() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date))
  const [first, ...rest] = sorted
  return (
    <>
      <PageHero kicker="News & Insights" title={<>Ideas, <em>out loud.</em></>}>
        Articles and perspectives on clean energy, artificial intelligence, health and the business of innovation.
      </PageHero>

      <Section>
        {first && (
          <Reveal>
            <Link href={`/insights/${first.slug}`} className="group grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
              {first.cover && (
                <div className="overflow-hidden">
                  <Image src={first.cover.src} alt={first.cover.alt} width={first.cover.w} height={first.cover.h} sizes="(min-width:1024px) 55vw, 100vw" className="photo aspect-[16/11] w-full object-cover" />
                </div>
              )}
              <div>
                <p className="kicker mb-6">{first.category}</p>
                <h2 className="h-sec transition-colors group-hover:text-gold-2">{first.title}</h2>
                <p className="lead mt-6">{first.excerpt}</p>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-dim">{fmtDate(first.date)}</p>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mt-24 border-t rule">
            {rest.map((a) => (
              <li key={a.slug} className="border-b rule">
                <Link href={`/insights/${a.slug}`} className="row-hover group grid gap-4 py-10 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-10">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">{a.category}</span>
                  <div>
                    <h3 className="h-card transition-colors group-hover:text-gold-2">{a.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-muted">{a.excerpt}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-dim">{fmtDate(a.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <section className="border-t rule py-20">
        <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="h-card max-w-xl">Follow Dr. Haider for more on energy, technology and innovation.</p>
          <div className="flex gap-3">
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-3 border rule px-5 text-sm text-muted hover:border-gold hover:text-gold"><LinkedInIcon /> LinkedIn</a>
            <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-3 border rule px-5 text-sm text-muted hover:border-gold hover:text-gold"><XIcon /> X</a>
          </div>
        </div>
      </section>
    </>
  )
}
