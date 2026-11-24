// Central image registry. Stock photos are from Unsplash (free for commercial use).
// Swap any entry for the client's own photo without touching the pages.

export type Img = { src: string; w: number; h: number; alt: string }

const stock = (name: string, w: number, h: number, alt: string): Img => ({ src: `/images/stock/${name}.webp`, w, h, alt })

export const img = {
  heroSolar: stock('solar-sky', 2400, 1597, 'Solar panels under a bright blue sky'),
  solarAerial: stock('solar-aerial', 1800, 1349, 'Aerial view of a solar farm'),
  solarField: stock('solar-field', 1600, 1065, 'Rows of solar panels in a green field'),
  solarInstall: stock('solar-install', 1600, 896, 'Engineer installing a solar panel'),
  windSunset: stock('wind-sunset', 2400, 1600, 'Wind turbines at sunrise over a field'),
  powerSunset: stock('power-sunset', 1600, 1067, 'Power lines at sunset'),
  ai: stock('ai', 1600, 900, 'Abstract artificial intelligence visual'),
  circuit: stock('circuit', 1600, 1067, 'Close-up of an electronic circuit board'),
  earth: stock('earth-network', 2000, 1331, 'Earth at night seen from space, lit by connected cities'),
  healthyBowl: stock('healthy-bowl', 1600, 1067, 'Colourful healthy salad bowl'),
  healthyTable: stock('healthy-table', 1600, 1089, 'Healthy food on a wooden table'),
  lab: stock('lab', 1600, 1067, 'Laboratory glassware'),
  engineerLab: stock('engineer-lab', 1600, 1067, 'Engineer working in a technology lab'),
  inventor: stock('inventor-sketch', 1600, 1067, 'Inventor sketching product designs'),
  city: stock('city', 1600, 1067, 'Modern glass office towers'),
  portrait: { src: '/images/haider-portrait-v2.webp', w: 385, h: 600, alt: 'Portrait of Dr. Haider N. Hardan' },
} satisfies Record<string, Img>

export const sectorImg = {
  energy: img.solarField,
  ai: img.ai,
  health: img.healthyBowl,
  inventions: img.inventor,
  business: img.city,
} as const

const projectImgs: Record<string, Img> = {
  'hybrid-energy-system': img.solarAerial,
  'ai-smart-facilities': img.circuit,
  'appetite-management-nutrition': img.healthyTable,
  'rubber-balloon-endodontic-obturation': {
    src: '/images/poster-endodontic-1.webp',
    w: 960,
    h: 720,
    alt: 'Dr. Haider Hardan presenting the Rubber Balloon Endodontic Obturation invention',
  },
  'next-generation-device': img.engineerLab,
}
export const projectImg = (slug: string, sector: keyof typeof sectorImg): Img => projectImgs[slug] ?? sectorImg[sector]
