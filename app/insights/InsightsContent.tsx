'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { insights } from '@/content/insights'
import { img } from '@/content/images'
import { insightsAr } from '@/content/i18n'
import { PageHero, Section } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SocialButtons } from '@/components/icons'
import { useLang } from '@/components/LanguageProvider'

const fmtDate = (d: string, isAr: boolean) =>
  new Date(d).toLocaleDateString(isAr ? 'ar-JO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function InsightsContent() {
  const { isAr } = useLang()
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'الأخبار والرؤى' : 'News & Insights'}
        title={
          isAr ? (
            <>أفكار <span className="sun-text">بصوت مسموع.</span></>
          ) : (
            <>Ideas, <span className="sun-text">out loud.</span></>
          )
        }
        intro={
          isAr
            ? 'مقالات ووجهات نظر حول الطاقة النظيفة والذكاء الاصطناعي والصحة واقتصاديات الابتكار.'
            : 'Articles and perspectives on clean energy, artificial intelligence, health and the business of innovation.'
        }
        image={img.ai}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {sorted.map((a, i) => {
            const cover = a.cover ?? img.city
            const ar = insightsAr[a.slug]
            return (
              <Reveal key={a.slug} delay={i * 100}>
                <Link href={`/insights/${a.slug}`} className="card group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={cover.src} alt={isAr && ar?.coverAlt ? ar.coverAlt : cover.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="card-img object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-brand">{isAr && ar ? ar.category : a.category}</span>
                      <span className="text-body">{fmtDate(a.date, isAr)}</span>
                    </div>
                    <h2 className="h3 mt-4 !text-[1.45rem]">{isAr && ar ? ar.title : a.title}</h2>
                    <p className="mt-3 flex-1 leading-7 text-body">{isAr && ar ? ar.excerpt : a.excerpt}</p>
                    <span className="link mt-6">
                      {isAr ? 'اقرأ المقال' : 'Read article'} <ArrowRight size={16} strokeWidth={2.4} className="rtl-flip" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <div className="card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="h3 !text-[1.5rem]">{isAr ? 'تابع د. حيدر للمزيد' : 'Follow Dr. Haider for more'}</h2>
            <p className="mt-2 text-body">{isAr ? 'منشورات منتظمة حول الطاقة والتكنولوجيا والابتكار.' : 'Regular posts on energy, technology and innovation.'}</p>
          </div>
          <SocialButtons withLabel />
        </div>
      </Section>
    </>
  )
}
