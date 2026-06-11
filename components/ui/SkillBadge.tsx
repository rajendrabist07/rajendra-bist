import type { LucideIcon } from 'lucide-react'

type SkillBadgeProps = {
  label: string
  icon?: LucideIcon
}

export default function SkillBadge({ label, icon: Icon }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:border-indigo-400/30 hover:bg-indigo-500/10">
      {Icon ? <Icon size={14} className="text-indigo-300" /> : null}
      {label}
    </span>
  )
}
