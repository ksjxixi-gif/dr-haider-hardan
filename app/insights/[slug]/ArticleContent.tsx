'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Insight } from '@/content/insights'
import { site } from '@/content/site'
import { img } from '@/content/images'
import { insightsAr, siteAr } from '@/content/i18n'
import { SocialButtons } from '@/components/icons'
import { useLang } from '@/components/LanguageProvider'

const fmtDate = (d: string, isAr: boolean) =>
  new Date(d).toLocaleDateString(isAr ? 'ar-JO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function ArticleContent({ article: a }: { article: Insight }) {
  const { isAr } = useLang()
  const ar = insightsAr[a.slug]

  const category = isAr && ar ? ar.category : a.category
  const title = isAr && ar ? ar.title : a.title
  const excerpt = isAr && ar ? ar.excerpt : a.excerpt
  const body = isAr && ar ? ar.body : a.body
  const coverAlt = isAr && ar?.coverAlt ? ar.coverAlt : (a.cover?.alt ?? '')

  return (
    <article>
      <header className="border-b border-line bg-white text-ink">
        <div className="wrap max-w-[880px] py-14 md:py-20">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-ink">
            <ArrowLeft size={16} className="rtl-flip" aria-hidden /> {isAr ? 'جميع المقالات' : 'All insights'}
          </Link>
          <p className="mt-8 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-brand">{category}</p>
          <h1 className="h1 mt-5 !text-[clamp(2rem,4.6vw,3.4rem)]">{title}</h1>
          <p className="lead mt-5">{excerpt}</p>
          <div className="mt-8 flex items-center gap-3">
            <Image src={img.portrait.src} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover object-top" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-ink">{isAr ? siteAr.founder : site.founder}</p>
              <p className="text-body">{fmtDate(a.date, isAr)}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white pb-24">
        {a.cover && (
          <div className="wrap max-w-[1000px] pt-12">
            <Image src={a.cover.src} alt={coverAlt} width={a.cover.w} height={a.cover.h} priority sizes="(min-width:1000px) 1000px, 100vw" className="w-full rounded-xl" />
          </div>
        )}
        <div className="prose-article wrap mt-12 max-w-[760px]">
          {body.map((para, i) => (para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>))}
          <div className="mt-14 flex flex-col gap-5 rounded-xl border border-line bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-ink">{isAr ? 'أعجبك المقال؟ تابعنا للمزيد.' : 'Enjoyed this? Follow for more.'}</p>
            <SocialButtons />
          </div>
        </div>
      </div>
    </article>
  )
}
