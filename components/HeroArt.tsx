// Generative hero scene: sunrise over a solar field, with an AI network in the sky.
// Pure SVG (server-rendered, no JS). Deterministic so server/client always match.

const W = 1600
const H = 900
const HORIZON = 640
const VX = 1150 // vanishing point x
const SUN = { x: 1370, y: HORIZON + 10, r: 150 }

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// perspective scale for a ground y
const scaleAt = (y: number) => (y - (HORIZON - 30)) / (H - (HORIZON - 30))

function solarPanels() {
  const rows: string[] = []
  const ys: number[] = []
  for (let i = 0; i <= 11; i++) ys.push(HORIZON + 8 + (H + 60 - HORIZON) * Math.pow(i / 11, 1.75))
  const PW = 230
  for (let r = 0; r < ys.length - 1; r++) {
    const yt = ys[r]
    const yb = yt + (ys[r + 1] - yt) * 0.7
    const st = scaleAt(yt)
    const sb = scaleAt(yb)
    for (let c = -14; c <= 14; c++) {
      const xl = (s: number) => VX + (c - 0.44) * PW * s
      const xr = (s: number) => VX + (c + 0.44) * PW * s
      const pts = `${xl(st).toFixed(1)},${yt.toFixed(1)} ${xr(st).toFixed(1)},${yt.toFixed(1)} ${xr(sb).toFixed(1)},${yb.toFixed(1)} ${xl(sb).toFixed(1)},${yb.toFixed(1)}`
      if (xr(sb) < -50 || xl(sb) > W + 50) continue
      const midY = (yt + yb) / 2
      const sm = scaleAt(midY)
      rows.push(
        `<polygon points="${pts}" fill="url(#panel)" stroke="rgba(61,213,243,${(0.1 + st * 0.25).toFixed(2)})" stroke-width="${(0.4 + sb).toFixed(2)}"/>` +
          `<line x1="${(VX + c * PW * sm).toFixed(1)}" y1="${yt.toFixed(1)}" x2="${(VX + c * PW * sm).toFixed(1)}" y2="${yb.toFixed(1)}" stroke="rgba(61,213,243,0.12)" stroke-width="${(0.3 + sb * 0.6).toFixed(2)}"/>`,
      )
    }
  }
  return rows.join('')
}

function network() {
  const rand = rng(7)
  const nodes: { x: number; y: number; r: number }[] = []
  while (nodes.length < 30) {
    const x = 640 + rand() * 930
    const y = 50 + rand() * 470
    // keep the area right above the sun a little clearer
    if (Math.hypot(x - SUN.x, y - SUN.y) < 260) continue
    if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 70)) continue
    nodes.push({ x, y, r: 1.6 + rand() * 2.4 })
  }
  const edges = new Set<string>()
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j, d }) => d < 230 && edges.add(i < j ? `${i}-${j}` : `${j}-${i}`))
  })
  let lines = ''
  let k = 0
  for (const e of edges) {
    const [a, b] = e.split('-').map(Number)
    const flow = k++ % 4 === 0
    lines += `<line x1="${nodes[a].x.toFixed(1)}" y1="${nodes[a].y.toFixed(1)}" x2="${nodes[b].x.toFixed(1)}" y2="${nodes[b].y.toFixed(1)}" stroke="rgba(61,213,243,${flow ? 0.55 : 0.18})" stroke-width="${flow ? 1.1 : 0.8}" ${flow ? `class="ha-flow" style="animation-delay:-${(k % 7) * 0.6}s"` : ''}/>`
  }
  const dots = nodes
    .map(
      (n, i) =>
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${i % 5 === 0 ? '#ffd27a' : '#8beaff'}" ${i % 3 === 0 ? `class="ha-pulse" style="animation-delay:-${(i % 6) * 0.7}s"` : ''}/>`,
    )
    .join('')
  return lines + dots
}

const svg = `
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#050a14"/>
    <stop offset="0.45" stop-color="#071328"/>
    <stop offset="0.62" stop-color="#0e1f3e"/>
    <stop offset="0.68" stop-color="#2a2740"/>
    <stop offset="0.712" stop-color="#7a3d1c"/>
  </linearGradient>
  <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#fff6dc"/>
    <stop offset="0.35" stop-color="#ffd27a"/>
    <stop offset="0.7" stop-color="#ffa53e"/>
    <stop offset="1" stop-color="#ff6a24"/>
  </radialGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="rgb(255,150,60)" stop-opacity="0.55"/>
    <stop offset="0.4" stop-color="rgb(255,120,40)" stop-opacity="0.18"/>
    <stop offset="1" stop-color="rgb(255,120,40)" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="reflect" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="rgb(255,170,70)" stop-opacity="0.55"/>
    <stop offset="0.5" stop-color="rgb(255,140,50)" stop-opacity="0.12"/>
    <stop offset="1" stop-color="rgb(255,140,50)" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#14305a"/>
    <stop offset="1" stop-color="#0a1a33"/>
  </linearGradient>
  <linearGradient id="hline" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="rgb(255,180,90)" stop-opacity="0"/>
    <stop offset="0.72" stop-color="rgb(255,190,110)" stop-opacity="0.9"/>
    <stop offset="1" stop-color="rgb(255,180,90)" stop-opacity="0.2"/>
  </linearGradient>
  <clipPath id="below"><rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath>
  <clipPath id="above"><rect x="0" y="0" width="${W}" height="${HORIZON}"/></clipPath>
</defs>
<rect width="${W}" height="${HORIZON}" fill="url(#sky)"/>
<rect y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="#040912"/>
<circle cx="${SUN.x}" cy="${SUN.y}" r="560" fill="url(#glow)" class="ha-breathe"/>
<g clip-path="url(#above)"><circle cx="${SUN.x}" cy="${SUN.y}" r="${SUN.r}" fill="url(#sun)"/></g>
<g>${network()}</g>
<rect x="0" y="${HORIZON - 0.5}" width="${W}" height="1.5" fill="url(#hline)"/>
<g>${solarPanels()}</g>
<ellipse clip-path="url(#below)" cx="${SUN.x}" cy="${HORIZON}" rx="560" ry="260" fill="url(#reflect)" style="mix-blend-mode:screen"/>
`

export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax slice"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
