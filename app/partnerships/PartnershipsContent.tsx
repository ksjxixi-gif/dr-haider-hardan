'use client'

import Image from 'next/image'
import { Building2, Check, Coins, Cpu, Factory, GraduationCap, Microscope } from 'lucide-react'
import { photo as sitePhoto } from '@/content/site'
import { img } from '@/content/images'
import { photoCaptionsAr } from '@/content/i18n'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { useLang } from '@/components/LanguageProvider'

const partners = [
  {
    Icon: Building2,
    t: 'Industrial companies',
    tAr: 'الشركات الصناعية',
    bring: 'Production capability and market access',
    bringAr: 'قدرات الإنتاج والوصول إلى الأسواق',
    get: 'New products and technologies for your portfolio',
    getAr: 'منتجات وتقنيات جديدة لمحفظتك',
  },
  {
    Icon: Cpu,
    t: 'Technology companies',
    tAr: 'شركات التكنولوجيا',
    bring: 'Engineering, software and data expertise',
    bringAr: 'خبرات الهندسة والبرمجيات والبيانات',
    get: 'Co-developed IP and new applications',
    getAr: 'ملكية فكرية مطورة بشكل مشترك وتطبيقات جديدة',
  },
  {
    Icon: Microscope,
    t: 'Research centres',
    tAr: 'مراكز الأبحاث',
    bring: 'Laboratories, testing and scientific rigour',
    bringAr: 'المختبرات والاختبار والدقة العلمية',
    get: 'Applied, commercially relevant problems',
    getAr: 'مشكلات تطبيقية ذات جدوى تجارية',
  },
  {
    Icon: GraduationCap,
    t: 'Universities',
    tAr: 'الجامعات',
    bring: 'Researchers and academic validation',
    bringAr: 'الباحثون والتحقق الأكاديمي',
    get: 'Real-world projects and industry links',
    getAr: 'مشاريع واقعية وروابط مع القطاع الصناعي',
  },
  {
    Icon: Coins,
    t: 'Investors',
    tAr: 'المستثمرون',
    bring: 'Capital and strategic guidance',
    bringAr: 'رأس المال والتوجيه الاستراتيجي',
    get: 'Early access to a diversified pipeline',
    getAr: 'وصول مبكر إلى محفظة مشاريع متنوعة',
  },
  {
    Icon: Factory,
    t: 'Manufacturers & distributors',
    tAr: 'المصنّعون والموزعون',
    bring: 'Scale, supply chains and channels',
    bringAr: 'التوسع وسلاسل الإمداد وقنوات التوزيع',
    get: 'Protected products ready for your markets',
    getAr: 'منتجات محمية جاهزة لأسواقك',
  },
]

const models = [
  { en: 'Joint development agreements', ar: 'اتفاقيات التطوير المشترك' },
  { en: 'Technology licensing', ar: 'ترخيص التكنولوجيا' },
  { en: 'Manufacturing & supply partnerships', ar: 'شراكات التصنيع والتوريد' },
  { en: 'Research collaboration & pilots', ar: 'التعاون البحثي والتجارب الميدانية' },
  { en: 'Regional distribution rights', ar: 'حقوق التوزيع الإقليمي' },
]

export function PartnershipsContent() {
  const { isAr } = useLang()
  const photo = sitePhoto.factoryFair
  const photoAr = photoCaptionsAr[photo.src]

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'الشراكات الاستراتيجية' : 'Strategic Partnerships'}
        title={
          isAr ? (
            <>شراكات تحوّل <span className="sun-text">الأفكار إلى صناعات.</span></>
          ) : (
            <>Partnerships that turn <span className="sun-text">ideas into industries.</span></>
          )
        }
        intro={
          isAr
            ? 'نعمل مع الشركات الصناعية وشركات التكنولوجيا ومراكز الأبحاث والجامعات والمستثمرين والمصنّعين لإيصال الأفكار الواعدة إلى السوق.'
            : 'We work with industrial companies, technology firms, research centres, universities, investors and manufacturers to bring promising ideas to market.'
        }
        image={img.earth}
      />

      <Section>
        <SectionHeader
          eyebrow={isAr ? 'مع من نتشارك' : 'Who we partner with'}
          title={isAr ? 'ما تقدمه. وما تحصل عليه.' : 'What you bring. What you get.'}
          center
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map(({ Icon, t, tAr, bring, bringAr, get, getAr }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="card flex flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{isAr ? tAr : t}</h3>
              <dl className="mt-5 grid gap-3 text-[15px]">
                <div className="rounded-xl border border-line bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-body">{isAr ? 'ما تقدمه' : 'You bring'}</dt>
                  <dd className="mt-1 text-ink">{isAr ? bringAr : bring}</dd>
                </div>
                <div className="rounded-xl bg-amber-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-amber-700">{isAr ? 'ما تحصل عليه' : 'You get'}</dt>
                  <dd className="mt-1 text-ink">{isAr ? getAr : get}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{isAr ? 'كيف نتعاون' : 'How we collaborate'}</p>
            <h2 className="h2 mt-4">{isAr ? 'نماذج تناسب أسلوب عملك' : 'Models that fit how you work'}</h2>
            <ul className="mt-8 space-y-3">
              {models.map((m) => (
                <li key={m.en} className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-leaf">
                    <Check size={16} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="font-medium">{isAr ? m.ar : m.en}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl">
            <Image src={photo.src} alt={isAr && photoAr ? photoAr.alt : photo.alt} fill sizes="(min-width:1024px) 450px, 90vw" className="object-cover object-[center_20%]" />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 pt-16 text-[15px] text-white">
              {isAr && photoAr ? photoAr.caption : photo.caption}
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        image={img.solarInstall}
        title={
          isAr ? (
            <>لنستكشف <span className="sun-text">شراكة معاً.</span></>
          ) : (
            <>Let’s explore <span className="sun-text">a partnership.</span></>
          )
        }
        intro={
          isAr
            ? 'أخبرنا عن مؤسستك وما ترغب في بنائه معنا.'
            : 'Tell us about your organisation and what you’d like to build together.'
        }
        primary={{ href: '/contact?topic=partnership', label: isAr ? 'كن شريكاً' : 'Become a partner' }}
        secondary={{ href: '/projects', label: isAr ? 'مشاريعنا' : 'Our projects' }}
      />
    </>
  )
}
