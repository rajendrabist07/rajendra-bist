type StatusBadgeProps = {
  status: 'Live' | 'In Development'
}

const badgeStyles = {
  Live: 'bg-[rgba(191,226,216,0.12)] text-[--success] border border-[rgba(191,226,216,0.22)]',
  'In Development': 'bg-[rgba(224,185,166,0.12)] text-[--accent-primary] border border-[rgba(224,185,166,0.24)]',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status]}`}>
      {status}
    </span>
  )
}
