import type { Tool } from '@/config/tools'
import StatusBadge from './StatusBadge'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="glass-card p-5 flex flex-col h-full">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0" role="img" aria-label={tool.name}>
            {tool.icon}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white/90 truncate">
              {tool.name}
            </h3>
            <StatusBadge status={tool.status} />
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${tool.name}`}
          className="flex-shrink-0 ml-2 p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-white/30 hover:text-sky-300 border border-transparent hover:border-sky-500/30 transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Description */}
      <p className="text-xs text-white/45 leading-relaxed flex-1 mb-3">
        {tool.description}
      </p>

      {/* Grafana sub-dashboards */}
      {tool.subLinks && tool.subLinks.length > 0 && (
        <div className="mt-auto pt-3 border-t border-white/[0.06]">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-2">
            Dashboards
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tool.subLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded-md bg-sky-500/10 hover:bg-sky-500/20 text-sky-300/60 hover:text-sky-200 border border-sky-500/10 hover:border-sky-400/30 transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
