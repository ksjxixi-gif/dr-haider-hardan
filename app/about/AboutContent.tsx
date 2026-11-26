'use client'

import Image from 'next/image'
import { Compass, Eye, Handshake, Lightbulb, Microscope, ShieldCheck, Target } from 'lucide-react'
import { gallery, site } from '@/content/site'
import { img } from '@/content/images'
import { photoCaptionsAr, siteAr } from '@/content/i18n'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SocialButtons } from '@/components/icons'
import { useLang } from '@/components/LanguageProvider'

const values = [
  {
    Icon: Lightbulb,
    t: 'Unconventional thinking',
    tAr: 'تفكير غير تقليدي',
    b: 'We look for the angle others miss and question assumptions before accepting them.',
    bAr: 'نبحث عن الزاوية التي يغفل عنها الآخرون ونختبر الافتراضات قبل قبولها.',
  },
  {
    Icon: Microscope,
    t: 'Evidence over hype',
    tAr: 'الدليل قبل الضجيج',
    b: 'Curiosity starts the work; careful research and measurement decide what moves forward.',
    bAr: 'الفضول يبدأ العمل، والبحث الدقيق والقياس يقرران ما يستمر.',
  },
  {
    Icon: ShieldCheck,
    t: 'Respect for ideas',
    tAr: 'احترام الأفكار',
    b: 'Intellectual property is protected, and confidential information stays confidential.',
    bAr: 'الملكية الفكرية محمية، والمعلومات السرية تبقى سرية.',
  },
  {
    Icon: Handshake,
    t: 'Long-term partnership',
    tAr: 'شراكات طويلة الأمد',
    b: 'We build relationships meant to last beyond a single deal or product.',
    bAr: 'نبني علاقات مصممة لتدوم لما هو أبعد من صفقة واحدة أو منتج واحد.',
  },
]

const pillars = [
  {
    Icon: Target,
    t: 'Mission',
    tAr: 'المهمة',
    b: 'Turn promising ideas into products and ventures with real economic value and international growth potential.',
    bAr: 'تحويل الأفكار الواعدة إلى منتجات ومشاريع ذات قيمة اقتصادية حقيقية وإمكانات نمو دولية.',
  },
  {
    Icon: Eye,
    t: 'Vision',
    tAr: 'الرؤية',
    b: 'A future where clean energy, smart technology and healthy living are accessible, affordable and sustainable.',
    bAr: 'مستقبل تكون فيه الطاقة النظيفة والتكنولوجيا الذكية والحياة الصحية متاحة وميسورة ومستدامة.',
  },
  {
    Icon: Compass,
    t: 'Approach',
    tAr: 'المنهجية',
    b: 'Create new markets instead of competing in saturated ones, through partnership, IP protection and disciplined execution.',
    bAr: 'ابتكار أسواق جديدة بدلاً من المنافسة في أسواق مشبعة، عبر الشراكات وحماية الملكية الفكرية والتنفيذ المنضبط.',
  },
]

export function AboutContent() {
  const { isAr } = useLang()

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'عن الشركة' : 'About'}
        title={
          isAr ? (
            <>رائد أعمال ومخترع يبني <span className="sun-text">القادم.</span></>
          ) : (
            <>An entrepreneur and inventor building <span className="sun-text">what’s next.</span></>
          )
        }
        intro={
          isAr
            ? 'د. حيدر ن. حردان هو مؤسس شركة SEEH، وهي شركة مقرها الأردن تحوّل الأفكار غير التقليدية إلى منتجات ومشاريع ذات قيمة تجارية حقيقية.'
            : 'Dr. Haider N. Hardan is the founder of SEEH, a Jordan-based company that turns unconventional ideas into products and ventures with real commercial value.'
        }
        image={img.city}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[460px]">
            <div className="relative">
              <Image src={img.portrait.src} alt={img.portrait.alt} width={440} height={680} priority sizes="(min-width:1024px) 460px, 90vw" className="relative aspect-[4/5] w-full rounded-xl object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">{isAr ? 'المؤسس' : 'The founder'}</p>
            <h2 className="h2 mt-4">{isAr ? siteAr.founder : site.founder}</h2>
            <p className="mt-2 font-medium text-brand">
              {isAr ? 'رائد أعمال · مخترع · مبتكر' : 'Entrepreneur · Inventor · Innovator'}
            </p>
            <div className="mt-6 space-y-4 text-[17px] leading-8 text-body">
              {isAr ? (
                <>
                  <p>
                    بدأ طريق حيدر نحو الابتكار في الرعاية الصحية. بعد تدريبه كجرّاح أسنان (B.D.S.) وعمله في العيادة الخاصة في عمّان، طوّر أول اختراع له مباشرة من قلب المشكلات السريرية: نظام بالون مطاطي لحشو قنوات الجذور مع جهاز حقن خاص به، وقدّمه في مؤتمر علمي.
                  </p>
                  <p>
                    شكّلت تلك التجربة طريقته في العمل حتى اليوم؛ إذ يلاحظ المشكلة التي يتقبلها الآخرون، ويتصور حلاً غير تقليدي، ويختبره بصدق، ويحمي الفكرة قبل نقلها إلى السوق.
                  </p>
                  <p>
                    يمتد عمله اليوم ليشمل الطاقة النظيفة والمتجددة، والذكاء الاصطناعي، والتغذية الصحية، وتطوير المنتجات الجديدة. ومن خلال SEEH يركّز على الأفكار ذات الإمكانات التجارية والاستثمارية الحقيقية، وعلى الشراكات اللازمة لتصنيعها وتوسيعها.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Haider’s path to innovation began in healthcare. Trained as a dental surgeon (B.D.S.) and working in private practice in
                    Amman, he developed his first invention directly from clinical problems: a rubber balloon system for endodontic
                    obturation with its own injection device, which he presented at a scientific conference.
                  </p>
                  <p>
                    That experience shaped how he works to this day. He notices the problem others accept, imagines an unconventional
                    solution, tests it honestly, and protects the idea before taking it to market.
                  </p>
                  <p>
                    Today his work spans clean and renewable energy, artificial intelligence, healthy nutrition and new product development.
                    Through SEEH he focuses on ideas with real commercial and investment potential, and on the partnerships needed to
                    manufacture and scale them.
                  </p>
                </>
              )}
            </div>
            <div className="mt-8">
              <SocialButtons withLabel />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={isAr ? 'الشركة' : 'The company'}
          title={isAr ? siteAr.fullName : 'SEEH: Sustainability, Entrepreneurship, Energy & Health'}
          intro={
            isAr
              ? 'شركة تجمع ريادة الأعمال والابتكار وتطوير المنتجات والاستثمار التجاري تحت سقف واحد.'
              : 'A company that brings entrepreneurship, innovation, product development and commercial investment together under one roof.'
          }
          center
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal key={t} delay={i * 90} className="card p-8">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-orange-600">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-6">{isAr ? tAr : t}</h3>
              <p className="mt-3 leading-7 text-body">{isAr ? bAr : b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="moments">
        <SectionHeader
          eyebrow={isAr ? 'محطات' : 'Moments'}
          title={isAr ? 'المؤتمرات والمصانع والشركاء العالميون' : 'Conferences, factories and global partners'}
          intro={
            isAr
              ? 'التحدث وعرض الاختراعات ولقاء المصنّعين: الأماكن التي تُختبر فيها الأفكار وتتطور.'
              : 'Speaking, presenting inventions and meeting manufacturers: the places where ideas get challenged and improved.'
          }
        />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((g, i) => {
            const ar = photoCaptionsAr[g.src]
            return (
              <Reveal key={g.src} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
                <figure className="card group overflow-hidden">
                  <div className="overflow-hidden">
                    <Image
                      src={g.src}
                      alt={isAr && ar ? ar.alt : g.alt}
                      width={g.w}
                      height={g.h}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className={`card-img w-full object-cover ${g.h > g.w ? 'aspect-[4/5] object-[center_20%]' : ''}`}
                    />
                  </div>
                  <figcaption className="p-5 text-[15px] leading-6 text-body">{isAr && ar ? ar.caption : g.caption}</figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={isAr ? 'قيمنا' : 'What we stand for'} title={isAr ? 'مبادئنا' : 'Our values'} center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, tAr, b, bAr }, i) => (
            <Reveal key={t} delay={i * 80} className="card p-7">
              <Icon size={28} className="text-brand" aria-hidden />
              <h3 className="h3 mt-5">{isAr ? tAr : t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-body">{isAr ? bAr : b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.solarField}
        title={
          isAr ? (
            <>لنبنِ القادم <span className="sun-text">معاً.</span></>
          ) : (
            <>Let’s build what’s next, <span className="sun-text">together.</span></>
          )
        }
        intro={
          isAr
            ? 'سواء كنت تستثمر أو تصنّع أو تجري أبحاثاً أو تبني تكنولوجيا، فهناك مكان لك هنا.'
            : 'Whether you invest, manufacture, research or build technology, there’s a place for you here.'
        }
        primary={{ href: '/contact', label: isAr ? 'تواصل معنا' : 'Get in touch' }}
        secondary={{ href: '/partnerships', label: isAr ? 'الشراكات' : 'Partnerships' }}
      />
    </>
  )
}
