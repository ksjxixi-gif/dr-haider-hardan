import type { Metadata } from 'next'
import { ContactContent } from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SEEH and Dr. Haider N. Hardan about investment, partnerships, manufacturing, research or media.',
}

export default function Contact() {
  return <ContactContent />
}
