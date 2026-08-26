import type { LucideIcon } from 'lucide-react'

type SkillBadgeProps = {
  label: string
  icon?: LucideIcon
}

export default function SkillBadge({ label, icon: Icon }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-orange-400/30 hover:bg-orange-500/10">
      {Icon ? <Icon size={14} className="text-orange-300" /> : null}
      {label}
    </span>
  )
}
