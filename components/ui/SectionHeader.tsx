type SectionHeaderProps = {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl">
      {subtitle ? <p className="text-sm uppercase tracking-[0.36em] text-slate-500">{subtitle}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    </div>
  )
}
