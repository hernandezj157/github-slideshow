import type { ToolStatus } from '@/config/tools'

const config: Record<ToolStatus, { label: string; text: string; dot: string; pulse: boolean }> = {
  online:      { label: 'Online',      text: 'text-emerald-400', dot: 'bg-emerald-400', pulse: true  },
  degraded:    { label: 'Degraded',    text: 'text-yellow-400',  dot: 'bg-yellow-400',  pulse: false },
  offline:     { label: 'Offline',     text: 'text-red-400',     dot: 'bg-red-500',     pulse: false },
  maintenance: { label: 'Maintenance', text: 'text-slate-400',   dot: 'bg-slate-500',   pulse: false },
}

export default function StatusBadge({ status }: { status: ToolStatus }) {
  const { label, text, dot, pulse } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot} ${pulse ? 'animate-pulse' : ''}`} />
      {label}
    </span>
  )
}
