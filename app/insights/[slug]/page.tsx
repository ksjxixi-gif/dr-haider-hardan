import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInsight, insights } from '@/content/insights'
import { site } from '@/content/site'
import { ArrowLink } from '@/components/ui'

export const dynamicParams = false
export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: PageProps<'/insights/[slug]'>): Promise<Metadata> {
  const a = getInsight((await params).slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { type: 'article', title: a.title, description: a.excerpt, images: a.cover ? [{ url: a.cover.src }] : undefined },
  }
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function Article({ params }: PageProps<'/insights/[slug]'>) {
  const a = getInsight((await params).slug)
  if (!a) notFound()

  return (
    <article className="pb-28">
      <header className="wrap max-w-[920px] pt-14 pb-14 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-12 text-xs uppercase tracking-[0.2em] text-dim">
          <Link href="/insights" className="hover:text-gold">Insights</Link> <span className="mx-2">/</span> {a.category}
        </nav>
        <h1 className="display !text-[clamp(2.4rem,5.5vw,4.8rem)]">{a.title}</h1>
        <p className="lead mt-8">{a.excerpt}</p>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-dim">
          {site.founder} · {fmtDate(a.date)}
        </p>
      </header>

      {a.cover && (
        <div className="wrap max-w-[1100px]">
          <Image src={a.cover.src} alt={a.cover.alt} width={a.cover.w} height={a.cover.h} priority sizes="(min-width:1100px) 1100px, 100vw" className="w-full" />
        </div>
      )}

      <div className="prose-article wrap mt-16 max-w-[760px]">
        {a.body.map((para, i) => (para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>))}
        <div className="mt-16 border-t rule pt-10">
          <ArrowLink href="/insights">All insights</ArrowLink>
        </div>
      </div>
    </article>
  )
}
