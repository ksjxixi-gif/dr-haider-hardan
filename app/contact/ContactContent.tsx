'use client'

import { Suspense } from 'react'
import { Clock, Lock, Mail, MapPin } from 'lucide-react'
import { site } from '@/content/site'
import { img } from '@/content/images'
import { siteAr } from '@/content/i18n'
import { PageHero } from '@/components/ui'
import { ContactForm } from '@/components/ContactForm'
import { socialLinks } from '@/components/icons'
import { useLang } from '@/components/LanguageProvider'

export function ContactContent() {
  const { isAr } = useLang()

  return (
    <>
      <PageHero
        eyebrow={isAr ? 'تواصل معنا' : 'Contact'}
        title={
          isAr ? (
            <>لنبنِ شيئاً <span className="sun-text">ذا أثر.</span></>
          ) : (
            <>Let’s build something <span className="sun-text">that matters.</span></>
          )
        }
        intro={
          isAr
            ? 'استثمار، شراكة، تصنيع، بحث علمي أو إعلام. أخبرنا بما يدور في ذهنك وسنوجّهك إلى المحادثة المناسبة.'
            : 'Investment, partnership, manufacturing, research or media. Tell us what you have in mind and we’ll route it to the right conversation.'
        }
        image={img.powerSunset}
      />

      <section className="border-t border-line bg-white py-16 md:py-24">
        <div className="wrap grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="card p-6 md:p-10">
            <h2 className="h3 !text-[1.5rem]">{isAr ? 'أرسل لنا رسالة' : 'Send us a message'}</h2>
            <p className="mt-1 text-body">{isAr ? 'الحقول المعلّمة بـ * مطلوبة.' : 'Fields marked * are required.'}</p>
            <div className="mt-8">
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <h2 className="h3">{isAr ? 'تواصل مباشر' : 'Direct contact'}</h2>
              <ul className="mt-5 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand"><Mail size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                    <a href={`mailto:${site.email}`} className="font-semibold hover:text-brand">{site.email}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><MapPin size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">{isAr ? 'الموقع' : 'Location'}</p>
                    <p className="font-semibold">{isAr ? siteAr.location : site.location}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-leaf"><Clock size={20} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-body">{isAr ? 'الاستجابة' : 'Response'}</p>
                    <p className="font-semibold">{isAr ? 'نرد على كل استفسار جاد' : 'We reply to every serious enquiry'}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="h3">{isAr ? 'تابعنا' : 'Follow'}</h2>
              <ul className="mt-4 divide-y divide-line">
                {socialLinks.map(({ href, label, handle, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 hover:text-brand">
                      <Icon size={18} /> <span className="font-medium">{label}</span> <span className="ms-auto text-sm text-body">{handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card flex gap-4 p-7 text-ink">
              <Lock size={22} className="mt-1 shrink-0 text-amber-600" aria-hidden />
              <p className="text-[15px] leading-7 text-body">
                <span className="font-semibold text-ink">{isAr ? 'مشروع سري؟ ' : 'Confidential project? '}</span>
                {isAr
                  ? 'حدّد خيار اتفاقية عدم الإفصاح وسنرتب اتفاقية متبادلة قبل مشاركة أي معلومات حساسة.'
                  : 'Tick the NDA option and we’ll arrange a mutual agreement before anything sensitive is shared.'}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
