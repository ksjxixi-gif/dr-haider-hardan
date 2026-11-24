import Image from 'next/image'
import Link from 'next/link'
import { audiences, gallery, process, sectors, site } from '@/content/site'
import { projects } from '@/content/projects'
import { ArrowLink, ButtonLink, CtaBand, Section, SectionHead, StageTag } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { HeroArt } from '@/components/HeroArt'
import { SectorIcon } from '@/components/SectorIcon'
import { SocialButtons } from '@/components/icons'

export default function Home() {
  const featured = projects.filter((p) => p.featured)
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 flex min-h-[100svh] flex-col overflow-hidden pt-20 md:-mt-24 md:pt-24">
        <HeroArt className="absolute inset-0 h-full w-full" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/50 to-ink/30 md:bg-gradient-to-r md:from-ink/95 md:via-ink/60 md:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="wrap relative flex flex-1 items-center py-16 md:py-24">
          <Reveal className="max-w-4xl">
            <p className="kicker mb-8 md:mb-10">SEEH · Sustainability for Energy &amp; Health</p>
            <h1 className="display lg:!text-[4.6rem]">
              Turning bold ideas into <em>sustainable</em> real-world solutions.
            </h1>
            <p className="lead mt-8 max-w-xl text-[#c6d0e0]">
              Clean energy, smarter technology and a healthier tomorrow. Founded by {site.founder}, entrepreneur and inventor, SEEH
              turns unconventional ideas into products and ventures with global potential.
            </p>
            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <ButtonLink href="/projects" variant="gold">Explore our projects</ButtonLink>
              <ArrowLink href="/partnerships">Partner with us</ArrowLink>
            </div>
          </Reveal>
        </div>

        <ol className="wrap relative grid grid-cols-2 border-t rule sm:grid-cols-3 lg:grid-cols-5">
          {sectors.map((s) => (
            <li key={s.key} className="flex items-center gap-3 py-6 text-[13px] tracking-[0.03em] text-[#c6d0e0]">
              <SectorIcon sector={s.key} size={18} />
              {s.short}
            </li>
          ))}
        </ol>
      </section>

      {/* STATEMENT */}
      <section className="py-28 md:py-36">
        <Reveal className="wrap text-center">
          <p className="mx-auto max-w-4xl font-serif text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.03em]">
            “We don’t compete in saturated markets. <span className="grad">We create new ones.</span>”
          </p>
          <p className="lead mx-auto mt-10 max-w-2xl">
            SEEH brings entrepreneurship, invention, product development and investment together, turning unconventional ideas into
            solutions that can be built, manufactured and scaled worldwide.
          </p>
        </Reveal>
      </section>

      {/* FOUNDER */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-[400px_1fr] lg:gap-24">
          <Reveal className="mx-auto w-full max-w-[400px] px-4 lg:px-0">
            <figure className="frame-offset">
              <Image src="/images/haider-portrait.webp" alt="Portrait of Dr. Haider N. Hardan" width={440} height={680} sizes="(min-width:1024px) 400px, 90vw" className="relative aspect-[440/560] w-full object-cover object-top" />
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <p className="kicker mb-6">The founder</p>
            <h2 className="h-sec">{site.founder}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">Entrepreneur · Inventor · Innovator</p>
            <p className="lead mt-8 max-w-2xl">
              From inventing in the dental clinic to building ventures in energy, AI and nutrition, Haider works where invention meets
              business: finding ideas with real commercial potential and carrying them from concept to patent, manufacturing and market.
            </p>
            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
              <SocialButtons />
              <ArrowLink href="/about">Full story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FOCUS AREAS */}
      <Section>
        <SectionHead kicker="What we work on" title={<>Five fields. <em>One mission.</em></>} />
        <div className="grid gap-px overflow-hidden rounded-sm bg-[rgba(140,170,230,0.16)] md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 80} className="bg-ink p-8 md:p-10">
              <div className="flex items-center justify-between">
                <SectorIcon sector={s.key} boxed />
                <span className="num">0{i + 1}</span>
              </div>
              <h3 className="h-card mt-10">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{s.body}</p>
            </Reveal>
          ))}
          <Reveal className="flex flex-col justify-between bg-ink-3 p-8 md:p-10">
            <p className="h-card">Have an idea, capacity or capital in one of these fields?</p>
            <div className="mt-8"><ArrowLink href="/contact">Let’s talk</ArrowLink></div>
          </Reveal>
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead kicker="Projects & technologies" title={<>Selected work <em>in progress.</em></>} className="!mb-0" />
          <ArrowLink href="/projects">All projects</ArrowLink>
        </div>
        <div className="mt-16 grid gap-px bg-[rgba(140,170,230,0.16)] md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className="bg-ink">
              <Link href={`/projects/${p.slug}`} className="row-hover group flex h-full flex-col p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="num text-xl">0{i + 1}</span>
                  <StageTag stage={p.stage} />
                </div>
                <h3 className="h-card mt-16">{p.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-muted">{p.summary}</p>
                <p className="mt-8 border-t rule-soft pt-5 text-xs uppercase tracking-[0.16em] text-dim">
                  Seeking: <span className="text-[#c6d0e0]">{p.seeking.join(' · ')}</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-dim">Projects are presented at a high level to protect intellectual property. Technical details are shared under NDA.</p>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHead kicker="How we innovate" title={<>From first idea <em>to global market.</em></>} />
        <ol className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {process.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="border-t rule pr-6 pt-6">
              <span className="num text-lg">0{i + 1}</span>
              <h3 className="mt-3 text-[15px] font-medium tracking-wide">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* IN THE FIELD */}
      <Section>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead kicker="In the field" title={<>Conferences, factories, <em>global partners.</em></>} className="!mb-0" />
          <ArrowLink href="/about#moments">More moments</ArrowLink>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[gallery[0], gallery[1], gallery[2]].map((g, i) => (
            <Reveal key={g.src} delay={i * 120}>
              <figure className="group">
                <div className="overflow-hidden">
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:768px) 33vw, 100vw" className={`photo aspect-[4/5] w-full object-cover ${g.h > g.w ? 'object-[center_20%]' : 'object-center'}`} />
                </div>
                <figcaption className="mt-4 text-sm leading-6 text-muted">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* AUDIENCES */}
      <Section>
        <SectionHead kicker="Built for partnership" title={<>Who we <em>work with.</em></>} />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 80} className="border-l rule pl-6">
              <h3 className="h-card">{a.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-muted">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title={<>Have capital, capability or expertise? <em>Let’s build what’s next.</em></>}
        body="We’re building long-term partnerships with investors, manufacturers, technology companies and research institutions."
        secondary={{ href: '/investment', label: 'View opportunities' }}
      />
    </>
  )
}
