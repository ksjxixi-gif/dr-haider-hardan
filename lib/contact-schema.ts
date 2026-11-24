import { z } from 'zod'

export const topics = ['investment', 'partnership', 'manufacturing', 'research', 'nda', 'media', 'other'] as const
export const topicLabels: Record<(typeof topics)[number], string> = {
  investment: 'Investment',
  partnership: 'Partnership',
  manufacturing: 'Manufacturing',
  research: 'Research',
  nda: 'NDA briefing',
  media: 'Media',
  other: 'Other',
}

const text = (max: number) => z.string().trim().max(max)

export const contactSchema = z.object({
  topic: z.enum(topics),
  name: text(120).min(2, 'Please enter your name'),
  email: z.string().trim().max(200).email('Please enter a valid email'),
  organisation: text(160).optional().default(''),
  country: text(80).optional().default(''),
  message: text(5000).min(10, 'Please write a short message'),
  project: text(120).optional().default(''),
  nda: z.boolean().optional().default(false),
  website: z.string().max(0).optional(), // honeypot: must stay empty
})

export type ContactInput = z.infer<typeof contactSchema>
