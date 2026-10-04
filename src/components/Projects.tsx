import { useRef, useState } from 'react'
import { projects } from '../data/content'
import { ArrowLeft, ArrowRight } from './Icons'
import ProjectVisual from './ProjectVisual'
import SectionHeader from './SectionHeader'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'data', label: 'Data' },
  { id: 'web', label: 'Full-stack' },
] as const

type Filter = (typeof filters)[number]['id']

const pad = (n: number) => String(n).padStart(2, '0')

export default function Projects({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)

  const list = projects.filter((p) => filter === 'all' || p.cat === filter)
  const n = list.length
  const i = ((index % n) + n) % n
  const go = (to: number) => setIndex(((to % n) + n) % n)

  return (
    <section id="projects" className="overflow-hidden bg-ink py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-4 sm:px-10">
        <SectionHeader n="03" label="PROJECTS" title="Things I’ve built">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => { setFilter(f.id); setIndex(0) }}
                aria-pressed={filter === f.id}
                className={`chip ${filter === f.id ? 'chip-on' : 'chip-off'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </SectionHeader>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') go(i - 1)
            if (e.key === 'ArrowRight') go(i + 1)
          }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1)
            touchX.current = null
          }}
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] [--card:88%] md:[--card:74%]"
            style={{ transform: `translateX(calc(${-i} * (var(--card) + 24px)))` }}
          >
            {list.map((p, j) => {
              const active = j === i
              return (
                <article
                  key={p.id}
                  aria-label={`${p.title}, ${j + 1} of ${n}`}
                  className={`relative flex min-w-0 flex-[0_0_var(--card)] flex-wrap overflow-hidden rounded-[22px] border border-line bg-panel transition duration-300 ${active ? 'opacity-100' : 'scale-[.96] opacity-40'}`}
                >
                  <div inert={!active} className="contents">
                  <div className="relative h-[240px] flex-[1_1_340px] border-b border-line sm:h-auto sm:min-h-[420px] md:border-r md:border-b-0">
                    <ProjectVisual p={p} className="absolute inset-0" />
                    {p.badge && (
                      <span className="absolute top-4 left-4 rounded-full bg-warm px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-lg">
                        ★ {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="box-border flex min-w-0 flex-[1_1_340px] flex-col gap-3.5 p-6 sm:p-8">
                    <span className="font-mono text-xs text-muted">{p.date}</span>
                    <h3 className="m-0 font-display text-3xl leading-[1.02] font-extrabold tracking-[-0.025em] sm:text-4xl">{p.title}</h3>
                    <span className="text-[15px] font-medium text-accent">{p.context}</span>
                    <p className="m-0 text-base leading-relaxed text-soft">{p.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
                      <button type="button" onClick={() => onOpen(p.id)} className="btn-acc border-0">Read case study</button>
                      {p.links.slice(0, 2).map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-ghost">{l.label} ↗</a>
                      ))}
                    </div>
                  </div>
                  </div>
                  {!active && (
                    <button
                      type="button"
                      onClick={() => go(j)}
                      aria-label={`Show ${p.title}`}
                      className="absolute inset-0 cursor-pointer border-0 bg-transparent"
                    />
                  )}
                </article>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[13px] text-soft" aria-live="polite">{pad(i + 1)} / {pad(n)}</span>
            <div className="h-[3px] w-[120px] overflow-hidden rounded-sm bg-line sm:w-[200px]">
              <div className="h-full bg-accent transition-[width] duration-400" style={{ width: `${((i + 1) / n) * 100}%` }} />
            </div>
          </div>
          <div className="flex gap-2.5">
            {[
              { label: 'Previous project', icon: <ArrowLeft />, to: i - 1 },
              { label: 'Next project', icon: <ArrowRight />, to: i + 1 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => go(b.to)}
                aria-label={b.label}
                className="flex size-[52px] cursor-pointer items-center justify-center rounded-full border border-line-2 bg-panel text-paper transition hover:border-accent hover:text-accent"
              >
                {b.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
