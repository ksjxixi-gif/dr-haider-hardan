import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { insights } from '@/content/insights'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/innovation', '/projects', '/investment', '/partnerships', '/insights', '/contact']
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.6 })),
    ...insights.map((i) => ({ url: `${site.url}/insights/${i.slug}`, lastModified: i.date, priority: 0.6 })),
  ]
}
