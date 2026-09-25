type StatusBadgeProps = {
  status: 'Live' | 'In Development'
}

const badgeStyles = {
  Live: 'bg-[rgba(56,189,248,0.12)] text-[--success] border border-[rgba(56,189,248,0.25)]',
  'In Development': 'bg-[rgba(1,138,190,0.14)] text-[--accent-primary] border border-[rgba(1,138,190,0.28)]',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status]}`}>
      {status}
    </span>
  )
}
