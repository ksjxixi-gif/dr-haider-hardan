import Image from 'next/image'
import Link from 'next/link'
import { audiences, gallery, process, sectors, site } from '@/content/site'
import { projects } from '@/content/projects'
import { ArrowLink, ButtonLink, CtaBand, Section, SectionHead, StageTag } from '@/components/ui'
import { Reveal } from '@/components/Reveal'

export default function Home() {
  const featured = projects.filter((p) => p.featured)
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-72 -top-72 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(201,169,110,0.11),transparent)]" />
        <div className="wrap relative grid items-center gap-16 pb-20 pt-10 md:pt-16 lg:grid-cols-[1fr_400px] lg:gap-20 xl:grid-cols-[1fr_440px]">
          <Reveal>
            <p className="kicker mb-8 md:mb-10">Sustainability for Energy &amp; Health</p>
            <h1 className="display">
              Where bold ideas
              <br />
              become <em>industries.</em>
            </h1>
            <p className="lead mt-10 max-w-xl">
              {site.founder}, entrepreneur, inventor and founder of SEEH, builds ventures in clean energy, artificial intelligence and
              health for global markets.
            </p>
            <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
              <ButtonLink href="/partnerships">Partner with us</ButtonLink>
              <ArrowLink href="/projects">Explore the work</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={150} className="mx-auto w-full max-w-[420px] px-4 lg:px-0">
            <figure className="frame-offset">
              <Image
                src="/images/haider-portrait.webp"
                alt="Portrait of Dr. Haider N. Hardan"
                width={440}
                height={680}
                priority
                sizes="(min-width:1280px) 440px, (min-width:1024px) 400px, 90vw"
                className="relative aspect-[440/600] w-full object-cover object-top"
              />
              <figcaption className="mt-5 flex justify-between text-[13px]">
                <span className="font-medium">{site.founder}</span>
                <span className="text-dim">Founder · {site.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="wrap grid grid-cols-2 border-t rule sm:grid-cols-3 lg:grid-cols-5">
          {sectors.map((s, i) => (
            <li key={s.key} className="flex items-baseline gap-3 py-6 text-[13px] tracking-[0.05em] text-[#cfc6b7]">
              <span className="num text-base">0{i + 1}</span>
              {s.short}
            </li>
          ))}
        </ol>
      </section>

      {/* STATEMENT */}
      <section className="border-t rule-soft py-28 md:py-40">
        <Reveal className="wrap text-center">
          <p className="mx-auto max-w-5xl font-serif text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.1]">
            “We don’t compete in saturated markets. <em className="text-gold-2">We create new ones.</em>”
          </p>
          <p className="lead mx-auto mt-10 max-w-2xl">
            SEEH brings entrepreneurship, invention, product development and investment together, turning unconventional ideas into
            solutions that can be built, manufactured and scaled worldwide.
          </p>
        </Reveal>
      </section>

      {/* FOCUS AREAS */}
      <Section>
        <SectionHead kicker="What we work on" title={<>Five fields. <em>One mission.</em></>} />
        <div className="border-t rule">
          {sectors.map((s, i) => (
            <Reveal key={s.key} className="row-hover grid gap-4 border-b rule py-10 md:grid-cols-[80px_1fr_1.3fr] md:gap-10">
              <span className="num text-2xl">0{i + 1}</span>
              <h3 className="h-card">{s.title}</h3>
              <p className="text-[15px] leading-7 text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead kicker="Projects & technologies" title={<>Selected work <em>in progress.</em></>} className="!mb-0" />
          <ArrowLink href="/projects">All projects</ArrowLink>
        </div>
        <div className="mt-16 grid gap-px bg-[rgba(201,169,110,0.2)] md:grid-cols-3">
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
                  Seeking: <span className="text-[#cfc6b7]">{p.seeking.join(' · ')}</span>
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
          <SectionHead kicker="In the field" title={<>Ideas presented, <em>tested, shared.</em></>} className="!mb-0" />
          <ArrowLink href="/about#moments">More moments</ArrowLink>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-[1.25fr_1fr]">
          {[gallery[0], gallery[2]].map((g, i) => (
            <Reveal key={g.src} delay={i * 120}>
              <figure className="group overflow-hidden">
                <div className="overflow-hidden">
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:768px) 50vw, 100vw" className="photo aspect-[4/3] w-full object-cover" />
                </div>
                <figcaption className="mt-4 text-sm text-muted">{g.caption}</figcaption>
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
