import { Resend } from 'resend'
import { contactSchema, topicLabels } from '@/lib/contact-schema'

// Best-effort, per-instance rate limit (5 requests / 10 min / IP).
const hits = new Map<string, number[]>()
const WINDOW = 10 * 60 * 1000
const LIMIT = 5
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > LIMIT
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ')

export async function POST(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Please check the form.' }, { status: 400 })
  }
  const d = parsed.data
  if (d.website) return Response.json({ ok: true }) // bot: pretend success

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO || 'info@seeh.company'
  const from = process.env.CONTACT_FROM || 'SEEH Website <website@seeh.company>'
  if (!key) {
    return Response.json({ error: `The form is not connected yet. Please email ${to} directly.` }, { status: 503 })
  }

  const rows: [string, string][] = [
    ['Topic', topicLabels[d.topic]],
    ['Name', d.name],
    ['Email', d.email],
    ['Organisation', d.organisation],
    ['Country', d.country],
    ['Project', d.project],
    ['Wants NDA', d.nda ? 'Yes' : 'No'],
  ]
  const html = `<table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join('')}</table><p style="white-space:pre-wrap">${esc(d.message)}</p>`

  try {
    const { error } = await new Resend(key).emails.send({
      from,
      to,
      replyTo: d.email,
      subject: oneLine(`[SEEH] ${topicLabels[d.topic]} inquiry from ${d.name}`).slice(0, 200),
      html,
      text: `${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${d.message}`,
    })
    if (error) throw new Error(error.message)
  } catch (e) {
    console.error('contact send failed', e)
    return Response.json({ error: `Message could not be sent. Please email ${to} directly.` }, { status: 502 })
  }
  return Response.json({ ok: true })
}
