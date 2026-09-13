import type { LucideIcon } from 'lucide-react'

type SkillBadgeProps = {
  label: string
  icon?: LucideIcon
}

export default function SkillBadge({ label, icon: Icon }: SkillBadgeProps) {
  return (
    <span className="premium-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out">
      {Icon ? <Icon size={14} className="text-[--accent-primary]" /> : null}
      {label}
    </span>
  )
}
