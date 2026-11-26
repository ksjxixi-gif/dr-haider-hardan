import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInsight, insights } from '@/content/insights'
import { ArticleContent } from './ArticleContent'

export const dynamicParams = false
export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: PageProps<'/insights/[slug]'>): Promise<Metadata> {
  const a = getInsight((await params).slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { type: 'article', title: a.title, description: a.excerpt, images: a.cover ? [{ url: a.cover.src }] : undefined },
  }
}

export default async function Article({ params }: PageProps<'/insights/[slug]'>) {
  const a = getInsight((await params).slug)
  if (!a) notFound()

  return <ArticleContent article={a} />
}
