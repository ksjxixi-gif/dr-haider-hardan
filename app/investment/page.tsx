import type { Metadata } from 'next'
import { InvestmentContent } from './InvestmentContent'

export const metadata: Metadata = {
  title: 'Business & Investment',
  description: 'Invest in, license or co-develop SEEH ventures across clean energy, AI and health.',
}

export default function Investment() {
  return <InvestmentContent />
}
