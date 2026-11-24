'use client'

import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { topicLabels, topics } from '@/lib/contact-schema'

type Topic = (typeof topics)[number]

export function ContactForm() {
  const params = useSearchParams()
  const initial = params.get('topic') as Topic | null
  const project = params.get('project') ?? ''
  const [topic, setTopic] = useState<Topic>(initial && topics.includes(initial) ? initial : 'investment')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

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
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setState('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="border rule p-10 md:p-14" role="status">
        <p className="kicker mb-6">Message received</p>
        <p className="h-sec">Thank you.</p>
        <p className="lead mt-6">We’ll review your message and get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate={false}>
      <fieldset>
        <legend className="label mb-5">I’m reaching out about</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`h-10 border px-5 text-xs uppercase tracking-[0.16em] transition-colors ${
                topic === t ? 'border-gold bg-gold text-ink' : 'rule text-muted hover:border-gold hover:text-ivory'
              }`}
            >
              {topicLabels[t]}
            </button>
          ))}
        </div>
      </fieldset>

      {project && (
        <p className="text-sm text-muted">
          Regarding project: <span className="text-gold">{project.replace(/-/g, ' ')}</span>
        </p>
      )}

      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="label">Full name *</span>
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" className="field" />
        </label>
        <label className="block">
          <span className="label">Email *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
        </label>
        <label className="block">
          <span className="label">Organisation</span>
          <input name="organisation" maxLength={160} autoComplete="organization" className="field" />
        </label>
        <label className="block">
          <span className="label">Country</span>
          <input name="country" maxLength={80} autoComplete="country-name" className="field" />
        </label>
      </div>
      <label className="block">
        <span className="label">Message *</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} className="field resize-y" placeholder="Tell us what you have in mind" />
      </label>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex cursor-pointer items-center gap-4 text-sm text-muted">
        <input type="checkbox" name="nda" defaultChecked={topic === 'nda'} className="h-4 w-4 accent-[#ffb547]" />
        I’d like to discuss details under a mutual NDA
      </label>

      {state === 'error' && (
        <p role="alert" className="border-l-2 border-gold pl-4 text-sm text-gold-2">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn btn-gold disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
