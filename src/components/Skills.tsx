import { useState } from 'react'
import { skillGroups, skillSources } from '../data/content'
import SectionHeader from './SectionHeader'

type SourceId = (typeof skillSources)[number]['id']

export default function Skills() {
  const [f, setF] = useState<SourceId>('all')
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0)
  const hits = skillGroups.reduce((n, g) => n + g.items.filter((s) => s.used.includes(f)).length, 0)
  const label = skillSources.find((s) => s.id === f)!.label

  return (
    <section id="skills" className="bg-ink-2 py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 sm:px-10">
        <SectionHeader n="04" label="SKILLS" title="My toolkit" />

        <div className="flex flex-col gap-3">
          <span className="text-[15px] text-muted">Show what I used for</span>
          <div role="group" aria-label="Highlight skills by project" className="flex flex-wrap gap-2">
            {skillSources.map((s) => (
              <button key={s.id} type="button" onClick={() => setF(s.id)} aria-pressed={f === s.id} className={`chip ${f === s.id ? 'chip-on' : 'chip-off'}`}>
                {s.label}
              </button>
            ))}
          </div>
          <span aria-live="polite" className="font-mono text-[13px] text-warm">
            {f === 'all' ? `${total} skills · pick a project to see what it used` : `${hits} of ${total} skills used in ${label}`}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
          {skillGroups.map((g) => (
            <div key={g.title} className="flex flex-col rounded-[20px] border border-line bg-panel px-6 pt-6 pb-3">
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h3 className="m-0 font-display text-[22px] font-extrabold">{g.title}</h3>
                <span className="font-mono text-xs text-muted">{g.items.length}</span>
              </div>
              {g.items.map((s) => {
                const on = f === 'all' || s.used.includes(f)
                const lit = f !== 'all' && on
                return (
                  <div key={s.n} className={`flex items-center gap-3 border-b border-[#1F2229] py-[11px] transition-opacity last:border-0 ${on ? 'opacity-100' : 'opacity-25'}`}>
                    <span aria-hidden="true" className={`size-[9px] rounded-full ${lit ? 'border-2 border-accent bg-accent' : 'border-[1.5px] border-[#5A5F6B]'}`} />
                    <span className="flex-1 text-base">{s.n}</span>
                    <span className="font-mono text-[11px] text-muted">
                      {s.used.length ? `${s.used.length} ${s.used.length === 1 ? 'place' : 'places'}` : '—'}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
