import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Coins, Factory, FlaskConical, Handshake, Quote, ShieldCheck } from 'lucide-react'
import { audiences, gallery, process, sectors, site } from '@/content/site'
import { projects } from '@/content/projects'
import { img, projectImg, sectorImg } from '@/content/images'
import { Button, CtaBand, Section, SectionHeader, StageBadge, TextLink } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { SectorIcon } from '@/components/SectorIcon'
import { SocialButtons } from '@/components/icons'

const audienceIcons = [Coins, Factory, Handshake, FlaskConical]

const mosaic = [
  { img: img.solarField, label: 'Solar & renewable energy', cls: 'col-span-6 row-span-2 sm:col-span-4' },
  { img: img.ai, label: 'AI & technology', cls: 'col-span-3 row-span-1 sm:col-span-2 sm:row-span-2' },
  { img: img.healthyBowl, label: 'Healthy food', cls: 'col-span-3 row-span-1 sm:col-span-2 sm:row-span-2' },
  { img: img.inventor, label: 'Invention & R&D', cls: 'col-span-3 row-span-1 sm:col-span-2 sm:row-span-2' },
  { img: img.city, label: 'Business development', cls: 'col-span-3 row-span-1 sm:col-span-2 sm:row-span-2' },
]

export default function Home() {
  const featured = projects.filter((p) => p.featured)
  return (
    <>
      {/* ───────── HERO: copy + brand mosaic (the banner, rebuilt as a grid) ───────── */}
      <section className="border-b border-line bg-white">
        <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <Reveal className="flex flex-col lg:col-span-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-body">
              SEEH <span className="mx-2 text-slate-300">/</span> Sustainability for Energy &amp; Health
            </p>
            <h1 className="h1 mt-7">
              From invention
              <br />
              to industry.
            </h1>
            <p className="lead mt-7 max-w-md">
              SEEH develops clean-energy, artificial-intelligence and health technologies, and takes them to market with investors,
              manufacturers and research partners.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="/projects">View projects</Button>
              <TextLink href="/partnerships">Partner with SEEH</TextLink>
            </div>

            <Link href="/about" className="group mt-12 flex items-center gap-4 border-t border-line pt-6 lg:mt-auto">
              <Image src={img.portrait.src} alt="" width={96} height={96} className="h-12 w-12 rounded-full object-cover object-top" />
              <span className="leading-tight">
                <span className="block text-sm text-body">Founded by</span>
                <span className="mt-0.5 block font-semibold text-ink group-hover:text-brand">{site.founder}</span>
              </span>
              <ArrowRight size={18} className="ml-auto text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ul className="grid h-[460px] grid-cols-6 grid-rows-4 gap-2.5 sm:h-[560px] lg:h-full lg:min-h-[600px]">
              {mosaic.map((m, i) => (
                <li key={m.label} className={`group relative overflow-hidden rounded-lg bg-soft ${m.cls}`}>
                  <Image src={m.img.src} alt={m.img.alt} fill priority={i < 2} sizes="(min-width:1024px) 40vw, 90vw" className="card-img object-cover" />
                  <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[11px] sm:bottom-2.5 sm:left-2.5 sm:gap-2 sm:px-2.5 sm:py-1.5 sm:text-[12.5px] font-semibold text-ink shadow-sm">
                    <span className="tabular-nums text-orange-600">0{i + 1}</span>
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ───────── WHO WE ARE ───────── */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="h2 mt-4">Innovation, entrepreneurship and technology, under one roof.</h2>
            <p className="lead mt-6">
              SEEH is a Jordan-based company that turns unconventional ideas into products and ventures that can be developed,
              manufactured and marketed in local and global markets.
            </p>
            <p className="lead mt-4">
              We don’t compete in saturated markets. <strong className="font-semibold text-ink">We create new ones</strong>, by
              combining invention, research, intellectual-property protection and strong partnerships.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Idea to market, end to end', 'IP protected before disclosure', 'Built for international scale', 'Partnership-driven growth'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15.5px] font-medium">
                  <ShieldCheck size={20} className="shrink-0 text-leaf" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <TextLink href="/about">More about SEEH</TextLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-5 gap-3">
            <figure className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-lg">
              <Image src={gallery[0].src} alt={gallery[0].alt} fill sizes="(min-width:1024px) 360px, 60vw" className="object-cover" />
            </figure>
            <div className="col-span-2 flex flex-col gap-3">
              <figure className="relative flex-1 overflow-hidden rounded-lg">
                <Image src={gallery[1].src} alt={gallery[1].alt} fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover object-[center_20%]" />
              </figure>
              <p className="rounded-lg bg-soft p-4 text-sm leading-6 text-body">
                Speaking in Aqaba and meeting manufacturers abroad: SEEH is built on real relationships.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────── FOCUS AREAS ───────── */}
      <Section tone="soft">
        <SectionHeader
          eyebrow="What we work on"
          title="Five fields. One mission: sustainable value."
          intro="A diversified portfolio across the sectors shaping the next decade."
          center
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {sectors.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 80} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <article className="card group h-full overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={sectorImg[s.key].src} alt={sectorImg[s.key].alt} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="card-img object-cover" />
                </div>
                <div className="relative p-6 md:p-7">
                  <SectorIcon sector={s.key} className="-mt-14 mb-4 border-4 border-white shadow-sm" />
                  <h3 className="h3">{s.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-7 text-body">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────── FOUNDER ───────── */}
      <Section tone="navy" className="overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[420px]">
            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/15">
              <Image src={img.portrait.src} alt={img.portrait.alt} width={440} height={680} sizes="(min-width:1024px) 420px, 90vw" className="aspect-[4/5] w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 pt-16">
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold">{site.founder}</p>
                <p className="text-sm text-white/75">Founder · {site.location}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Meet the founder</p>
            <Quote size={40} className="mt-6 text-amber-400" aria-hidden />
            <blockquote className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium leading-snug tracking-[-0.02em]">
              Real growth doesn’t come from competing in crowded markets. It comes from creating new ones, and from partners who see
              the opportunity early.
            </blockquote>
            <p className="lead mt-6 max-w-2xl">
              Entrepreneur, inventor and innovator. Dr. Haider’s journey started with inventing in the dental clinic and now spans clean
              energy, artificial intelligence and healthy nutrition.
            </p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Button href="/about" kind="glass">Read his story</Button>
              <SocialButtons dark />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────── PROJECTS ───────── */}
      <Section>
        <SectionHeader
          eyebrow="Projects & technologies"
          title="Selected work in progress"
          intro="Shown at a high level to protect intellectual property. Technical details are shared with qualified partners under NDA."
          action={<Button href="/projects" kind="outline">All projects</Button>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => {
            const im = projectImg(p.slug, p.sector)
            return (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href={`/projects/${p.slug}`} className="card group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="card-img object-cover" />
                    <div className="absolute left-4 top-4"><StageBadge stage={p.stage} /></div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-sm font-medium text-body">
                      <SectorIcon sector={p.sector} plain size={16} /> {sectors.find((s) => s.key === p.sector)?.short}
                    </p>
                    <h3 className="h3 mt-2">{p.title}</h3>
                    <p className="mt-3 flex-1 text-[15.5px] leading-7 text-body">{p.summary}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <span className="text-sm text-body">
                        Seeking: <span className="font-medium text-ink">{p.seeking[0]}</span>
                      </span>
                      <ArrowRight size={18} className="text-brand transition-transform group-hover:translate-x-1" aria-hidden />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ───────── PROCESS ───────── */}
      <Section tone="soft">
        <SectionHeader eyebrow="How we innovate" title="From first idea to global market" center />
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          <span aria-hidden className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-sky-500 lg:block" />
          {process.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white font-[family-name:var(--font-display)] text-lg font-semibold text-brand shadow-[0_6px_20px_-6px_rgba(22,115,230,0.4)] ring-1 ring-line">
                {i + 1}
              </span>
              <div>
                <h3 className="h3 !text-[1.05rem] lg:mt-4">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-6 text-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <TextLink href="/innovation">Our innovation approach</TextLink>
        </div>
      </Section>

      {/* ───────── WHO WE WORK WITH ───────── */}
      <Section>
        <SectionHeader eyebrow="Built for partnership" title="Who we work with" intro="We’re looking for partners who can see an opportunity early." center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const Icon = audienceIcons[i]
            return (
              <Reveal key={a.title} delay={i * 80} className="card hoverable p-7">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="h3 mt-5">{a.title}</h3>
                <p className="mt-2 text-[15.5px] leading-7 text-body">{a.body}</p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ───────── IN THE FIELD ───────── */}
      <Section tone="soft">
        <SectionHeader
          eyebrow="In the field"
          title="Conferences, factories and global partners"
          action={<Button href="/about#moments" kind="outline">See all moments</Button>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[gallery[0], gallery[1], gallery[2]].map((g, i) => (
            <Reveal key={g.src} delay={i * 100}>
              <figure className="card group h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 33vw, 100vw" className={`card-img object-cover ${g.h > g.w ? 'object-[center_20%]' : ''}`} />
                </div>
                <figcaption className="p-5 text-[15px] leading-6 text-body">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        image={img.windSunset}
        title={<>Have capital, capability or expertise? <span className="sun-text">Let’s build what’s next.</span></>}
        intro="We’re building long-term partnerships with investors, manufacturers, technology companies and research institutions."
        secondary={{ href: '/investment', label: 'View opportunities' }}
      />
    </>
  )
}
