'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Coins, FileSignature, FlaskConical, Globe2, Handshake, Layers, PhoneCall, Rocket, Scale, Search, ShieldCheck, Factory } from 'lucide-react'
import { projects } from '@/content/projects'
import { sectors } from '@/content/site'
import { img, projectImg } from '@/content/images'
import { projectsAr, sectorsAr } from '@/content/i18n'
import { Button, CtaBand, PageHero, Section, SectionHeader, StageBadge } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { useLang } from '@/components/LanguageProvider'

const why = [
  { Icon: Rocket, t: 'Early access', tAr: 'وصول مبكر', b: 'Enter at the idea and research stage, where the upside is greatest.', bAr: 'ادخل في مرحلة الفكرة والبحث، حيث تكون فرص العائد هي الأكبر.' },
  { Icon: Layers, t: 'Diversified pipeline', tAr: 'محفظة مشاريع متنوعة', b: 'Several projects across five growing sectors, not a single bet.', bAr: 'عدة مشاريع عبر خمسة قطاعات نامية، لا رهان واحد فقط.' },
  { Icon: ShieldCheck, t: 'IP first', tAr: 'الملكية الفكرية أولاً', b: 'Inventions are protected before they are commercialised.', bAr: 'تُحمى الاختراعات قبل تسويقها تجارياً.' },
  { Icon: Globe2, t: 'Global markets', tAr: 'أسواق عالمية', b: 'Designed for Jordan, the wider region and international scale.', bAr: 'مصممة للأردن والمنطقة الأوسع والتوسع الدولي.' },
]

const models = [
  { Icon: Coins, t: 'Equity investment', tAr: 'استثمار بالأسهم', b: 'Take a stake in a project or venture and grow with it.', bAr: 'احصل على حصة في مشروع أو شركة ناشئة وانمُ معها.' },
  { Icon: Scale, t: 'Licensing', tAr: 'الترخيص', b: 'License a technology or product for your market or industry.', bAr: 'رخّص تقنية أو منتجاً لسوقك أو قطاعك.' },
  { Icon: Handshake, t: 'Joint ventures', tAr: 'مشاريع مشتركة', b: 'Build a dedicated company together around a specific opportunity.', bAr: 'ابنِ معنا شركة مخصصة حول فرصة محددة.' },
  { Icon: FlaskConical, t: 'Co-development', tAr: 'التطوير المشترك', b: 'Combine our ideas with your engineering, data or research capacity.', bAr: 'اجمع أفكارنا مع قدراتك الهندسية أو البحثية أو في البيانات.' },
  { Icon: Factory, t: 'Manufacturing partnership', tAr: 'شراكة تصنيع', b: 'Produce our products at scale with shared upside.', bAr: 'أنتج منتجاتنا على نطاق واسع مع مشاركة العوائد.' },
  { Icon: Building2, t: 'Regional distribution', tAr: 'توزيع إقليمي', b: 'Take a product to market in your territory.', bAr: 'انقل منتجاً إلى السوق في منطقتك.' },
]

const steps = [
  { Icon: PhoneCall, t: 'Intro call', tAr: 'مكالمة تعارفية', b: 'We learn your focus, sectors and the involvement you want.', bAr: 'نتعرّف على تركيزك وقطاعاتك ومستوى المشاركة الذي ترغب به.' },
  { Icon: FileSignature, t: 'Mutual NDA', tAr: 'اتفاقية سرية متبادلة', b: 'Both sides are protected before any detail is shared.', bAr: 'يُحمى الطرفان قبل مشاركة أي تفاصيل.' },
  { Icon: Search, t: 'Deep dive', tAr: 'دراسة متعمقة', b: 'Technical, commercial and financial review of relevant projects.', bAr: 'مراجعة تقنية وتجارية ومالية للمشاريع ذات الصلة.' },
  { Icon: Handshake, t: 'Agreement', tAr: 'الاتفاق', b: 'We structure the deal and get to work.', bAr: 'نصوغ هيكل الصفقة ونبدأ العمل.' },
]

export function InvestmentContent() {
  const { isAr } = useLang()
  const sectorShort = Object.fromEntries(sectors.map((s) => [s.key, s.short]))

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'الأعمال والاستثمار' : 'Business & Investment'}
        title={
          isAr ? (
            <>الاستثمار في <span className="sun-text">القادم.</span></>
          ) : (
            <>Investing in <span className="sun-text">what comes next.</span></>
          )
        }
        intro={
          isAr
            ? 'فرص للاستثمار أو الترخيص أو التطوير المشترك لمشاريع في الطاقة النظيفة والذكاء الاصطناعي والصحة.'
            : 'Opportunities to invest in, license or co-develop ventures across clean energy, artificial intelligence and health.'
        }
        image={img.windSunset}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact?topic=investment">{isAr ? 'احجز مكالمة تعارفية' : 'Book an intro call'}</Button>
          <Button href="#opportunities" kind="outline" arrow={false}>{isAr ? 'عرض الفرص' : 'View opportunities'}</Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeader eyebrow={isAr ? 'لماذا SEEH' : 'Why SEEH'} title={isAr ? 'مسار مشاريع متكامل، لا رهان واحد' : 'A pipeline, not a single bet'} center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal key={t} delay={i * 80} className="card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-orange-600">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{isAr ? tAr : t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-body">{isAr ? bAr : b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="opportunities">
        <SectionHeader
          eyebrow={isAr ? 'متاح الآن' : 'Open now'}
          title={isAr ? 'الفرص الحالية' : 'Current opportunities'}
          intro={isAr ? 'اختر مشروعاً للاطلاع على نظرة عامة، أو اطلب إحاطة سرية.' : 'Select a project for a high-level overview, or request a confidential briefing.'}
        />
        <div className="space-y-4">
          {projects.map((p) => {
            const im = projectImg(p.slug, p.sector)
            const ar = projectsAr[p.slug]
            return (
              <Reveal key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="card group grid items-center gap-5 overflow-hidden p-4 sm:grid-cols-[160px_1fr_auto] sm:gap-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-[4/3]">
                    <Image src={im.src} alt={im.alt} fill sizes="160px" className="card-img object-cover" />
                  </div>
                  <div className="px-2 sm:px-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-brand">{isAr ? sectorsAr[p.sector].short : sectorShort[p.sector]}</span>
                      <StageBadge stage={p.stage} />
                    </div>
                    <h3 className="h3 mt-2">{isAr && ar ? ar.title : p.title}</h3>
                    <p className="mt-1 text-[15px] text-body">
                      {isAr ? 'المطلوب: ' : 'Seeking: '}
                      <span className="font-medium text-ink">{(isAr && ar ? ar.seeking : p.seeking).join(' · ')}</span>
                    </p>
                  </div>
                  <span className="mx-2 mb-2 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white sm:m-0 sm:me-3">
                    <ArrowRight size={18} className="rtl-flip" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={isAr ? 'طرق التعاون' : 'Ways to engage'} title={isAr ? 'نماذج مشاركة مرنة' : 'Flexible engagement models'} center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="card hoverable flex gap-5 p-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand">
                <Icon size={22} aria-hidden />
              </span>
              <div>
                <h3 className="h3">{isAr ? tAr : t}</h3>
                <p className="mt-1.5 text-[15.5px] leading-7 text-body">{isAr ? bAr : b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={isAr ? 'آلية العمل' : 'Process'} title={isAr ? 'كيف تسير محادثة الاستثمار' : 'How an investment conversation works'} center />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal as="li" key={t} delay={i * 80} className="card p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-amber-50 text-amber-600">
                  <Icon size={22} aria-hidden />
                </span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-navy-900/15">0{i + 1}</span>
              </div>
              <h3 className="h3 mt-6">{isAr ? tAr : t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-body">{isAr ? bAr : b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        image={img.city}
        title={
          isAr ? (
            <>مستعد لاستكشاف <span className="sun-text">فرصة؟</span></>
          ) : (
            <>Ready to explore <span className="sun-text">an opportunity?</span></>
          )
        }
        intro={isAr ? 'أخبرنا بتركيزك وسنربطك بأكثر المشاريع ملاءمة لك.' : 'Tell us your focus and we’ll match you with the most relevant projects.'}
        primary={{ href: '/contact?topic=investment', label: isAr ? 'تواصل معنا' : 'Contact us' }}
        secondary={{ href: '/projects', label: isAr ? 'جميع المشاريع' : 'All projects' }}
      />
    </>
  )
}
