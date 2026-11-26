import type { Metadata } from 'next'
import { InnovationContent } from './InnovationContent'

export const metadata: Metadata = {
  title: 'Innovation & R&D',
  description: 'How SEEH turns unconventional ideas into protected, manufacturable and marketable solutions.',
}

export default function Innovation() {
  return <InnovationContent />
}
