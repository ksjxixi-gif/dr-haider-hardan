'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FileLock2, Lock, Layers } from 'lucide-react'
import { process, sectors } from '@/content/site'
import { img, sectorImg } from '@/content/images'
import { processAr, sectorsAr } from '@/content/i18n'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SectorIcon } from '@/components/SectorIcon'
import { useLang } from '@/components/LanguageProvider'

const stageDetail = [
  'Every project starts with a real, unmet need or an angle the market has overlooked. We capture ideas broadly and filter them hard.',
  'We study the market, the technology and existing patents to understand what has been tried, what is protected and where the real gap is.',
  'Feasibility, cost, risk and commercial potential are scored honestly. Ideas that do not pass are parked, not forced.',
  'Concepts become prototypes, working with engineers, scientists and specialists. We test, learn and iterate quickly.',
  'Industrial partners join early, so products are designed for manufacturing, cost and scale from the start.',
  'Products reach the market through direct launch, licensing or joint ventures, whichever creates the most value.',
]

const stageDetailAr = [
  'يبدأ كل مشروع باحتياج حقيقي غير ملبى أو زاوية أغفلها السوق. نلتقط الأفكار على نطاق واسع ونغربلها بصرامة.',
  'ندرس السوق والتقنية وبراءات الاختراع القائمة لفهم ما جُرّب، وما هو محمي، وأين تكمن الفجوة الحقيقية.',
  'نقيّم الجدوى والتكلفة والمخاطر والإمكانات التجارية بصدق. الأفكار التي لا تجتاز التقييم تُركن جانباً ولا تُفرض قسراً.',
  'تتحول المفاهيم إلى نماذج أولية بالتعاون مع مهندسين وعلماء ومختصين. نختبر ونتعلم ونطوّر بسرعة.',
  'ينضم الشركاء الصناعيون مبكراً، فتُصمم المنتجات للتصنيع والتكلفة والتوسع منذ البداية.',
  'تصل المنتجات إلى السوق عبر الإطلاق المباشر أو الترخيص أو المشاريع المشتركة، أيهما يحقق القيمة الأعلى.',
]

const ipPillars = [
  {
    Icon: FileLock2,
    t: 'Protect first',
    tAr: 'الحماية أولاً',
    b: 'Inventions are documented and protection is pursued before detailed disclosure.',
    bAr: 'تُوثّق الاختراعات وتُباشر إجراءات الحماية قبل أي إفصاح تفصيلي.',
  },
  {
    Icon: Lock,
    t: 'NDA-first sharing',
    tAr: 'المشاركة بعد السرية',
    b: 'Technical details, data and designs are shared under a mutual non-disclosure agreement.',
    bAr: 'تُشارك التفاصيل التقنية والبيانات والتصاميم بموجب اتفاقية عدم إفصاح متبادلة.',
  },
  {
    Icon: Layers,
    t: 'Staged disclosure',
    tAr: 'إفصاح مرحلي',
    b: 'Information is opened up as trust and commitment grow on both sides.',
    bAr: 'تُفتح المعلومات تدريجياً مع نمو الثقة والالتزام بين الطرفين.',
  },
]

export function InnovationContent() {
  const { isAr } = useLang()

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'الابتكار والبحث والتطوير' : 'Innovation & R&D'}
        title={
          isAr ? (
            <>من الفكرة <span className="sun-text">إلى الصناعة.</span></>
          ) : (
            <>From idea <span className="sun-text">to industry.</span></>
          )
        }
        intro={
          isAr
            ? 'منهجية منضبطة تحوّل الأفكار غير التقليدية إلى حلول محمية وقابلة للتصنيع والتسويق.'
            : 'A disciplined process that turns unconventional ideas into protected, manufacturable and marketable solutions.'
        }
        image={img.engineerLab}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow={isAr ? 'منهجيتنا' : 'Our process'}
              title={isAr ? 'ست مراحل. بلا اختصارات.' : 'Six stages. No shortcuts.'}
              intro={
                isAr
                  ? 'يمر كل مشروع بالبوابات نفسها، ليعرف الشركاء دائماً أين يقف وما الخطوة التالية.'
                  : 'Every project moves through the same gates, so partners always know where it stands and what comes next.'
              }
            />
            <div className="relative -mt-4 hidden aspect-[4/3] overflow-hidden rounded-xl lg:block">
              <Image src={img.inventor.src} alt={img.inventor.alt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <ol className="relative space-y-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className="card flex gap-5 p-6 md:p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 font-[family-name:var(--font-display)] font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="h3">{isAr ? processAr[i].title : s.title}</h3>
                  <p className="mt-2 leading-7 text-body">{isAr ? stageDetailAr[i] : stageDetail[i]}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={isAr ? 'اتجاهات البحث' : 'Research directions'}
          title={isAr ? 'أين تتركز أبحاثنا وتطويرنا' : 'Where our R&D is focused'}
          center
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => {
            const ar = sectorsAr[s.key]
            return (
              <Reveal key={s.key} delay={(i % 3) * 80}>
                <article className="card group h-full overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={sectorImg[s.key].src} alt={sectorImg[s.key].alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="card-img object-cover" />
                  </div>
                  <div className="p-6">
                    <SectorIcon sector={s.key} className="-mt-12 mb-4 border-4 border-white" />
                    <h3 className="h3">{isAr ? ar.title : s.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-7 text-body">{isAr ? ar.body : s.body}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
          <Reveal className="card flex flex-col justify-center p-8">
            <h3 className="h3">{isAr ? 'مؤسسة بحثية أو جامعة؟' : 'Research institution or university?'}</h3>
            <p className="mt-3 leading-7 text-body">
              {isAr
                ? 'نتعاون في الأبحاث التطبيقية والتحقق العلمي والتطوير المشترك.'
                : 'We collaborate on applied research, validation and joint development.'}
            </p>
            <Link href="/contact?topic=research" className="btn btn-primary mt-6 self-start">
              {isAr ? 'اقترح تعاوناً' : 'Propose a collaboration'}
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={isAr ? 'الملكية الفكرية' : 'Intellectual property'}
          title={isAr ? 'حماية ما نبنيه' : 'Protecting what we build'}
          intro={
            isAr
              ? 'تُعرض الأفكار علناً على مستوى عام فقط، وتُفتح التفاصيل التقنية للشركاء المؤهلين خطوة بخطوة.'
              : 'Ideas are shared publicly at a high level only. Technical depth is opened up to qualified partners, step by step.'
          }
          center
        />
        <div className="grid gap-6 md:grid-cols-3">
          {ipPillars.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal key={t} delay={i * 90} className="card p-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-amber-50 text-amber-600">
                <Icon size={26} aria-hidden />
              </span>
              <h3 className="h3 mt-5">{isAr ? tAr : t}</h3>
              <p className="mt-2 leading-7 text-body">{isAr ? bAr : b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.lab}
        title={
          isAr ? (
            <>لديك فكرة تستحق <span className="sun-text">التطوير؟</span></>
          ) : (
            <>Have an idea worth <span className="sun-text">developing?</span></>
          )
        }
        intro={
          isAr
            ? 'نعمل مع المخترعين والباحثين والشركات لنقل الأفكار من المفهوم إلى السوق.'
            : 'We work with inventors, researchers and companies to take ideas from concept to market.'
        }
        primary={{ href: '/contact', label: isAr ? 'تحدث معنا' : 'Talk to us' }}
        secondary={{ href: '/projects', label: isAr ? 'عرض المشاريع' : 'View projects' }}
      />
    </>
  )
}
