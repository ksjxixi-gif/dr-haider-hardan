import type { Metadata } from 'next'
import { Suspense } from 'react'
import { site } from '@/content/site'
import { PageHero } from '@/components/ui'
import { ContactForm } from '@/components/ContactForm'
import { LinkedInIcon, XIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SEEH and Dr. Haider N. Hardan about investment, partnerships, manufacturing, research or media.',
}

export default function Contact() {
  return (
    <>
      <PageHero kicker="Contact" title={<>Let’s build something <em>that matters.</em></>}>
        Investment, partnership, manufacturing, research or media. Tell us what you have in mind and we’ll route it to the right
        conversation.
      </PageHero>

      <section className="border-t rule-soft py-20 md:py-28">
        <div className="wrap grid gap-20 lg:grid-cols-[1.5fr_1fr] lg:gap-28">
          <Suspense>
            <ContactForm />
          </Suspense>

          <aside className="space-y-10 lg:border-l lg:rule lg:pl-14">
            <div>
              <p className="label mb-3">Email</p>
              <a href={`mailto:${site.email}`} className="font-serif text-2xl hover:text-gold-2">{site.email}</a>
            </div>
            <div>
              <p className="label mb-3">Location</p>
              <p className="font-serif text-2xl">{site.location}</p>
            </div>
            <div>
              <p className="label mb-4">Follow</p>
              <div className="flex flex-col gap-3">
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-gold"><LinkedInIcon /> Dr. Haider N. Hardan</a>
                <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-gold"><XIcon /> @DrHaiderHardan1</a>
              </div>
            </div>
            <p className="border-t rule pt-8 text-sm leading-7 text-dim">
              Confidential details? Tick the NDA option and we’ll arrange a mutual agreement before anything sensitive is shared.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
