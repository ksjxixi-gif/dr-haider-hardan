import type { Metadata } from 'next'
import Image from 'next/image'
import { gallery, site } from '@/content/site'
import { ArrowLink, CtaBand, Section, SectionHead } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { LinkedInIcon, XIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'About',
  description: 'Dr. Haider N. Hardan: entrepreneur, inventor and founder of SEEH, Sustainability for Energy & Health.',
}

const values = [
  ['Unconventional thinking', 'We look for the angle others miss and question assumptions before accepting them.'],
  ['Evidence over hype', 'Curiosity starts the work; careful research and measurement decide what moves forward.'],
  ['Respect for ideas', 'Intellectual property is protected, and confidential information stays confidential.'],
  ['Long-term partnership', 'We build relationships meant to last beyond a single deal or product.'],
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
          <Reveal>
            <p className="kicker mb-8">About</p>
            <h1 className="display">
              An entrepreneur who builds <em>from first principles.</em>
            </h1>
            <p className="lead mt-10 max-w-xl">
              Dr. Haider N. Hardan is an entrepreneur, inventor and the founder of SEEH, a Jordan-based company that turns
              unconventional ideas into products and ventures with real commercial value.
            </p>
            <div className="mt-10 flex gap-3">
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-3 border rule px-5 text-sm text-muted transition-colors hover:border-gold hover:text-gold">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-3 border rule px-5 text-sm text-muted transition-colors hover:border-gold hover:text-gold">
                <XIcon /> @DrHaiderHardan1
              </a>
            </div>
          </Reveal>
          <Reveal delay={150} className="mx-auto w-full max-w-[420px] px-4 lg:px-0">
            <div className="frame-offset">
              <Image src="/images/haider-portrait.webp" alt="Portrait of Dr. Haider N. Hardan" width={440} height={680} priority sizes="(min-width:1024px) 420px, 90vw" className="relative aspect-[440/600] w-full object-cover object-top" />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <SectionHead kicker="The founder" title={<>From the clinic <em>to the lab of ideas.</em></>} className="!mb-0" />
          <Reveal className="space-y-6 text-[17px] font-light leading-8 text-[#cfc7b9]">
            <p>
              Haider’s path to innovation began in healthcare. Trained as a dental surgeon (B.D.S.) and working in private practice in
              Amman, he developed his first invention directly from clinical problems: a rubber balloon system for endodontic
              obturation with its own injection device, which he presented at a scientific conference.
            </p>
            <p>
              That experience shaped a way of working he has applied ever since: notice a problem others accept, imagine an
              unconventional solution, test it honestly, and protect the idea before taking it to market.
            </p>
            <p>
              Today his work spans clean and renewable energy, artificial intelligence, healthy nutrition and new product
              development. Through SEEH he focuses on ideas with real commercial and investment potential, and on the partnerships
              needed to manufacture and scale them in local and international markets.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead kicker="The company" title={<>SEEH: Sustainability for <em>Energy &amp; Health.</em></>}>
          A company that brings entrepreneurship, innovation, product development and commercial investment together under one roof.
        </SectionHead>
        <div className="grid gap-px bg-[rgba(201,169,110,0.2)] md:grid-cols-3">
          {[
            ['Mission', 'Turn promising ideas into products and ventures with real economic value and international growth potential.'],
            ['Vision', 'A future where clean energy, smart technology and healthy living are accessible, affordable and sustainable.'],
            ['Approach', 'Create new markets instead of competing in saturated ones, through partnership, IP protection and disciplined execution.'],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 100} className="bg-ink p-8 md:p-12">
              <span className="num text-xl">0{i + 1}</span>
              <h3 className="h-card mt-10">{t}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="moments">
        <SectionHead kicker="Moments" title={<>Ideas presented, <em>tested, shared.</em></>}>
          Conferences, lectures and conversations with specialists: the places where ideas get challenged and improved.
        </SectionHead>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 2) * 120}>
              <figure className="group">
                <div className="overflow-hidden">
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:768px) 50vw, 100vw" className="photo aspect-[4/3] w-full object-cover object-center" />
                </div>
                <figcaption className="mt-4 flex gap-4 text-sm text-muted">
                  <span className="num">0{i + 1}</span>
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead kicker="What we stand for" title={<>Values</>} />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80} className="border-l rule pl-6">
              <h3 className="h-card">{t}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <ArrowLink href="/innovation">How we innovate</ArrowLink>
        </div>
      </Section>

      <CtaBand
        title={<>Let’s build what’s next, <em>together.</em></>}
        body="Whether you invest, manufacture, research or build technology, there’s a place for you here."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/partnerships', label: 'See partnerships' }}
      />
    </>
  )
}
