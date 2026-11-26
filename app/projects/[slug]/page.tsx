import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/content/projects'
import { sectors } from '@/content/site'
import { ProjectDetailContent } from './ProjectDetailContent'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const p = getProject((await params).slug)
  return p ? { title: p.title, description: p.summary } : {}
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const sector = sectors.find((s) => s.key === p.sector)!
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3)

  return <ProjectDetailContent project={p} sectorTitle={sector.title} related={related} />
}
