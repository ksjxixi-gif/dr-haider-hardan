import { BrainCircuit, Leaf, Lightbulb, Sun, TrendingUp } from 'lucide-react'
import type { SectorKey } from '@/content/site'

const map = {
  energy: { Icon: Sun, fg: '#d97706', bg: '#fef3c7' },
  ai: { Icon: BrainCircuit, fg: '#1673e6', bg: '#dbeafe' },
  health: { Icon: Leaf, fg: '#16a34a', bg: '#dcfce7' },
  inventions: { Icon: Lightbulb, fg: '#ea580c', bg: '#ffedd5' },
  business: { Icon: TrendingUp, fg: '#0891b2', bg: '#cffafe' },
} as const

export function SectorIcon({ sector, size = 22, plain = false, className = '' }: { sector: SectorKey; size?: number; plain?: boolean; className?: string }) {
  const { Icon, fg, bg } = map[sector]
  if (plain) return <Icon size={size} strokeWidth={1.8} color="currentColor" aria-hidden className={className} />
  return (
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${className}`} style={{ background: bg }}>
      <Icon size={size} strokeWidth={1.9} color={fg} aria-hidden />
    </span>
  )
}
