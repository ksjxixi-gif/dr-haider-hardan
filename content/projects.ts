import type { SectorKey } from './site'

// Add a project = add one object here. Keep public text high-level; real technical
// detail is shared under NDA only.
// TODO(client): confirm each title, stage and "seeking" before launch.

export const stages = ['Concept', 'Research', 'Development', 'Prototype', 'Patent pending', 'Ready'] as const
export type Stage = (typeof stages)[number]

export type Project = {
  slug: string
  title: string
  sector: SectorKey
  stage: Stage
  summary: string
  seeking: string[]
  markets: string
  ip: string
  challenge: string
  opportunity: string
  approach: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'hybrid-energy-system',
    title: 'Hybrid Multi-Source Energy System',
    sector: 'energy',
    stage: 'Research',
    summary: 'Solar and other renewable sources combined with AI in one integrated system, built for higher yield at lower cost.',
    seeking: ['Investment', 'Manufacturing partner'],
    markets: 'MENA · International',
    ip: 'Protection in progress',
    challenge:
      'Most renewable installations rely on a single source and fixed operating rules. Output drops whenever conditions change, and the cost per kilowatt-hour stays higher than it needs to be.',
    opportunity:
      'Demand for clean, affordable and reliable energy is growing fastest in sun-rich regions such as the Middle East. A system that gets more value out of the same footprint opens commercial, industrial and utility-scale markets.',
    approach:
      'The system integrates several energy technologies and uses artificial intelligence to coordinate them, with the aim of improving efficiency and productivity while reducing cost and environmental impact. Technical specifics are available to qualified partners under NDA.',
    featured: true,
  },
  {
    slug: 'ai-smart-facilities',
    title: 'Smart Solutions for Commercial Facilities',
    sector: 'ai',
    stage: 'Concept',
    summary: 'AI applications that help businesses and facilities run leaner, smarter and more efficiently.',
    seeking: ['Technology partner', 'Pilot site'],
    markets: 'MENA',
    ip: 'Confidential',
    challenge:
      'Commercial facilities produce large amounts of operational data, but few decisions are actually driven by it, so energy, time and money are wasted every day.',
    opportunity:
      'Practical, affordable AI for small and mid-sized businesses is still underserved in the region, and early movers can define the category.',
    approach:
      'A set of intelligent services designed around real operational problems rather than technology for its own sake. Concept details are shared under NDA.',
    featured: true,
  },
  {
    slug: 'appetite-management-nutrition',
    title: 'Appetite & Weight-Management Nutrition',
    sector: 'health',
    stage: 'Development',
    summary: 'Healthy food products and techniques designed around satiety, appetite control and healthy weight.',
    seeking: ['Food manufacturer', 'Distribution'],
    markets: 'MENA · International',
    ip: 'Confidential formulation',
    challenge:
      'Weight-related health problems keep rising, and most diet products fail because people cannot sustain them.',
    opportunity:
      'Consumers increasingly want food that works with the body rather than against it, and healthy weight management is one of the fastest-growing nutrition categories worldwide.',
    approach:
      'Products and techniques built on appetite and satiety research, developed for real-world use and scalable manufacturing. Formulation details are confidential.',
    featured: true,
  },
  {
    slug: 'rubber-balloon-endodontic-obturation',
    title: 'Rubber Balloon Endodontic Obturation & Injection Device',
    sector: 'inventions',
    stage: 'Concept',
    summary: 'A dental invention: a new approach to sealing root canals using a rubber balloon system and a dedicated injection device.',
    seeking: ['Medical-device manufacturer', 'Licensing'],
    markets: 'International',
    ip: 'Theoretical description presented publicly',
    challenge:
      'Root-canal filling (obturation) is technique-sensitive. Gaps or voids in the seal can lead to treatment failure and repeat procedures.',
    opportunity:
      'Endodontic treatment is performed millions of times a year worldwide, so a more reliable, easier sealing method has clear commercial value for dental-device makers.',
    approach:
      'A rubber balloon placed in the prepared canal is filled through a purpose-designed injection device so that it adapts to the canal walls. The concept was presented as a scientific poster at a dental conference.',
  },
  {
    slug: 'next-generation-device',
    title: 'Next-Generation Consumer Device',
    sector: 'inventions',
    stage: 'Patent pending',
    summary: 'A new product category in development. Details are shared under NDA only.',
    seeking: ['Investment', 'Licensing'],
    markets: 'International',
    ip: 'Filing in progress',
    challenge: 'Shared under NDA.',
    opportunity: 'A product category with no direct equivalent on the market today.',
    approach: 'Shared with qualified partners under mutual NDA.',
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
