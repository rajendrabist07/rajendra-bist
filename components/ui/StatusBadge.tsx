type StatusBadgeProps = {
  status: 'Live' | 'In Development'
}

const badgeStyles = {
  Live: 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20',
  'In Development': 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status]}`}>
      {status}
    </span>
  )
}
