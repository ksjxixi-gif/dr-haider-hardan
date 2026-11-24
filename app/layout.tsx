import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/sora'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { site } from '@/content/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Dr. Haider N. Hardan · SEEH, Sustainability for Energy & Health', template: '%s · SEEH' },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: 'SEEH',
    title: 'Dr. Haider N. Hardan · SEEH',
    description: site.description,
    images: [{ url: '/images/seeh-banner.webp', width: 1080, height: 381 }],
  },
  twitter: { card: 'summary_large_image', creator: '@DrHaiderHardan1' },
}

export const viewport: Viewport = { themeColor: '#0a1b3d' }

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'SEEH',
      alternateName: 'Sustainability for Energy & Health',
      url: site.url,
      founder: { '@id': `${site.url}/#founder` },
      address: { '@type': 'PostalAddress', addressLocality: 'Amman', addressCountry: 'JO' },
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#founder`,
      name: 'Haider N. Hardan',
      honorificPrefix: 'Dr.',
      jobTitle: 'Founder, SEEH',
      sameAs: Object.values(site.socials),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
