import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400-italic.css'
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

export const viewport: Viewport = { themeColor: '#0a0908' }

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
      sameAs: [site.socials.linkedin, site.socials.x],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
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
