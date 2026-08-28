type SectionHeaderProps = {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-3xl">
      {subtitle ? (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          {subtitle}
        </p>
      ) : null}
      <h2 className="mt-2.5 fluid-h2 font-black tracking-tight text-white">{title}</h2>
    </div>
  )
}
