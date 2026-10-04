import { useState } from 'react'
import { experience } from '../data/content'
import { Chevron } from './Icons'
import SectionHeader from './SectionHeader'

export default function Experience() {
  const [open, setOpen] = useState<Set<string>>(() => new Set([experience[0].id]))
  const allOpen = experience.every((e) => open.has(e.id))

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section id="experience" className="bg-ink-2 py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-10">
        <SectionHeader n="02" label="EXPERIENCE" title="Where I’ve worked">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(experience.map((e) => e.id)))}
            className="min-h-11 cursor-pointer rounded-full border border-line-2 bg-transparent px-4 py-2.5 text-sm text-paper hover:border-paper"
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </SectionHeader>

        <div className="relative">
          <div aria-hidden="true" className="absolute top-[30px] bottom-[30px] left-[11px] w-0.5 bg-line" />
          {experience.map((it) => {
            const isOpen = open.has(it.id)
            const panelId = `exp-${it.id}`
            return (
              <div key={it.id} className="relative border-b border-[#23262E] pl-10 sm:pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute top-[30px] left-0.5 size-[18px] rounded-full border-2 transition ${isOpen ? 'border-accent bg-accent' : 'border-[#5A5F6B] bg-ink-2'}`}
                />
                <button
                  type="button"
                  onClick={() => toggle(it.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex min-h-11 w-full cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 border-0 bg-transparent py-5 text-left text-paper"
                >
                  <span className="basis-full font-mono text-[13px] text-muted md:basis-[170px]">{it.dates}</span>
                  <span className="flex flex-[1_1_260px] flex-col gap-0.5">
                    <span className="font-display text-[22px] font-extrabold tracking-[-0.015em] transition group-hover:text-accent sm:text-[26px]">
                      {it.role}
                    </span>
                    <span className="text-[15px] text-soft">{it.org} · {it.place}</span>
                  </span>
                  <span className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[11px] tracking-[.08em] text-muted">{it.kind}</span>
                  <Chevron className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div id={panelId} className="flex animate-fadeup flex-wrap gap-8 pb-8 md:pl-[194px]">
                    <ul className="m-0 flex flex-[999_1_380px] flex-col gap-2.5 pl-[18px] text-base leading-relaxed text-soft">
                      {it.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    <div className="flex flex-[1_1_220px] flex-col gap-3">
                      {it.stats.map((s) => (
                        <div key={s.k} className="flex flex-col gap-0.5 rounded-[14px] border border-line bg-panel-2 px-4 py-3.5">
                          <span className="font-display text-[34px] font-extrabold tracking-[-0.02em] text-warm">{s.v}</span>
                          <span className="text-[13px] text-soft">{s.k}</span>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-1.5">
                        {it.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
