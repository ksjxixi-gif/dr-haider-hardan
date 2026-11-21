// Three hero directions for the SEEH homepage. node design/heroes/build.mjs [fontsDir]
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const extra = process.argv[2] // node_modules dir holding the extra fonts
const b64 = (p) => readFileSync(p).toString('base64')
const ff = (fam, file, w = 400, s = 'normal') =>
  `@font-face{font-family:'${fam}';src:url(data:font/woff2;base64,${b64(file)}) format('woff2');font-weight:${w};font-style:${s}}`
const cg = (w, s) => join(extra, '@fontsource/cormorant-garamond/files', `cormorant-garamond-latin-${w}-${s}.woff2`)
const fonts = [
  ff('Cormorant', cg(300, 'normal'), 300), ff('Cormorant', cg(400, 'normal'), 400), ff('Cormorant', cg(300, 'italic'), 300, 'italic'), ff('Cormorant', cg(400, 'italic'), 400, 'italic'),
  ff('Inter', join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'), '100 900'),
  ff('Instrument Serif', join(root, 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')),
  ff('Instrument Serif', join(root, 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2'), 400, 'italic'),
  ff('Inter Tight', join(extra, '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2'), '100 900'),
  ff('JetBrains Mono', join(extra, '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'), '100 800'),
].join('\n')

const sectors = ['Clean Energy', 'Artificial Intelligence', 'Health & Nutrition', 'Inventions', 'Business Development']

/* ---------------- A · Black & Gold ---------------- */
const A = `
<section class="frame A" id="a-black-gold">
  <div class="grain"></div>
  <header><div class="mark"><svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="#c9a96e" stroke-width="1.3"><path d="M16 3S7 13.5 7 19.5a9 9 0 0 0 18 0C25 13.5 16 3 16 3Z"/><path d="M12 23c0-5 3.5-8 8-8 0 4.5-3 8-8 8Z"/></svg><span>SEEH</span></div>
    <nav><a>About</a><a>Innovation</a><a>Projects</a><a>Investment</a><a>Partnerships</a><a>Insights</a></nav>
    <div class="r"><span class="lang">EN — ع</span><a class="contact">Contact</a></div></header>
  <div class="body">
    <div class="copy">
      <p class="kicker">Sustainability for Energy &amp; Health</p>
      <h1>Where bold ideas<br>become <em>industries.</em></h1>
      <p class="sub">Dr. Haider N. Hardan, entrepreneur, inventor and founder of SEEH, builds ventures in clean energy, artificial intelligence and health for global markets.</p>
      <div class="ctas"><a class="btn">Partner with us</a><a class="link">Explore the work <span>→</span></a></div>
    </div>
    <figure class="portrait"><div class="img"><span>Portrait</span></div><figcaption><b>Dr. Haider N. Hardan</b><i>Founder · Jordan</i></figcaption></figure>
  </div>
  <ol class="index">${sectors.map((s, i) => `<li><span>0${i + 1}</span>${s}</li>`).join('')}</ol>
</section>`

/* ---------------- B · Light Editorial ---------------- */
const B = `
<section class="frame B" id="b-light-editorial">
  <header><div class="mark"><b>SEEH</b><span>Sustainability for<br>Energy &amp; Health</span></div>
    <nav><a>About</a><a>Innovation</a><a>Projects</a><a>Investment</a><a>Partnerships</a><a>Insights</a></nav>
    <div class="r"><span>EN / ع</span><a class="btn">Contact</a></div></header>
  <h1>Turning ideas into<br><em>sustainable</em> value.</h1>
  <div class="grid">
    <div class="who"><b>Dr. Haider N. Hardan</b><span>Entrepreneur, inventor &amp;<br>founder of SEEH</span></div>
    <p>We take unconventional ideas from first concept to patent, manufacturing and market, in clean energy, artificial intelligence and health. And we're looking for partners who see it early.</p>
    <a class="go">Start a conversation <span>↗</span></a>
  </div>
  <div class="strip">
    <figure class="p1"><div class="ph"></div><figcaption><span>01</span>Clean &amp; renewable energy</figcaption></figure>
    <figure class="p2"><div class="ph"></div><figcaption><span>02</span>AI &amp; technology</figcaption></figure>
    <figure class="p3"><div class="ph"></div><figcaption><span>03</span>Health &amp; nutrition</figcaption></figure>
    <figure class="p4"><div class="ph"><i>Founder portrait</i></div><figcaption><span>—</span>The founder</figcaption></figure>
  </div>
</section>`

/* ---------------- C · Bold Tech ---------------- */
const rays = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2, r1 = 150, r2 = i % 6 === 0 ? 262 : i % 2 === 0 ? 228 : 205
  return `<line x1="${(300 + Math.cos(a) * r1).toFixed(1)}" y1="${(300 + Math.sin(a) * r1).toFixed(1)}" x2="${(300 + Math.cos(a) * r2).toFixed(1)}" y2="${(300 + Math.sin(a) * r2).toFixed(1)}"/>`
}).join('')
const C = `
<section class="frame C" id="c-bold-tech">
  <header><div class="mark"><span class="sq"></span>SEEH<i>/</i><em>Sustainability for Energy &amp; Health</em></div>
    <nav><a>About</a><a>Innovation</a><a>Projects</a><a>Investment</a><a>Partnerships</a><a>Insights</a></nav>
    <a class="btn">Get in touch ↗</a></header>
  <div class="meta"><span>[ JO · MENA · GLOBAL ]</span><span>FOUNDER — DR. HAIDER N. HARDAN</span><span>R&amp;D / VENTURES / IP</span></div>
  <div class="main">
    <h1>We build what<br>markets don’t<br><span class="hl">have yet.</span></h1>
    <svg class="sun" viewBox="0 0 600 600" fill="none"><g stroke="#0b0b0b" stroke-width="1.2">${rays}</g>
      <circle cx="300" cy="300" r="120" stroke="#0b0b0b" stroke-width="1.2"/><circle cx="300" cy="300" r="82" fill="#c8ff2e"/><circle cx="300" cy="300" r="290" stroke="#0b0b0b" stroke-dasharray="2 6"/>
      <circle cx="505" cy="95" r="7" fill="#0b0b0b"/><text x="520" y="88" font-family="JetBrains Mono" font-size="12" fill="#0b0b0b">AI</text>
      <circle cx="80" cy="470" r="7" fill="#0b0b0b"/><text x="20" y="500" font-family="JetBrains Mono" font-size="12" fill="#0b0b0b">HEALTH</text></svg>
  </div>
  <div class="foot">
    <p>Entrepreneur, inventor and founder of SEEH. Turning unconventional ideas into protected, manufacturable products across energy, AI and health.</p>
    <div class="cols">${sectors.map((s, i) => `<div><span>[0${i + 1}]</span>${s}</div>`).join('')}</div>
  </div>
</section>`

const css = `${fonts}
*{box-sizing:border-box;margin:0;padding:0}a{color:inherit;text-decoration:none}
body{background:#2a2a2a;display:flex;flex-direction:column;align-items:center;gap:60px;padding:60px}
.frame{width:1440px;height:900px;position:relative;overflow:hidden}

/* A */
.A{background:#0a0908;color:#efe8dc;font-family:Inter,sans-serif}
.A .grain{position:absolute;inset:0;opacity:.06;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")}
.A::after{content:"";position:absolute;right:-200px;top:-200px;width:900px;height:900px;background:radial-gradient(closest-side,rgba(201,169,110,.10),transparent);pointer-events:none}
.A header{position:relative;display:flex;align-items:center;justify-content:space-between;padding:40px 72px}
.A .mark{display:flex;align-items:center;gap:14px;letter-spacing:.42em;font-size:14px;font-weight:500}
.A nav{display:flex;gap:40px;font-size:13px;letter-spacing:.08em;color:#a59d90}
.A .r{display:flex;gap:32px;align-items:center;font-size:13px;color:#a59d90}.A .contact{color:#c9a96e;border-bottom:1px solid #c9a96e;padding-bottom:3px;letter-spacing:.08em}
.A .body{position:relative;display:grid;grid-template-columns:1fr 400px;gap:80px;padding:20px 72px 0 120px;align-items:start}
.A .kicker{font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#c9a96e;margin:40px 0 36px}
.A h1{font:300 112px/0.98 Cormorant,serif;letter-spacing:-.015em}.A h1 em{font-style:italic;color:#d8bc85}
.A .sub{max-width:520px;margin-top:40px;font-size:17px;line-height:1.75;color:#a59d90;font-weight:300}
.A .ctas{display:flex;gap:40px;align-items:center;margin-top:48px}
.A .btn{padding:18px 34px;border:1px solid #c9a96e;color:#efe8dc;font-size:13px;letter-spacing:.18em;text-transform:uppercase}
.A .link{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#a59d90}.A .link span{color:#c9a96e;margin-left:8px}
.A .portrait{position:relative;margin-top:10px}
.A .portrait::before{content:"";position:absolute;inset:-18px 18px 18px -18px;border:1px solid rgba(201,169,110,.45)}
.A .img{position:relative;height:480px;background:linear-gradient(170deg,#24201b,#121010 70%);display:grid;place-items:center}.A .img span{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#4e483f}
.A figcaption{display:flex;justify-content:space-between;margin-top:18px;font-size:13px}.A figcaption b{font-weight:500}.A figcaption i{color:#7d766b;font-style:normal}
.A .index{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(5,1fr);list-style:none;border-top:1px solid rgba(201,169,110,.22);padding:0 72px}
.A .index li{padding:26px 0;font-size:13px;letter-spacing:.06em;color:#cfc6b7;display:flex;gap:14px}.A .index li span{color:#c9a96e;font-family:Cormorant,serif;font-size:16px;font-style:italic}

/* B */
.B{background:#f3f1ec;color:#111;font-family:Inter,sans-serif;padding:0 64px}
.B header{display:flex;align-items:center;justify-content:space-between;height:96px;border-bottom:1px solid #111}
.B .mark{display:flex;align-items:center;gap:14px}.B .mark b{font-size:22px;letter-spacing:.06em;font-weight:700}.B .mark span{font-size:10px;line-height:1.3;text-transform:uppercase;letter-spacing:.08em;color:#555;border-left:1px solid #bbb;padding-left:14px}
.B nav{display:flex;gap:34px;font-size:14px}.B .r{display:flex;gap:26px;align-items:center;font-size:13px;color:#555}
.B .btn{background:#111;color:#f3f1ec;padding:12px 22px;border-radius:999px;font-size:14px}
.B h1{font:400 136px/0.92 'Instrument Serif',serif;letter-spacing:-.025em;margin:40px 0 32px}.B h1 em{color:#1e5b46}
.B .grid{display:grid;grid-template-columns:1fr 1.4fr 1fr;gap:48px;align-items:start;padding-top:22px;border-top:1px solid #111}
.B .who{display:flex;flex-direction:column;gap:6px;font-size:15px}.B .who span{color:#555;font-size:14px;line-height:1.5}
.B .grid p{font-size:17px;line-height:1.6;color:#333}
.B .go{justify-self:end;font-size:17px;font-weight:500;border-bottom:1.5px solid #111;padding-bottom:4px}.B .go span{color:#1e5b46}
.B .strip{display:grid;grid-template-columns:1.25fr 1fr 1fr .8fr;gap:14px;margin-top:40px}
.B figure .ph{height:190px}.B figcaption{display:flex;gap:10px;font-size:13px;margin-top:10px;color:#333}.B figcaption span{color:#999}
.B .p1 .ph{background:linear-gradient(160deg,#d9c9a3,#b89a5d 60%,#7a6436)}
.B .p2 .ph{background:linear-gradient(160deg,#c8cdd2,#8a949e)}
.B .p3 .ph{background:linear-gradient(160deg,#a9c2a0,#4f7a5a)}
.B .p4 .ph{background:#d9d5cc;display:grid;place-items:center}.B .p4 i{font-style:normal;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#888}

/* C */
.C{background:#f4f4f1;color:#0b0b0b;font-family:'Inter Tight',sans-serif;padding:0 56px}
.C header{display:flex;align-items:center;justify-content:space-between;height:88px}
.C .mark{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px;letter-spacing:-.01em}.C .mark .sq{width:14px;height:14px;background:#c8ff2e;border:1.5px solid #0b0b0b}.C .mark i{color:#bbb;font-style:normal;font-weight:300}.C .mark em{font-style:normal;font-weight:400;font-size:13px;color:#666}
.C nav{display:flex;gap:30px;font-size:15px;font-weight:500}
.C .btn{background:#0b0b0b;color:#fff;padding:13px 22px;font-weight:600;font-size:14px}
.C .meta{display:flex;justify-content:space-between;font:500 12px 'JetBrains Mono',monospace;letter-spacing:.04em;color:#666;padding:14px 0;border-top:1.5px solid #0b0b0b;border-bottom:1px solid #d6d6d0}
.C .main{display:grid;grid-template-columns:1fr 520px;align-items:center;height:520px}
.C h1{font-weight:650;font-size:128px;line-height:.9;letter-spacing:-.055em}
.C .hl{background:linear-gradient(transparent 58%,#c8ff2e 58%,#c8ff2e 92%,transparent 92%)}
.C .sun{width:520px;height:520px}
.C .foot{display:grid;grid-template-columns:380px 1fr;gap:56px;border-top:1.5px solid #0b0b0b;padding-top:22px}
.C .foot p{font-size:16px;line-height:1.55;color:#333}
.C .cols{display:grid;grid-template-columns:repeat(5,1fr)}.C .cols div{font-weight:600;font-size:15px;padding-left:16px;border-left:1px solid #d6d6d0;display:flex;flex-direction:column;gap:8px}.C .cols span{font:500 12px 'JetBrains Mono',monospace;color:#888}
`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SEEH Hero Directions</title><style>${css}</style></head><body>${A}${B}${C}</body></html>`
writeFileSync(join(here, 'heroes.html'), html)
console.log('ok', (html.length / 1024).toFixed(0) + 'KB')
