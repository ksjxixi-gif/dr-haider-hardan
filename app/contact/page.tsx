import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Clock, Lock, Mail, MapPin } from 'lucide-react'
import { site } from '@/content/site'
import { img } from '@/content/images'
import { PageHero } from '@/components/ui'
import { ContactForm } from '@/components/ContactForm'
import { socialLinks } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SEEH and Dr. Haider N. Hardan about investment, partnerships, manufacturing, research or media.',
}

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let’s build something <span className="sun-text">that matters.</span></>}
        intro="Investment, partnership, manufacturing, research or media. Tell us what you have in mind and we’ll route it to the right conversation."
        image={img.powerSunset}
      />

      <section className="bg-soft py-16 md:py-24">
        <div className="wrap grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="card p-6 md:p-10">
            <h2 className="h3 !text-[1.5rem]">Send us a message</h2>
            <p className="mt-1 text-body">Fields marked * are required.</p>
            <div className="mt-8">
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <h2 className="h3">Direct contact</h2>
              <ul className="mt-5 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand"><Mail size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">Email</p>
                    <a href={`mailto:${site.email}`} className="font-semibold hover:text-brand">{site.email}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><MapPin size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">Location</p>
                    <p className="font-semibold">{site.location}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-leaf"><Clock size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">Response</p>
                    <p className="font-semibold">We reply to every serious enquiry</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="h3">Follow</h2>
              <ul className="mt-4 divide-y divide-line">
                {socialLinks.map(({ href, label, handle, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 hover:text-brand">
                      <Icon size={18} /> <span className="font-medium">{label}</span> <span className="ml-auto text-sm text-body">{handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 rounded-[20px] bg-navy-900 p-7 text-white">
              <Lock size={22} className="mt-1 shrink-0 text-amber-300" aria-hidden />
              <p className="text-[15px] leading-7 text-slate-300">
                <span className="font-semibold text-white">Confidential project?</span> Tick the NDA option and we’ll arrange a mutual
                agreement before anything sensitive is shared.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
