import type { Metadata } from 'next'
import Image from 'next/image'
import { Compass, Eye, Handshake, Lightbulb, Microscope, ShieldCheck, Target } from 'lucide-react'
import { gallery, site } from '@/content/site'
import { img } from '@/content/images'
import { CtaBand, PageHero, Section, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SocialButtons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'About',
  description: 'Dr. Haider N. Hardan: entrepreneur, inventor and founder of SEEH, Sustainability for Energy & Health.',
}

const values = [
  { Icon: Lightbulb, t: 'Unconventional thinking', b: 'We look for the angle others miss and question assumptions before accepting them.' },
  { Icon: Microscope, t: 'Evidence over hype', b: 'Curiosity starts the work; careful research and measurement decide what moves forward.' },
  { Icon: ShieldCheck, t: 'Respect for ideas', b: 'Intellectual property is protected, and confidential information stays confidential.' },
  { Icon: Handshake, t: 'Long-term partnership', b: 'We build relationships meant to last beyond a single deal or product.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>An entrepreneur and inventor building <span className="sun-text">what’s next.</span></>}
        intro="Dr. Haider N. Hardan is the founder of SEEH, a Jordan-based company that turns unconventional ideas into products and ventures with real commercial value."
        image={img.city}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[460px]">
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 -z-0 rounded-[32px] bg-gradient-to-br from-amber-300 via-orange-300 to-sky-400 opacity-60 blur-2xl" />
              <Image src={img.portrait.src} alt={img.portrait.alt} width={440} height={680} priority sizes="(min-width:1024px) 460px, 90vw" className="relative aspect-[4/5] w-full rounded-[28px] object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The founder</p>
            <h2 className="h2 mt-4">{site.founder}</h2>
            <p className="mt-2 font-medium text-brand">Entrepreneur · Inventor · Innovator</p>
            <div className="mt-6 space-y-4 text-[17px] leading-8 text-body">
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
            </div>
            <div className="mt-8">
              <SocialButtons withLabel />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeader
          eyebrow="The company"
          title="SEEH: Sustainability for Energy & Health"
          intro="A company that brings entrepreneurship, innovation, product development and commercial investment together under one roof."
          center
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Target, t: 'Mission', b: 'Turn promising ideas into products and ventures with real economic value and international growth potential.' },
            { Icon: Eye, t: 'Vision', b: 'A future where clean energy, smart technology and healthy living are accessible, affordable and sustainable.' },
            { Icon: Compass, t: 'Approach', b: 'Create new markets instead of competing in saturated ones, through partnership, IP protection and disciplined execution.' },
          ].map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 90} className="card p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="h3 mt-6">{t}</h3>
              <p className="mt-3 leading-7 text-body">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="moments">
        <SectionHeader
          eyebrow="Moments"
          title="Conferences, factories and global partners"
          intro="Speaking, presenting inventions and meeting manufacturers: the places where ideas get challenged and improved."
        />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
              <figure className="card group overflow-hidden">
                <div className="overflow-hidden">
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className={`card-img w-full object-cover ${g.h > g.w ? 'aspect-[4/5] object-[center_20%]' : ''}`} />
                </div>
                <figcaption className="p-5 text-[15px] leading-6 text-body">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeader eyebrow="What we stand for" title="Our values" center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 80} className="card p-7">
              <Icon size={28} className="text-brand" aria-hidden />
              <h3 className="h3 mt-5">{t}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-body">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.solarField}
        title={<>Let’s build what’s next, <span className="sun-text">together.</span></>}
        intro="Whether you invest, manufacture, research or build technology, there’s a place for you here."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/partnerships', label: 'Partnerships' }}
      />
    </>
  )
}
