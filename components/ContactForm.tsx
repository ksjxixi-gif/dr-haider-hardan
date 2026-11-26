'use client'

import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'
import { topicLabels, topics } from '@/lib/contact-schema'
import { projectsAr, topicLabelsAr } from '@/content/i18n'
import { useLang } from './LanguageProvider'

type Topic = (typeof topics)[number]

export function ContactForm() {
  const params = useSearchParams()
  const initial = params.get('topic') as Topic | null
  const project = params.get('project') ?? ''
  const [topic, setTopic] = useState<Topic>(initial && topics.includes(initial) ? initial : 'investment')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const { isAr } = useLang()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          topic,
          name: f.get('name'),
          email: f.get('email'),
          organisation: f.get('organisation'),
          country: f.get('country'),
          message: f.get('message'),
          project,
          nda: f.get('nda') === 'on',
          website: f.get('website'),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || (isAr ? 'حدث خطأ ما.' : 'Something went wrong.'))
      setState('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : (isAr ? 'حدث خطأ ما.' : 'Something went wrong.'))
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf text-white">
          <Check size={28} strokeWidth={3} aria-hidden />
        </span>
        <p className="h3 mt-5 !text-[1.5rem]">{isAr ? 'شكراً لك، تم استلام رسالتك.' : 'Thank you, message received.'}</p>
        <p className="mt-2 text-body">{isAr ? 'سنراجعها ونتواصل معك قريباً.' : 'We’ll review it and get back to you shortly.'}</p>
      </div>
    )
  }

  const projectDisplay = project
    ? isAr && projectsAr[project]
      ? projectsAr[project].title
      : project.replace(/-/g, ' ')
    : ''

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <fieldset>
        <legend className="label">{isAr ? 'ما موضوع استفسارك؟ *' : 'What is your enquiry about? *'}</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`h-10 rounded-full px-4 text-[15px] font-medium transition-colors ${
                topic === t ? 'bg-brand text-white' : 'border border-line bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              {isAr ? topicLabelsAr[t] : topicLabels[t]}
            </button>
          ))}
        </div>
      </fieldset>

      {project && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-[15px] text-amber-900">
          {isAr ? 'بخصوص المشروع: ' : 'About project: '}
          <span className="font-semibold capitalize">{projectDisplay}</span>
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">{isAr ? 'الاسم الكامل *' : 'Full name *'}</label>
          <input id="cf-name" name="name" required minLength={2} maxLength={120} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="cf-email" className="label">{isAr ? 'البريد الإلكتروني *' : 'Email *'}</label>
          <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="cf-org" className="label">{isAr ? 'المؤسسة / الشركة' : 'Organisation'}</label>
          <input id="cf-org" name="organisation" maxLength={160} autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor="cf-country" className="label">{isAr ? 'الدولة' : 'Country'}</label>
          <input id="cf-country" name="country" maxLength={80} autoComplete="country-name" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-msg" className="label">{isAr ? 'الرسالة *' : 'Message *'}</label>
        <textarea
          id="cf-msg"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="field resize-y"
          placeholder={isAr ? 'أخبرنا باختصار عما يدور في ذهنك' : 'Tell us briefly what you have in mind'}
        />
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[15px] text-body">
        <input type="checkbox" name="nda" defaultChecked={topic === 'nda'} className="mt-1 h-4 w-4 accent-[#1673e6]" />
        {isAr ? 'أرغب في مناقشة التفاصيل السرية بموجب اتفاقية عدم إفصاح متبادلة (NDA)' : 'I’d like to discuss confidential details under a mutual NDA'}
      </label>

      {state === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
        {state === 'sending' ? (isAr ? 'جارٍ الإرسال…' : 'Sending…') : (isAr ? 'إرسال الرسالة' : 'Send message')}
        <Send size={17} aria-hidden />
      </button>
    </form>
  )
}
