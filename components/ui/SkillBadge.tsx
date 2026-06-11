type SkillBadgeProps = {
  label: string
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10">
      {label}
    </span>
  )
}
