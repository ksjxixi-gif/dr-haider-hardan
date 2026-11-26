import type { Metadata } from 'next'
import { AboutContent } from './AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description: 'Dr. Haider N. Hardan: entrepreneur, inventor and founder of SEEH, Sustainability, Entrepreneurship, Energy & Health.',
}

export default function About() {
  return <AboutContent />
}
