import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/content'
import { CloseIcon } from './Icons'
import ProjectVisual from './ProjectVisual'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'approach', label: 'Approach' },
  { id: 'results', label: 'Results' },
] as const

type Tab = (typeof tabs)[number]['id']

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [tab, setTab] = useState<Tab>('overview')

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project) {
      setTab('overview')
      if (!d.open) d.showModal()
      document.body.style.overflow = 'hidden'
    } else if (d.open) {
      d.close()
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <dialog
      ref={ref}
      aria-labelledby="pm-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[880px] overflow-y-auto rounded-[22px] border border-line bg-panel p-0 text-paper shadow-[0_40px_80px_rgba(0,0,0,.6)] backdrop:bg-[rgba(5,6,8,.78)] backdrop:backdrop-blur-sm open:animate-fadeup"
    >
      {project && (
        <div className="flex flex-col gap-6 p-6 sm:p-9">
          <div className="flex items-start justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-muted">CASE STUDY · {project.date}</span>
              <h3 id="pm-title" className="m-0 font-display text-3xl leading-[1.02] font-extrabold tracking-[-0.025em] sm:text-[40px]">{project.title}</h3>
              <span className="text-[15px] text-accent">{project.context}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex size-[46px] flex-none cursor-pointer items-center justify-center rounded-full border border-line-2 bg-ink text-paper hover:border-accent"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line">
            <ProjectVisual p={project} className="absolute inset-0" />
            {project.badge && (
              <span className="absolute top-3 left-3 rounded-full bg-warm px-3 py-1.5 font-mono text-[11px] font-medium text-ink">★ {project.badge}</span>
            )}
          </div>

          <div role="tablist" aria-label="Case study sections" className="flex gap-7 border-b border-line">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="pm-panel"
                onClick={() => setTab(t.id)}
                className={`-mb-px min-h-11 cursor-pointer border-0 border-b-[3px] bg-transparent px-1 py-3 text-[15px] text-paper hover:text-accent ${tab === t.id ? 'border-accent font-semibold' : 'border-transparent'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-8">
            <div id="pm-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="flex min-h-[200px] flex-[999_1_380px] flex-col gap-4">
              {tab === 'overview' &&
                project.overview.map((para) => <p key={para} className="m-0 text-base leading-relaxed text-[#DADCE2]">{para}</p>)}
              {tab === 'approach' && (
                <ol className="m-0 flex flex-col gap-2.5 pl-5 text-base leading-relaxed text-[#DADCE2]">
                  {project.approach.map((a) => <li key={a}>{a}</li>)}
                </ol>
              )}
              {tab === 'results' && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
                  {project.results.map((r) => (
                    <div key={r.k} className="flex flex-col gap-1 rounded-[14px] border border-line bg-panel-2 p-4">
                      <span className="font-display text-[30px] leading-tight font-extrabold tracking-[-0.02em] text-warm">{r.v}</span>
                      <span className="text-[13px] text-soft">{r.k}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-[1_1_220px] flex-col gap-2.5">
              <span className="font-mono text-xs text-muted">STACK</span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {project.links.map((l, k) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={k === 0 ? 'btn-acc' : 'btn-ghost'}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
