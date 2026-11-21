// Wireframe sketch generator for the SEEH / Dr. Haider Hardan site.
// Usage: node design/sketches/build.mjs  -> writes design/sketches/sketches.html
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const require = createRequire(join(root, 'package.json'))
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const L = require('lucide-react')

// ---------- fonts (embedded so the HTML is portable) ----------
const font = (p) => readFileSync(join(root, 'node_modules', p)).toString('base64')
const interB64 = font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')
const serifB64 = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')
const serifItB64 = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')

// ---------- icons ----------
const brand = {
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 50 50 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 50 50 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
}
const icon = (name, size = 20, sw = 1.6) =>
  brand[name]
    ? `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${brand[name]}</svg>`
    : renderToStaticMarkup(React.createElement(L[name], { size, strokeWidth: sw }))

const logoMark = (s = 30) => `<svg width="${s}" height="${s}" viewBox="0 0 32 32" fill="none" stroke="url(#lg)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fe9f5"/><stop offset="1" stop-color="#36d6b2"/></linearGradient></defs><path d="M16 3S7 13.5 7 19.5a9 9 0 0 0 18 0C25 13.5 16 3 16 3Z"/><path d="M12 23c0-5 3.5-8 8-8 0 4.5-3 8-8 8Z"/><path d="M12 23l4.5-4.5"/></svg>`
const logo = `<div class="logo">${logoMark()}<div><div class="logo-word">SEEH</div><div class="logo-sub">Sustainability for Energy &amp; Health</div></div></div>`

// ---------- building blocks ----------
let annoN = 0
const anno = (label) => `<span class="anno">${String(++annoN).padStart(2, '0')} · ${label}</span>`
const eyebrow = (t) => `<div class="eyebrow">${t}</div>`
const ph = (label, cls = '') => `<div class="ph ${cls}"><span>${label}</span></div>`
const btn = (t, kind = 'primary', ic = 'ArrowRight') => `<span class="btn ${kind}">${t}${ic ? icon(ic, 16, 2) : ''}</span>`
const chip = (t, cls = '') => `<span class="chip ${cls}">${t}</span>`
const stage = (t) => `<span class="stage s-${t.toLowerCase().replace(/[^a-z]+/g, '-')}"><i></i>${t}</span>`

const NAV = ['About', 'Innovation', 'Projects', 'Investment', 'Partnerships', 'Insights']
const header = (active) => `
<header class="hdr">
  ${logo}
  <nav class="nav">${NAV.map((n) => `<a class="${n === active ? 'on' : ''}">${n}</a>`).join('')}</nav>
  <div class="hdr-r"><span class="lang"><b>EN</b><i>/</i>ع</span>${btn('Contact', 'primary sm', 'ArrowUpRight')}<span class="burger">${icon('Menu', 22)}</span></div>
</header>`

const footer = `
<footer class="ftr">
  <div class="ftr-top">
    <div class="ftr-brand">${logo}<p class="muted">Turning bold ideas into sustainable, real-world value: clean energy, AI and health.</p>
      <div class="socials">${['linkedin', 'x', 'instagram', 'youtube'].map((s) => `<span>${icon(s, 16)}</span>`).join('')}</div></div>
    <div class="ftr-col"><h6>Explore</h6><a>About</a><a>Innovation &amp; R&amp;D</a><a>Projects &amp; Technologies</a><a>Insights</a></div>
    <div class="ftr-col"><h6>Work with us</h6><a>Business &amp; Investment</a><a>Strategic Partnerships</a><a>Request NDA access</a><a>Contact</a></div>
    <div class="ftr-col"><h6>Contact</h6><a>${icon('Mail', 14)} info@seeh.company</a><a>${icon('MapPin', 14)} Jordan</a><a>${icon('Globe', 14)} seeh.company</a></div>
  </div>
  <div class="ftr-bot"><span>© 2026 SEEH, Sustainability for Energy &amp; Health. All rights reserved.</span><span>Privacy · Terms · العربية</span></div>
</footer>`

const pageHero = (eb, title, sub, extra = '') => `
<section class="phero">${anno('Page hero')}<div class="gridbg"></div>
  ${eyebrow(eb)}<h1 class="h1">${title}</h1><p class="lead">${sub}</p>${extra}
</section>`

const ctaBand = (title, sub, a = 'Start a conversation', b = 'View opportunities') => `
<section class="sec">${anno('Closing CTA')}
  <div class="cta"><div class="cta-glow"></div><div>${eyebrow('Let’s talk')}<h2 class="h2">${title}</h2><p class="lead">${sub}</p></div>
  <div class="row">${btn(a)}${btn(b, 'ghost')}</div></div>
</section>`

const PILLARS = [
  ['Sun', 'Clean & Renewable Energy', 'A multi-technology energy system combining solar and renewables with AI to raise output and cut cost and footprint.'],
  ['Cpu', 'AI & Technology', 'Intelligent applications and new concepts for commercial, industrial and service environments.'],
  ['HeartPulse', 'Health & Nutrition', 'Healthy food products and technologies for weight management and appetite control.'],
  ['Lightbulb', 'Inventions & Products', 'Devices and solutions taken from first concept to patent, manufacturing and market.'],
  ['TrendingUp', 'Business Development', 'Unconventional solutions that open new markets instead of fighting over saturated ones.'],
]

const PROJECTS = [
  ['energy', 'Sun', 'Energy', 'Research', 'Hybrid Multi-Source Energy System', 'Solar, renewables and AI in one system for higher yield at lower cost.', 'Investment · Manufacturing'],
  ['ai', 'Cpu', 'AI & Technology', 'Concept', 'AI Energy Optimization Platform', 'Predictive control that squeezes more value from every kilowatt.', 'Technology partner'],
  ['health', 'Leaf', 'Health & Nutrition', 'Development', 'Appetite-Management Nutrition Line', 'Functional food products designed around satiety and healthy weight.', 'Manufacturer · Distribution'],
  ['ai', 'Building2', 'AI & Technology', 'Concept', 'Smart Facility Intelligence', 'AI that helps commercial sites run leaner, safer and more efficiently.', 'Pilot partner'],
  ['product', 'Lightbulb', 'Inventions', 'Patent pending', 'Next-Gen Consumer Device', 'A new product category: details shared under NDA only.', 'Licensing · Investment'],
  ['energy', 'Zap', 'Energy', 'Prototype', 'Distributed Storage Concept', 'Modular storage that pairs with the hybrid energy system.', 'Research partner'],
]
const projCard = ([cls, ic, sector, st, title, desc, seek]) => `
<div class="pcard">
  <div class="pcover c-${cls}"><span class="pcover-ic">${icon(ic, 56, 1.1)}</span>${chip(icon('Lock', 12, 2) + ' NDA', 'nda')}</div>
  <div class="pbody"><div class="row between"><span class="sector">${sector}</span>${stage(st)}</div>
  <h4>${title}</h4><p class="muted sm">${desc}</p>
  <div class="seek"><span>Seeking</span>${seek}</div></div>
</div>`

const STEPS = [
  ['Idea', 'Spotting unmet needs and unconventional angles.'],
  ['Research', 'Market, technical and IP landscape study.'],
  ['Evaluation', 'Feasibility, economics and risk scoring.'],
  ['Development', 'Prototyping, testing and iteration.'],
  ['Manufacturing', 'Industrial partners and scalable production.'],
  ['Market', 'Commercial launch, licensing and growth.'],
]

const INSIGHTS = [
  ['Business', 'Why the next big markets will be created, not competed for', '6 min'],
  ['Energy', 'Hybrid energy systems: where solar meets AI', '8 min'],
  ['Health', 'Food as technology: rethinking appetite and weight management', '5 min'],
  ['Innovation', 'From napkin sketch to patent: a practical path for inventors', '7 min'],
  ['AI', 'Practical AI for commercial facilities: beyond the hype', '6 min'],
  ['Partnerships', 'What investors should ask before backing an invention', '4 min'],
]

// ---------- pages ----------
const pages = []
const addPage = (id, label, route, active, body) => pages.push({ id, label, route, active, body })

// HOME
annoN = 0
const homeBody = () => `
<section class="hero">${anno('Hero')}<div class="gridbg"></div>
  <div class="hero-grid">
    <div>
      ${eyebrow('Dr. Haider N. Hardan · Founder of SEEH')}
      <h1 class="h1 xl">Turning bold ideas into <em>sustainable</em> real-world value.</h1>
      <p class="lead">Entrepreneur, inventor and innovator. Through SEEH we develop ventures, products and technologies across clean energy, AI and health, built for global markets and real partnerships.</p>
      <div class="row">${btn('Explore projects')}${btn('Partner with us', 'ghost', '')}</div>
      <div class="pillstrip">${PILLARS.map(([i, t]) => `<span>${icon(i, 14)}${t}</span>`).join('')}</div>
    </div>
    <div class="hero-vis">
      <div class="ring"></div>${ph('Founder portrait<br><small>professional photo needed</small>', 'arch')}
      <div class="float f1">${icon('Sun', 14)} Clean energy</div><div class="float f2">${icon('Cpu', 14)} AI systems</div><div class="float f3">${icon('Leaf', 14)} Health</div>
    </div>
  </div>
</section>

<section class="sec">${anno('Positioning statement')}
  <div class="statement"><p class="serif-xl">“We don’t compete in saturated markets. <span class="grad">We create new ones.</span>”</p>
  <p class="lead narrow">SEEH brings entrepreneurship, invention, product development and investment together under one roof, turning unconventional ideas into solutions that can be built, manufactured and scaled worldwide.</p></div>
</section>

<section class="sec">${anno('Focus areas (5 pillars)')}
  <div class="sec-head">${eyebrow('What we work on')}<h2 class="h2">Five fields. One mission: sustainable value.</h2></div>
  <div class="g5">${PILLARS.map(([i, t, d], k) => `<div class="card"><div class="ic">${icon(i, 22)}</div><span class="num">0${k + 1}</span><h4>${t}</h4><p class="muted sm">${d}</p><span class="more">Learn more ${icon('ArrowRight', 14)}</span></div>`).join('')}</div>
</section>

<section class="sec">${anno('Featured projects')}
  <div class="sec-head row between end"><div>${eyebrow('Projects & technologies')}<h2 class="h2">Selected work in progress</h2></div>${btn('All projects', 'ghost')}</div>
  <div class="g3">${PROJECTS.slice(0, 3).map(projCard).join('')}</div>
  <p class="note">${icon('ShieldCheck', 14)} Projects are shown at a high level to protect intellectual property. Technical details are shared under NDA.</p>
</section>

<section class="sec">${anno('Idea → market pipeline')}
  <div class="sec-head">${eyebrow('How we innovate')}<h2 class="h2">From first idea to global market</h2></div>
  <div class="pipe">${STEPS.map(([t, d], k) => `<div class="step"><span class="dot">${k + 1}</span><h5>${t}</h5><p class="muted xs">${d}</p></div>`).join('')}</div>
</section>

<section class="sec">${anno('Who we work with')}
  <div class="sec-head">${eyebrow('Built for partnership')}<h2 class="h2">Who we work with</h2></div>
  <div class="g4">${[
    ['Coins', 'Investors', 'Early access to vetted ventures with global commercial potential.'],
    ['Factory', 'Manufacturers', 'New, market-ready products to industrialise and scale.'],
    ['Network', 'Technology partners', 'Co-develop and integrate emerging technologies.'],
    ['GraduationCap', 'Research & universities', 'Joint R&D, validation and applied research.'],
  ].map(([i, t, d]) => `<div class="card row-card"><div class="ic">${icon(i, 22)}</div><div><h4>${t}</h4><p class="muted sm">${d}</p></div></div>`).join('')}</div>
</section>

<section class="sec">${anno('Founder note')}
  <div class="founder">${ph('Portrait', 'sq')}
    <div>${icon('Quote', 34, 1.2)}<p class="serif-lg">Real growth doesn’t come from competing in crowded markets. It comes from creating new ones, and from partners who see the opportunity early.</p>
    <div class="sig"><span class="signature">Haider Hardan</span><div><b>Dr. Haider N. Hardan</b><span class="muted sm">Founder, SEEH · Entrepreneur &amp; Inventor</span></div></div></div>
  </div>
</section>
${ctaBand('Have capital, capability or expertise? Let’s turn ideas into industries.', 'We’re building long-term partnerships with investors, manufacturers, technology companies and research institutions.')}`
addPage('home', 'Home', '/', '', homeBody())

// ABOUT
annoN = 0
addPage('about', 'About', '/about', 'About', `
${pageHero('About', 'An entrepreneur who builds <em>from first principles.</em>', 'Dr. Haider N. Hardan is an entrepreneur, inventor and the founder of SEEH, a Jordan-based company turning unconventional ideas into scalable products and ventures.')}
<section class="sec">${anno('Founder profile')}
  <div class="g2 center">${ph('Founder portrait', 'tall')}
  <div>${eyebrow('The founder')}<h2 class="h2">Dr. Haider N. Hardan</h2>
  <p class="muted">Haider works at the intersection of invention and business: finding ideas with real commercial potential and carrying them through research, evaluation, development, manufacturing and market.</p>
  <p class="muted">His work spans clean energy, artificial intelligence, healthy nutrition and new product development, always with an eye on intellectual property and global scalability.</p>
  <div class="facts">${[['Founder', 'SEEH'], ['Based in', 'Jordan'], ['Focus areas', '5 sectors'], ['Role', 'Inventor & innovator']].map(([a, b]) => `<div><span class="muted xs">${a}</span><b>${b}</b></div>`).join('')}</div>
  <div class="socials big">${['linkedin', 'x', 'instagram', 'youtube'].map((s) => `<span>${icon(s, 18)}</span>`).join('')}</div></div></div>
</section>
<section class="sec">${anno('About SEEH: mission / vision / approach')}
  <div class="sec-head">${eyebrow('The company')}<h2 class="h2">SEEH: Sustainability for Energy &amp; Health</h2><p class="lead narrow">A company that brings entrepreneurship, innovation, product development and commercial investment together.</p></div>
  <div class="g3">${[
    ['Target', 'Mission', 'Turn promising ideas into products and ventures with real economic value and international growth potential.'],
    ['Eye', 'Vision', 'A world where clean energy, smart technology and healthy living are accessible, affordable and sustainable.'],
    ['Compass', 'Approach', 'Create new markets instead of competing in saturated ones, through partnership, IP protection and disciplined execution.'],
  ].map(([i, t, d]) => `<div class="card"><div class="ic">${icon(i, 22)}</div><h4>${t}</h4><p class="muted sm">${d}</p></div>`).join('')}</div>
</section>
<section class="sec">${anno('Values')}
  <div class="sec-head">${eyebrow('What we stand for')}<h2 class="h2">Values</h2></div>
  <div class="g4">${[['Sparkles', 'Unconventional thinking'], ['Globe', 'Real-world impact'], ['ShieldCheck', 'Integrity & IP respect'], ['Handshake', 'Long-term partnership']].map(([i, t]) => `<div class="card"><div class="ic">${icon(i, 22)}</div><h4>${t}</h4><p class="muted sm">One-line explanation of the value goes here.</p></div>`).join('')}</div>
</section>
<section class="sec">${anno('Journey timeline (content from client)')}
  <div class="sec-head">${eyebrow('Milestones')}<h2 class="h2">The journey so far</h2></div>
  <div class="timeline">${['Education & early career', 'First inventions', 'SEEH founded', 'Energy system R&D', 'Today'].map((t, k) => `<div class="tl"><span class="dot"></span><span class="muted xs">YEAR</span><h5>${t}</h5><p class="muted xs">Milestone details from Dr. Haider.</p></div>`).join('')}</div>
</section>
${ctaBand('Let’s build what’s next, together.', 'Whether you invest, manufacture, research or build technology, there’s a place for you here.', 'Get in touch', 'See partnerships')}`)

// INNOVATION
annoN = 0
addPage('innovation', 'Innovation & R&D', '/innovation', 'Innovation', `
${pageHero('Innovation & R&D', 'From idea <em>to industry.</em>', 'A disciplined process that turns unconventional ideas into protected, manufacturable and marketable solutions.')}
<section class="sec">${anno('Pipeline in detail (6 stages)')}
  <div class="g2 top"><div class="sticky">${eyebrow('Our process')}<h2 class="h2">Six stages. Zero shortcuts.</h2><p class="muted">Every project moves through the same gates, so partners always know where it stands and what comes next.</p>${ph('Process illustration', 'mid')}</div>
  <div class="vsteps">${STEPS.map(([t, d], k) => `<div class="vstep"><span class="dot">0${k + 1}</span><div><h4>${t}</h4><p class="muted sm">${d} Longer description of what happens at this stage and what partners can expect.</p></div></div>`).join('')}</div></div>
</section>
<section class="sec">${anno('R&D focus areas')}
  <div class="sec-head">${eyebrow('Research directions')}<h2 class="h2">Where our R&amp;D is focused</h2></div>
  <div class="g5">${PILLARS.map(([i, t]) => `<div class="card"><div class="ic">${icon(i, 22)}</div><h4>${t}</h4><ul class="ticks"><li>Research direction</li><li>Research direction</li><li>Research direction</li></ul></div>`).join('')}</div>
</section>
<section class="sec">${anno('IP & confidentiality')}
  <div class="ipbox"><div class="ic big">${icon('FileLock', 30)}</div><div>${eyebrow('Intellectual property')}<h2 class="h2">Protecting what we build</h2><p class="muted">We publish ideas at a high level and share technical depth only with qualified partners, step by step.</p></div>
  <div class="g3 tight">${[['Patents & filings', 'Inventions are protected before disclosure.'], ['NDA-first sharing', 'Technical details under mutual NDA.'], ['Staged disclosure', 'Information shared as trust and commitment grow.']].map(([t, d]) => `<div class="mini"><b>${t}</b><span class="muted xs">${d}</span></div>`).join('')}</div></div>
</section>
${ctaBand('Research institution or university?', 'We collaborate on applied research, validation and joint development.', 'Propose a collaboration', 'View projects')}`)

// PROJECTS
annoN = 0
addPage('projects', 'Projects & Technologies', '/projects', 'Projects', `
${pageHero('Projects & Technologies', 'Ideas in motion.', 'A selection of current projects. Shown at a high level to protect intellectual property; technical details are available to qualified partners under NDA.')}
<section class="sec">${anno('Filters + project grid (new project = new content file)')}
  <div class="filters"><div class="row">${['All', 'Energy', 'AI & Technology', 'Health & Nutrition', 'Inventions'].map((t, k) => `<span class="fchip ${k === 0 ? 'on' : ''}">${t}</span>`).join('')}</div>
  <div class="row"><span class="fchip ghost">Stage: Any ${icon('ChevronRight', 14)}</span><span class="fchip ghost">Seeking: Any ${icon('ChevronRight', 14)}</span></div></div>
  <div class="g3">${PROJECTS.map(projCard).join('')}</div>
</section>
<section class="sec">${anno('Stage legend')}
  <div class="legend">${['Concept', 'Research', 'Development', 'Prototype', 'Patent pending', 'Ready'].map(stage).join('<span class="arrow">→</span>')}</div>
</section>
${ctaBand('See something worth exploring?', 'Request a confidential briefing. We’ll share details under a mutual NDA.', 'Request NDA access', 'Investment options')}`)

// PROJECT DETAIL
annoN = 0
addPage('project-detail', 'Project detail', '/projects/hybrid-energy-system', 'Projects', `
<section class="phero left">${anno('Project hero')}<div class="gridbg"></div>
  <div class="crumbs">Projects ${icon('ChevronRight', 12)} Energy</div>
  <div class="row">${chip('Clean & Renewable Energy')}${stage('Research')}${chip(icon('Lock', 12, 2) + ' Details under NDA', 'nda')}</div>
  <h1 class="h1">Hybrid Multi-Source Energy System</h1><p class="lead">An integrated system that combines solar and other renewable sources with AI-driven control, designed to raise output, lower cost and reduce environmental impact.</p>
</section>
<section class="sec">${anno('Overview + key facts sidebar')}
  <div class="detail"><div>
    ${ph('Project visual / concept render (non-revealing)', 'wide')}
    ${[['The challenge', 'What problem exists in the market today and why current solutions fall short.'], ['The opportunity', 'Market size, target customers and why now, kept at a commercial level.'], ['Our approach', 'High-level description of the solution, with no confidential technical detail.']].map(([t, d]) => `<div class="block"><h3 class="h3">${t}</h3><p class="muted">${d} Two to three short paragraphs of plain-language copy written for investors and partners.</p></div>`).join('')}
  </div>
  <aside class="side">
    <h5>Key facts</h5>${[['Sector', 'Clean & Renewable Energy'], ['Stage', 'Research'], ['IP status', 'Protection in progress'], ['Target markets', 'MENA · Global'], ['Seeking', 'Investment, manufacturing partner']].map(([a, b]) => `<div class="kv"><span class="muted xs">${a}</span><b>${b}</b></div>`).join('')}
    ${btn('Request briefing under NDA', 'primary block', 'Lock')}<span class="muted xs center">Response within a few business days</span>
  </aside></div>
</section>
<section class="sec">${anno('Stage tracker')}
  <div class="tracker">${STEPS.map(([t], k) => `<div class="tk ${k < 2 ? 'done' : ''} ${k === 1 ? 'now' : ''}"><span></span><b>${t}</b></div>`).join('')}</div>
</section>
<section class="sec">${anno('Related projects')}
  <div class="sec-head">${eyebrow('More projects')}<h2 class="h2">Related</h2></div>
  <div class="g3">${[PROJECTS[1], PROJECTS[5], PROJECTS[3]].map(projCard).join('')}</div>
</section>`)

// INVESTMENT
annoN = 0
addPage('investment', 'Business & Investment', '/investment', 'Investment', `
${pageHero('Business & Investment', 'Investing in <em>what comes next.</em>', 'Opportunities to invest in, license or co-develop ventures across clean energy, AI and health, with global commercial potential.', `<div class="row" style="margin-top:28px">${btn('View open opportunities')}${btn('Book an intro call', 'ghost', 'Calendar')}</div>`)}
<section class="sec">${anno('Why SEEH')}
  <div class="g4">${[['Rocket', 'Early access', 'Enter at the idea and R&D stage, where the upside is highest.'], ['Layers', 'Diversified pipeline', 'Multiple projects across five growing sectors.'], ['ShieldCheck', 'IP-first', 'Inventions are protected before they are commercialised.'], ['Globe', 'Global markets', 'Built for MENA and international scale from day one.']].map(([i, t, d]) => `<div class="card"><div class="ic">${icon(i, 22)}</div><h4>${t}</h4><p class="muted sm">${d}</p></div>`).join('')}</div>
</section>
<section class="sec">${anno('Engagement models')}
  <div class="sec-head">${eyebrow('Ways to engage')}<h2 class="h2">Flexible engagement models</h2></div>
  <div class="g3">${[['Coins', 'Equity investment'], ['Scale', 'Licensing'], ['Handshake', 'Joint ventures'], ['FlaskConical', 'Co-development'], ['Factory', 'Manufacturing partnership'], ['Globe', 'Regional distribution']].map(([i, t]) => `<div class="card row-card"><div class="ic">${icon(i, 22)}</div><div><h4>${t}</h4><p class="muted sm">Short explanation of this model and who it suits.</p></div></div>`).join('')}</div>
</section>
<section class="sec">${anno('Open opportunities table')}
  <div class="sec-head row between end"><div>${eyebrow('Open now')}<h2 class="h2">Current opportunities</h2></div>${btn('All projects', 'ghost')}</div>
  <div class="table"><div class="tr th"><span>Project</span><span>Sector</span><span>Stage</span><span>Seeking</span><span></span></div>
  ${PROJECTS.slice(0, 5).map(([, , sec, st, t, , seek]) => `<div class="tr"><b>${t}</b><span class="muted">${sec}</span>${stage(st)}<span class="muted">${seek}</span><span class="go">${icon('ArrowUpRight', 16)}</span></div>`).join('')}</div>
</section>
<section class="sec">${anno('How it works (4 steps)')}
  <div class="sec-head">${eyebrow('Process')}<h2 class="h2">How an investment conversation works</h2></div>
  <div class="g4 steps4">${[['Intro call', 'Understand your focus and ticket size.'], ['Mutual NDA', 'Protect both sides before details are shared.'], ['Deep dive', 'Technical, commercial and financial review.'], ['Agreement', 'Structure the deal and get to work.']].map(([t, d], k) => `<div class="s4"><span class="dot">${k + 1}</span><h4>${t}</h4><p class="muted sm">${d}</p></div>`).join('')}</div>
</section>
${ctaBand('Ready to explore an opportunity?', 'Tell us your focus and we’ll match you with relevant projects.', 'Contact the investment desk', 'Download overview (PDF)')}`)

// PARTNERSHIPS
annoN = 0
addPage('partnerships', 'Strategic Partnerships', '/partnerships', 'Partnerships', `
${pageHero('Strategic Partnerships', 'Partnerships that turn <em>ideas into industries.</em>', 'We work with industrial companies, technology firms, research centres, universities, investors and manufacturers to bring promising ideas to market.')}
<section class="sec">${anno('Partner types: what you bring / what you get')}
  <div class="g3">${[['Factory', 'Industrial companies'], ['Cpu', 'Technology companies'], ['Microscope', 'Research centres'], ['GraduationCap', 'Universities'], ['Coins', 'Investors'], ['Globe', 'Manufacturers & distributors']].map(([i, t]) => `<div class="card"><div class="ic">${icon(i, 22)}</div><h4>${t}</h4><div class="bg"><span class="muted xs">YOU BRING</span><p class="sm">Capability, capacity or expertise.</p><span class="muted xs">YOU GET</span><p class="sm">Access to new products, IP and markets.</p></div></div>`).join('')}</div>
</section>
<section class="sec">${anno('Collaboration models')}
  <div class="g2 center"><div>${eyebrow('How we collaborate')}<h2 class="h2">Models that fit how you work</h2>
  <ul class="ticks lg"><li>Joint development agreements</li><li>Technology licensing</li><li>Manufacturing &amp; supply partnerships</li><li>Research collaboration &amp; pilots</li><li>Regional distribution rights</li></ul></div>${ph('Partnership visual', 'mid')}</div>
</section>
<section class="sec">${anno('Partner logos (hidden until real partners exist)')}
  <div class="logos">${Array.from({ length: 6 }, () => ph('Partner logo', 'logo-ph')).join('')}</div>
</section>
${ctaBand('Let’s explore a partnership.', 'Tell us about your organisation and what you’d like to build.', 'Become a partner', 'Our projects')}`)

// INSIGHTS
annoN = 0
addPage('insights', 'News & Insights', '/insights', 'Insights', `
${pageHero('News & Insights', 'Ideas, <em>out loud.</em>', 'Articles, publications and updates on clean energy, AI, health and the business of innovation.')}
<section class="sec">${anno('Featured article')}
  <div class="feat">${ph('Article cover image', 'feat-ph')}<div>${chip('Business')}<h2 class="h2">${INSIGHTS[0][1]}</h2><p class="muted">Short excerpt of the article. Two lines that make the reader want to click through and read the full piece.</p><div class="meta">Dr. Haider N. Hardan · ${INSIGHTS[0][2]} read</div>${btn('Read article', 'ghost')}</div></div>
</section>
<section class="sec">${anno('Category filter + article grid')}
  <div class="filters"><div class="row">${['All', 'Energy', 'AI', 'Health', 'Innovation', 'Business', 'News'].map((t, k) => `<span class="fchip ${k === 0 ? 'on' : ''}">${t}</span>`).join('')}</div><span class="fchip ghost">${icon('Search', 14)} Search</span></div>
  <div class="g3">${INSIGHTS.slice(1).concat([INSIGHTS[0]]).map(([c, t, m]) => `<div class="acard">${ph('Cover', 'acover')}<div class="pbody">${chip(c)}<h4>${t}</h4><div class="meta">${m} read</div></div></div>`).join('')}</div>
</section>
<section class="sec">${anno('Follow / newsletter')}
  <div class="news"><div>${eyebrow('Stay in the loop')}<h3 class="h3">Get new insights in your inbox</h3></div><div class="row"><span class="input">your@email.com</span>${btn('Subscribe')}</div></div>
</section>`)

// CONTACT
annoN = 0
addPage('contact', 'Contact', '/contact', '', `
${pageHero('Contact', 'Let’s build something <em>that matters.</em>', 'Investment, partnership, manufacturing, research or media: tell us what you have in mind and we’ll route it to the right conversation.')}
<section class="sec">${anno('Inquiry form + direct contact panel')}
  <div class="contact"><div class="form">
    <label>I’m reaching out about</label>
    <div class="row wrap">${['Investment', 'Partnership', 'Manufacturing', 'Research', 'Media', 'Other'].map((t, k) => `<span class="fchip ${k === 0 ? 'on' : ''}">${t}</span>`).join('')}</div>
    <div class="g2 tight"><div><label>Full name</label><span class="input">Jane Doe</span></div><div><label>Email</label><span class="input">jane@company.com</span></div></div>
    <div class="g2 tight"><div><label>Organisation</label><span class="input">Company / institution</span></div><div><label>Country</label><span class="input">Select country</span></div></div>
    <label>Message</label><span class="input area">Tell us about your interest…</span>
    <div class="check"><span class="box">${icon('Check', 12, 3)}</span> I’d like to discuss details under a mutual NDA</div>
    ${btn('Send message', 'primary')}
  </div>
  <aside class="cpanel">
    <h5>Direct contact</h5>
    <div class="kv2">${icon('Mail', 18)}<div><span class="muted xs">Email</span><b>info@seeh.company</b></div></div>
    <div class="kv2">${icon('MessageCircle', 18)}<div><span class="muted xs">WhatsApp</span><b>+962 · · · · · · ·</b></div></div>
    <div class="kv2">${icon('MapPin', 18)}<div><span class="muted xs">Location</span><b>Jordan</b></div></div>
    <div class="kv2">${icon('Calendar', 18)}<div><span class="muted xs">Prefer a call?</span><b>Book a 20-min intro</b></div></div>
    <h5 style="margin-top:28px">Follow</h5><div class="socials big">${['linkedin', 'x', 'instagram', 'youtube'].map((s) => `<span>${icon(s, 18)}</span>`).join('')}</div>
  </aside></div>
</section>`)

// ---------- CSS ----------
const css = `
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${interB64}) format('woff2');font-weight:100 900}
@font-face{font-family:'Instrument Serif';src:url(data:font/woff2;base64,${serifB64}) format('woff2');font-weight:400}
@font-face{font-family:'Instrument Serif';src:url(data:font/woff2;base64,${serifItB64}) format('woff2');font-weight:400;font-style:italic}
:root{--bg:#050a16;--bg2:#08101f;--card:#0b1528;--card2:#0e1a31;--line:rgba(150,185,230,.11);--line2:rgba(150,185,230,.2);--text:#eaf0f8;--muted:#8e9bb2;--dim:#5b6880;--cyan:#41d9ec;--teal:#33d4b1;--amber:#f3b765;--grad:linear-gradient(100deg,#6fe6f4,#33d4b1)}
*{box-sizing:border-box}html{-webkit-font-smoothing:antialiased}
body{margin:0;background:#151a24;font-family:Inter,system-ui,sans-serif;color:var(--text)}
.board{display:flex;flex-direction:column;align-items:center;gap:72px;padding:56px 40px}
.frame{width:1280px}.frame.m{width:390px}
.flabel{display:flex;gap:12px;align-items:baseline;margin:0 0 14px 4px;font-size:15px;font-weight:600;color:#cfd7e4}.flabel code{font:500 12px ui-monospace,monospace;color:#8b96a8;background:#222937;padding:3px 7px;border-radius:6px}
.page{background:var(--bg);border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06);container:page/inline-size;font-size:16px;line-height:1.6}
p{margin:0 0 14px}h1,h2,h3,h4,h5,h6{margin:0}
.muted{color:var(--muted)}.sm{font-size:14.5px}.xs{font-size:12.5px}.center{text-align:center;display:block}
.row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.row.between{justify-content:space-between}.row.end{align-items:flex-end}.wrap{flex-wrap:wrap}
.anno{position:absolute;top:18px;left:18px;z-index:5;font:700 10.5px/1 Inter;letter-spacing:.04em;color:#1b1400;background:#ffd166;padding:6px 9px;border-radius:999px;box-shadow:0 2px 10px rgba(255,209,102,.25)}
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--cyan);margin-bottom:18px;display:flex;align-items:center;gap:10px}.eyebrow::before{content:"";width:22px;height:1px;background:var(--cyan)}
.h1{font:400 64px/1.04 'Instrument Serif',serif;letter-spacing:-.01em;margin-bottom:22px;max-width:900px}.h1.xl{font-size:74px}
.h1 em,.h2 em{font-style:italic;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.h2{font:400 46px/1.08 'Instrument Serif',serif;margin-bottom:16px}.h3{font:400 30px/1.15 'Instrument Serif',serif;margin-bottom:10px}
h4{font-size:17px;font-weight:600;margin:14px 0 8px;letter-spacing:-.005em}h5{font-size:15px;font-weight:600;margin:10px 0 6px}
h6{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.lead{font-size:18.5px;color:var(--muted);max-width:640px;line-height:1.65}.lead.narrow{max-width:720px;margin:0 auto}
.grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.btn{display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 22px;border-radius:999px;font-size:15px;font-weight:600;white-space:nowrap}
.btn.primary{background:var(--grad);color:#04121a;box-shadow:0 8px 30px rgba(65,217,236,.25)}.btn.ghost{border:1px solid var(--line2);color:var(--text)}
.btn.sm{height:40px;padding:0 18px;font-size:14px}.btn.block{width:100%;justify-content:center;margin:22px 0 10px}
.chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:5px 11px;border-radius:999px;border:1px solid var(--line2);color:#c4cfe0}
.chip.nda{background:rgba(5,10,22,.65);backdrop-filter:blur(6px);border-color:rgba(255,255,255,.15)}
.ph{border:1.5px dashed rgba(150,185,230,.28);border-radius:20px;background:repeating-linear-gradient(135deg,rgba(150,185,230,.045) 0 12px,transparent 12px 24px);display:grid;place-items:center;text-align:center;color:var(--dim);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;line-height:1.7}.ph small{font-size:10px;letter-spacing:.08em;text-transform:none;font-weight:500}
.ph.arch{width:380px;height:470px;border-radius:200px 200px 24px 24px;position:relative;z-index:1;background-color:rgba(8,16,31,.7)}
.ph.sq{width:300px;height:340px;flex:none}.ph.tall{height:520px}.ph.mid{height:300px;margin-top:24px}.ph.wide{height:380px;margin-bottom:40px}
.ph.feat-ph{height:380px}.ph.acover{height:190px;border-radius:16px 16px 0 0;border-width:0 0 1.5px}.ph.logo-ph{height:90px;border-radius:14px}
/* header */
.hdr{height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 56px;border-bottom:1px solid var(--line);background:rgba(5,10,22,.85);position:relative;z-index:4}
.logo{display:flex;align-items:center;gap:12px}.logo-word{font-weight:700;letter-spacing:.32em;font-size:17px}.logo-sub{font-size:9.5px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-top:1px}
.nav{display:flex;gap:30px}.nav a{font-size:14.5px;color:var(--muted);font-weight:500;position:relative}.nav a.on{color:var(--text)}.nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:-29px;height:2px;background:var(--grad)}
.hdr-r{display:flex;align-items:center;gap:18px}.lang{font-size:13px;color:var(--muted);display:flex;gap:6px}.lang b{color:var(--text)}.lang i{color:var(--dim);font-style:normal}.burger{display:none}
/* hero */
.hero{position:relative;padding:84px 56px 72px;overflow:hidden}
.hero::before,.phero::before{content:"";position:absolute;inset:0;background:radial-gradient(620px 420px at 78% 30%,rgba(65,217,236,.16),transparent 62%),radial-gradient(520px 420px at 8% 100%,rgba(51,212,177,.09),transparent 60%)}
.gridbg{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse 70% 70% at 70% 30%,#000 10%,transparent 75%);mask-image:radial-gradient(ellipse 70% 70% at 70% 30%,#000 10%,transparent 75%)}
.hero-grid{position:relative;display:grid;grid-template-columns:1.2fr .8fr;gap:48px;align-items:center}
.hero .row{margin-top:30px}
.pillstrip{display:flex;flex-wrap:wrap;gap:8px;margin-top:44px;padding-top:28px;border-top:1px solid var(--line)}.pillstrip span{display:inline-flex;gap:7px;align-items:center;font-size:12.5px;color:#b6c2d6;padding:7px 12px;border:1px solid var(--line);border-radius:999px;background:rgba(11,21,40,.6)}.pillstrip svg{color:var(--cyan)}
.hero-vis{position:relative;display:grid;place-items:center;height:520px}
.ring{position:absolute;width:470px;height:470px;border-radius:50%;border:1px solid rgba(65,217,236,.25);box-shadow:0 0 120px rgba(65,217,236,.15),inset 0 0 80px rgba(65,217,236,.06)}
.float{position:absolute;z-index:2;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;padding:10px 14px;border-radius:14px;background:rgba(11,21,40,.85);border:1px solid var(--line2);backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,.35)}.float svg{color:var(--cyan)}
.f1{top:70px;left:-10px}.f2{top:230px;right:-20px}.f3{bottom:70px;left:10px}
.phero{position:relative;padding:96px 56px 80px;overflow:hidden;text-align:left}.phero>*{position:relative}.phero .gridbg{position:absolute}
.crumbs{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);margin-bottom:22px}.phero .row{margin-bottom:22px}
/* sections */
.sec{position:relative;padding:96px 56px;border-top:1px solid var(--line)}
.sec-head{margin-bottom:44px}
.statement{text-align:center;padding:10px 0}.serif-xl{font:400 54px/1.12 'Instrument Serif',serif;max-width:980px;margin:0 auto 26px}
.serif-lg{font:400 34px/1.25 'Instrument Serif',serif;margin:10px 0 28px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:56px}.g2.center{align-items:center}.g2.top{align-items:start}.g2.tight{gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.g3.tight{gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.card{position:relative;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--line);border-radius:20px;padding:26px}
.card .num{position:absolute;top:24px;right:24px;font:400 22px 'Instrument Serif',serif;color:var(--dim)}
.ic{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;color:var(--cyan);background:rgba(65,217,236,.08);border:1px solid rgba(65,217,236,.22)}.ic.big{width:64px;height:64px;border-radius:18px}
.more{display:inline-flex;gap:6px;align-items:center;font-size:13px;font-weight:600;color:var(--cyan);margin-top:6px}
.row-card{display:flex;gap:18px;align-items:flex-start}.row-card h4{margin-top:4px}
/* project cards */
.pcard,.acard{background:var(--card);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.pcover{height:200px;position:relative;display:grid;place-items:center}.pcover .chip{position:absolute;top:14px;right:14px}
.pcover-ic{color:rgba(255,255,255,.5)}
.c-energy{background:radial-gradient(circle at 30% 20%,rgba(243,183,101,.45),transparent 55%),radial-gradient(circle at 80% 90%,rgba(65,217,236,.35),transparent 55%),#0b1730}
.c-ai{background:radial-gradient(circle at 70% 20%,rgba(139,123,255,.45),transparent 55%),radial-gradient(circle at 20% 90%,rgba(65,217,236,.35),transparent 55%),#0b1430}
.c-health{background:radial-gradient(circle at 30% 30%,rgba(120,230,150,.38),transparent 55%),radial-gradient(circle at 80% 85%,rgba(51,212,177,.35),transparent 55%),#0a1a26}
.c-product{background:radial-gradient(circle at 60% 30%,rgba(255,140,170,.32),transparent 55%),radial-gradient(circle at 20% 80%,rgba(65,217,236,.3),transparent 55%),#0d1430}
.pbody{padding:22px 22px 24px}.pbody h4{font-size:18px;margin:14px 0 8px}
.sector{font-size:12px;color:var(--muted);font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.seek{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:13px;font-weight:600;display:flex;gap:10px}.seek span{color:var(--dim);font-weight:500}
.stage{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.05);color:#c9d3e3}.stage i{width:7px;height:7px;border-radius:50%;background:#8e9bb2}
.s-research i{background:#6aa8ff}.s-development i,.s-prototype i{background:var(--cyan)}.s-patent-pending i{background:var(--amber)}.s-ready i{background:#5fe39a}.s-concept i{background:#a8b3c6}
.note{display:flex;gap:8px;align-items:center;margin-top:26px;font-size:13.5px;color:var(--muted)}.note svg{color:var(--teal)}
/* pipeline */
.pipe{display:grid;grid-template-columns:repeat(6,1fr);gap:18px;position:relative}.pipe::before{content:"";position:absolute;top:21px;left:6%;right:6%;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),var(--teal),transparent)}
.step{text-align:center;position:relative}.dot{width:44px;height:44px;border-radius:50%;display:inline-grid;place-items:center;font-weight:700;font-size:14px;background:var(--bg);border:1px solid rgba(65,217,236,.5);color:var(--cyan);box-shadow:0 0 24px rgba(65,217,236,.2)}
.founder{display:flex;gap:64px;align-items:center;max-width:1040px;margin:0 auto}.founder svg{color:var(--cyan)}
.sig{display:flex;align-items:center;gap:22px}.sig div{display:flex;flex-direction:column}.signature{font:italic 400 38px 'Instrument Serif',serif;color:#cfe9f2;opacity:.85}
.cta{position:relative;overflow:hidden;display:flex;justify-content:space-between;align-items:center;gap:40px;padding:64px;border-radius:28px;border:1px solid var(--line2);background:linear-gradient(120deg,#0b1932,#081223)}.cta>div{position:relative}.cta .h2{max-width:640px}
.cta-glow{position:absolute;inset:0;background:radial-gradient(500px 300px at 90% 0%,rgba(65,217,236,.22),transparent 60%),radial-gradient(400px 300px at 0% 100%,rgba(51,212,177,.12),transparent 60%)}
/* about */
.facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin:26px 0}.facts div{background:var(--card);padding:16px 18px;display:flex;flex-direction:column;gap:2px}
.socials{display:flex;gap:10px;margin-top:20px}.socials span{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--line2);color:#c4cfe0}.socials.big span{width:44px;height:44px}
.timeline{display:grid;grid-template-columns:repeat(5,1fr);gap:18px;position:relative;padding-top:26px}.timeline::before{content:"";position:absolute;top:31px;left:0;right:0;height:1px;background:var(--line2)}
.tl .dot{width:12px;height:12px;display:block;margin-bottom:22px;box-shadow:0 0 0 5px rgba(65,217,236,.12);background:var(--cyan)}
/* innovation */
.vsteps{display:flex;flex-direction:column}.vstep{display:flex;gap:22px;padding:26px 0;border-bottom:1px solid var(--line)}.vstep:first-child{padding-top:0}.vstep h4{margin-top:8px}
.ticks{list-style:none;padding:0;margin:12px 0 0;display:flex;flex-direction:column;gap:8px;font-size:13.5px;color:var(--muted)}.ticks li::before{content:"✓";color:var(--teal);margin-right:9px;font-weight:700}.ticks.lg{font-size:16px;gap:14px;margin-top:24px}
.ipbox{display:grid;grid-template-columns:auto 1fr;gap:28px;padding:48px;border-radius:28px;background:linear-gradient(120deg,#0c1a33,#09122a);border:1px solid var(--line2)}.ipbox .g3{grid-column:1/-1;margin-top:8px}
.mini{display:flex;flex-direction:column;gap:4px;padding:18px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid var(--line)}
/* projects */
.filters{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;gap:16px}
.fchip{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:500;padding:9px 16px;border-radius:999px;border:1px solid var(--line2);color:var(--muted)}.fchip.on{background:var(--text);color:var(--bg);border-color:var(--text);font-weight:600}.fchip.ghost{border-style:dashed}
.legend{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}.arrow{color:var(--dim)}
/* detail */
.detail{display:grid;grid-template-columns:1fr 340px;gap:56px;align-items:start}.block{margin-bottom:34px}
.side{position:sticky;top:20px;padding:28px;border-radius:22px;background:var(--card);border:1px solid var(--line2)}.side h5{margin:0 0 14px}
.kv{display:flex;flex-direction:column;gap:2px;padding:12px 0;border-bottom:1px solid var(--line)}.kv b{font-size:14.5px}
.tracker{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.tk span{display:block;height:6px;border-radius:9px;background:rgba(255,255,255,.08);margin-bottom:12px}.tk.done span{background:var(--grad)}.tk b{font-size:13.5px;color:var(--muted);font-weight:600}.tk.done b{color:var(--text)}.tk.now b::after{content:" · now";color:var(--cyan)}
/* investment */
.table{border:1px solid var(--line);border-radius:20px;overflow:hidden}.tr{display:grid;grid-template-columns:2fr 1.3fr 1.1fr 1.6fr 40px;gap:16px;align-items:center;padding:20px 26px;border-top:1px solid var(--line);font-size:14.5px}.tr.th{border-top:0;background:rgba(255,255,255,.03);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);font-weight:600}.go{color:var(--cyan)}
.s4{position:relative;padding:28px;border-radius:20px;border:1px solid var(--line)}.s4 h4{margin-top:18px}
/* partnerships */
.card .bg{margin-top:16px;padding:16px;border-radius:14px;background:rgba(255,255,255,.03)}.card .bg p{margin:2px 0 10px}
.logos{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
/* insights */
.feat{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center}.feat .h2{margin-top:16px}.meta{font-size:13px;color:var(--dim);margin:6px 0 22px}
.acard .pbody h4{font-size:17px;line-height:1.35}
.news{display:flex;justify-content:space-between;align-items:center;gap:30px;padding:40px 48px;border-radius:24px;border:1px solid var(--line2);background:var(--card)}
.input{display:flex;align-items:center;height:50px;padding:0 18px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid var(--line2);color:var(--dim);font-size:14.5px;min-width:280px}.input.area{height:140px;align-items:flex-start;padding-top:16px}
/* contact */
.contact{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:start}
.form{display:flex;flex-direction:column;gap:10px;padding:40px;border-radius:24px;background:var(--card);border:1px solid var(--line)}.form label{font-size:13px;font-weight:600;color:#c4cfe0;margin-top:12px}.form .input{min-width:0}.form .btn{align-self:flex-start;margin-top:14px}
.check{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--muted);margin-top:12px}.box{width:20px;height:20px;border-radius:6px;background:var(--grad);display:grid;place-items:center;color:#04121a}
.cpanel{padding:32px;border-radius:24px;border:1px solid var(--line2);background:linear-gradient(180deg,#0c1a33,#09122a)}.cpanel h5{margin:0 0 10px}.kv2{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}.kv2 svg{color:var(--cyan);flex:none}.kv2 div{display:flex;flex-direction:column}
/* footer */
.ftr{border-top:1px solid var(--line);padding:64px 56px 32px;background:var(--bg2)}.ftr-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px}.ftr-brand p{max-width:320px;margin-top:18px;font-size:14px}
.ftr-col{display:flex;flex-direction:column;gap:12px;font-size:14px;color:var(--muted)}.ftr-col a{display:flex;gap:8px;align-items:center}
.ftr-bot{display:flex;justify-content:space-between;margin-top:56px;padding-top:24px;border-top:1px solid var(--line);font-size:12.5px;color:var(--dim)}
/* ---------- mobile (container query) ---------- */
@container page (max-width:640px){
  .hdr{padding:0 20px;height:66px}.nav,.lang,.hdr-r .btn{display:none}.burger{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;border:1px solid var(--line2)}
  .logo-sub{display:none}
  .hero{padding:44px 20px 52px}.hero-grid{grid-template-columns:1fr;gap:10px}.hero-vis{order:-1;height:300px}.ph.arch{width:220px;height:270px}.ring{width:280px;height:280px}
  .f1{top:20px;left:0}.f2{top:130px;right:0}.f3{bottom:16px;left:12px}.float{font-size:11.5px;padding:7px 10px}
  .h1.xl,.h1{font-size:44px}.h2{font-size:34px}.lead{font-size:16.5px}.serif-xl{font-size:34px}.serif-lg{font-size:25px}
  .hero .row{flex-direction:column;align-items:stretch}.btn{justify-content:center}
  .sec{padding:64px 20px}.sec-head{margin-bottom:28px}.sec-head.row{flex-direction:column;align-items:flex-start}
  .g2,.g3,.g4,.g5{grid-template-columns:1fr}
  .pipe{grid-template-columns:1fr;gap:0}.pipe::before{left:21px;right:auto;top:20px;bottom:20px;width:1px;height:auto;background:linear-gradient(180deg,var(--cyan),var(--teal))}
  .step{display:grid;grid-template-columns:44px 1fr;column-gap:16px;text-align:left;padding-bottom:18px}.step .dot{grid-row:span 2}.step h5{margin-top:10px}
  .founder{flex-direction:column;gap:28px}.sig{flex-direction:column;align-items:flex-start;gap:6px}.hero .anno{top:auto;bottom:12px}.ph.sq{width:100%;height:300px}
  .cta{flex-direction:column;align-items:stretch;padding:36px 24px}.cta .row{flex-direction:column;align-items:stretch}
  .ftr{padding:48px 20px 28px}.ftr-top{grid-template-columns:1fr 1fr}.ftr-brand{grid-column:1/-1}.ftr-bot{flex-direction:column;gap:8px}
  .pillstrip{margin-top:30px}
}
`

// ---------- assemble ----------
const frame = (p, mobile = false) => `
<section class="frame ${mobile ? 'm' : ''}" id="${p.id}${mobile ? '-mobile' : ''}">
  <div class="flabel">${p.label}${mobile ? ' (mobile)' : ''} <code>${p.route}</code></div>
  <div class="page">${header(p.active)}${p.body}${footer}</div>
</section>`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEEH Wireframes</title><style>${css}</style></head>
<body><div class="board">
${pages.map((p) => frame(p)).join('\n')}
${frame(pages[0], true)}
</div></body></html>`

writeFileSync(join(here, 'sketches.html'), html)
console.log('wrote sketches.html', (html.length / 1024).toFixed(0) + 'KB', pages.map((p) => p.id).join(', '))
