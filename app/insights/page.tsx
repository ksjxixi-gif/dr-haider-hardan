import type { Metadata } from 'next'
import { InsightsContent } from './InsightsContent'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Articles and perspectives from Dr. Haider N. Hardan on clean energy, AI, health and the business of innovation.',
}

export default function Insights() {
  return <InsightsContent />
}
