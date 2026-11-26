import type { Metadata } from 'next'
import { ProjectsContent } from './ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects & Technologies',
  description: 'Current SEEH projects across clean energy, AI, health and inventions, presented at a high level to protect intellectual property.',
}

export default function Projects() {
  return <ProjectsContent />
}
