'use client'

import { useState, useMemo, useEffect } from 'react'
import { tools, categories } from '@/config/tools'
import type { ToolCategory } from '@/config/tools'
import ToolCard from './ToolCard'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return tools.filter((tool) => {
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      const matchesCategory = !activeCategory || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const onlineCount  = tools.filter((t) => t.status === 'online').length
  const offlineCount = tools.filter((t) => t.status === 'offline').length
  const degradedCount = tools.filter((t) => t.status === 'degraded').length

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="glass-header sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                  d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white/90 leading-tight">NOC Portal</h1>
              <p className="text-[10px] text-white/35 leading-tight">Network Operations Center</p>
            </div>
          </div>

          {/* Status summary */}
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {onlineCount} online
            </span>
            {degradedCount > 0 && (
              <span className="flex items-center gap-1.5 text-yellow-400">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                {degradedCount} degraded
              </span>
            )}
            {offlineCount > 0 && (
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {offlineCount} offline
              </span>
            )}
          </div>

          {/* Search */}
          <div className="relative w-56 flex-shrink-0">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white/80 placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.07] transition-all"
            />
          </div>

          {/* Live clock */}
          <Clock />
        </div>
      </header>

      {/* ── Category filter bar ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-1 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
            !activeCategory
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
          }`}
        >
          All tools
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              activeCategory === cat.id
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* ── Tool grid ──────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto w-full px-6 py-6 flex-1">
        {categories.map((category) => {
          const catTools = filtered.filter((t) => t.category === category.id)
          if (catTools.length === 0) return null
          return (
            <section key={category.id} className="mb-10">
              <h2 className="flex items-center gap-2 text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                <span>{category.icon}</span>
                {category.label}
                <span className="normal-case tracking-normal font-normal text-white/20">
                  — {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-white/25">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-sm">No tools match &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-[11px] text-white/20">
          <span>NOC Portal — Internal Use Only</span>
          <span>
            Edit tool URLs in{' '}
            <code className="font-mono text-white/30">src/config/tools.ts</code>
          </span>
        </div>
      </footer>
    </div>
  )
}

function Clock() {
  const [dt, setDt] = useState({ date: '', time: '' })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setDt({
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour12: false }),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hidden md:block text-right flex-shrink-0" suppressHydrationWarning>
      <div className="text-xs font-mono tabular-nums text-white/60">{dt.time || '--:--:--'}</div>
      <div className="text-[10px] text-white/30">{dt.date}</div>
    </div>
  )
}
