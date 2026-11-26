import type { Metadata } from 'next'
import { PartnershipsContent } from './PartnershipsContent'

export const metadata: Metadata = {
  title: 'Strategic Partnerships',
  description: 'SEEH partners with industrial companies, technology firms, research centres, universities, investors and manufacturers.',
}

export default function Partnerships() {
  return <PartnershipsContent />
}
