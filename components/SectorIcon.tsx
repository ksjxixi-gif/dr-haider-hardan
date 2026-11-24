import { BrainCircuit, Leaf, Lightbulb, Sun, TrendingUp } from 'lucide-react'
import type { SectorKey } from '@/content/site'

const map = {
  energy: { Icon: Sun, color: '#ffb547' },
  ai: { Icon: BrainCircuit, color: '#3dd5f3' },
  health: { Icon: Leaf, color: '#5ee38f' },
  inventions: { Icon: Lightbulb, color: '#ffd27a' },
  business: { Icon: TrendingUp, color: '#7fb2ff' },
} as const

export function SectorIcon({ sector, size = 22, boxed = false }: { sector: SectorKey; size?: number; boxed?: boolean }) {
  const { Icon, color } = map[sector]
  const icon = <Icon size={size} strokeWidth={1.5} color={color} aria-hidden="true" />
  if (!boxed) return icon
  return (
    <span
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border"
      style={{ borderColor: `${color}55`, background: `radial-gradient(circle at 30% 30%, ${color}22, transparent 70%)` }}
    >
      {icon}
    </span>
  )
}

export const sectorColor = (s: SectorKey) => map[s].color
