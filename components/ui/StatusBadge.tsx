type StatusBadgeProps = {
  status: 'Live' | 'In Development'
}

const badgeStyles = {
  Live: 'bg-sky-500/10 text-sky-300 border border-sky-400/20',
  'In Development': 'bg-indigo-500/10 text-indigo-300 border border-indigo-400/20',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status]}`}>
      {status}
    </span>
  )
}
