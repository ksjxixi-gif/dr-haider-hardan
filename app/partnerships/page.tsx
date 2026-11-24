import type { Metadata } from 'next'
import Image from 'next/image'
import { gallery } from '@/content/site'
import { CtaBand, PageHero, Section, SectionHead } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Strategic Partnerships',
  description: 'SEEH partners with industrial companies, technology firms, research centres, universities, investors and manufacturers.',
}

const partners = [
  ['Industrial companies', 'Production capability and market access.', 'New products and technologies to grow your portfolio.'],
  ['Technology companies', 'Engineering, software and data expertise.', 'Co-developed IP and new applications for your technology.'],
  ['Research centres', 'Laboratories, testing and scientific rigour.', 'Applied, commercially relevant research problems.'],
  ['Universities', 'Researchers, students and academic validation.', 'Real-world projects, publications and industry links.'],
  ['Investors', 'Capital and strategic guidance.', 'Early access to a diversified innovation pipeline.'],
  ['Manufacturers & distributors', 'Scale, supply chains and channels.', 'Protected products ready for your markets.'],
]

const models = ['Joint development agreements', 'Technology licensing', 'Manufacturing & supply partnerships', 'Research collaboration & pilots', 'Regional distribution rights']

export default function Partnerships() {
  const photo = gallery[3]
  return (
    <>
      <PageHero kicker="Strategic Partnerships" title={<>Partnerships that turn <em>ideas into industries.</em></>}>
        We work with industrial companies, technology firms, research centres, universities, investors and manufacturers to bring
        promising ideas to market.
      </PageHero>

      <Section>
        <SectionHead kicker="Who we partner with" title={<>What you bring. <em>What you get.</em></>} />
        <div className="border-t rule">
          {partners.map(([t, bring, get], i) => (
            <Reveal key={t} className="row-hover grid gap-4 border-b rule py-10 md:grid-cols-[64px_1fr_1fr_1fr] md:gap-10">
              <span className="num text-xl">0{i + 1}</span>
              <h3 className="h-card">{t}</h3>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-dim">You bring</p>
                <p className="mt-2 text-[15px] leading-7 text-muted">{bring}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">You get</p>
                <p className="mt-2 text-[15px] leading-7 text-[#c6d0e0]">{get}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHead kicker="How we collaborate" title={<>Models that fit <em>how you work.</em></>} className="!mb-10" />
            <ul className="border-t rule">
              {models.map((m, i) => (
                <li key={m} className="flex items-baseline gap-6 border-b rule py-5">
                  <span className="num">0{i + 1}</span>
                  <span className="text-[17px] font-light">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="group frame-offset mx-4 lg:mx-0">
            <div className="overflow-hidden">
              <Image src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} sizes="(min-width:1024px) 50vw, 100vw" className="photo relative aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title={<>Let’s explore <em>a partnership.</em></>}
        body="Tell us about your organisation and what you’d like to build together."
        primary={{ href: '/contact?topic=partnership', label: 'Become a partner' }}
        secondary={{ href: '/projects', label: 'Our projects' }}
      />
    </>
  )
}
