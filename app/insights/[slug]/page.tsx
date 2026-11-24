import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getInsight, insights } from '@/content/insights'
import { site } from '@/content/site'
import { img } from '@/content/images'
import { SocialButtons } from '@/components/icons'

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
    <article>
      <header className="on-dark bg-navy-900 text-white">
        <div className="wrap max-w-[880px] py-14 md:py-20">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
            <ArrowLeft size={16} aria-hidden /> All insights
          </Link>
          <p className="mt-8 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-sky-300">{a.category}</p>
          <h1 className="h1 mt-5 !text-[clamp(2rem,4.6vw,3.4rem)]">{a.title}</h1>
          <p className="lead mt-5">{a.excerpt}</p>
          <div className="mt-8 flex items-center gap-3">
            <Image src={img.portrait.src} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover object-top" />
            <div className="text-sm leading-tight">
              <p className="font-semibold">{site.founder}</p>
              <p className="text-white/70">{fmtDate(a.date)}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white pb-24">
        {a.cover && (
          <div className="wrap max-w-[1000px] pt-12">
            <Image src={a.cover.src} alt={a.cover.alt} width={a.cover.w} height={a.cover.h} priority sizes="(min-width:1000px) 1000px, 100vw" className="w-full rounded-xl" />
          </div>
        )}
        <div className="prose-article wrap mt-12 max-w-[760px]">
          {a.body.map((para, i) => (para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>))}
          <div className="mt-14 flex flex-col gap-5 rounded-xl bg-soft p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">Enjoyed this? Follow for more.</p>
            <SocialButtons />
          </div>
        </div>
      </div>
    </article>
  )
}
