import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects, sections } from '../data/content'
import { SearchIcon } from './Icons'

type Cmd = { group: string; icon: string; label: string; hint?: string; run: () => void }

type Props = {
  open: boolean
  onClose: () => void
  onOpenProject: (id: string) => void
  onCopyEmail: () => void
}

const openUrl = (url: string) => window.open(url, '_blank', 'noopener')

export default function CommandPalette({ open, onClose, onOpenProject, onCopyEmail }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)

  const all = useMemo<Cmd[]>(
    () => [
      ...sections.map((s, i) => ({
        group: 'NAVIGATE', icon: `0${i + 1}`, label: s.label,
        run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      ...projects.map((p) => ({ group: 'PROJECTS', icon: 'P', label: p.title, hint: 'case study', run: () => onOpenProject(p.id) })),
      { group: 'ACTIONS', icon: '@', label: 'Copy email address', hint: profile.email, run: onCopyEmail },
      { group: 'ACTIONS', icon: '↓', label: 'Open resume (PDF)', run: () => openUrl(profile.resume) },
      { group: 'ACTIONS', icon: '↗', label: 'Open GitHub', hint: 'github.com/dinSurya', run: () => openUrl(profile.github) },
      { group: 'ACTIONS', icon: '↗', label: 'Open LinkedIn', run: () => openUrl(profile.linkedin) },
    ],
    [onOpenProject, onCopyEmail],
  )

  const results = all.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()))

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      setQ('')
      setSel(0)
      d.showModal()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  const run = (c: Cmd | undefined) => {
    if (!c) return
    onClose()
    // Let the dialog close before scrolling or opening another dialog.
    requestAnimationFrame(c.run)
  }

  let lastGroup = ''

  return (
    <dialog
      ref={ref}
      aria-label="Command palette"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="mx-auto mt-[12vh] w-[calc(100%-32px)] max-w-[640px] overflow-hidden rounded-[14px] border border-line-2 bg-panel p-0 text-paper shadow-[0_40px_80px_rgba(0,0,0,.6)] backdrop:bg-[rgba(5,6,8,.7)] backdrop:backdrop-blur-[3px]"
    >
      <div className="flex items-center gap-3 border-b border-line px-[18px] py-4">
        <SearchIcon size={20} className="text-muted" />
        <label htmlFor="cmdq" className="sr-only">Search commands</label>
        <input
          id="cmdq"
          autoFocus
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
            if (e.key === 'Enter') { e.preventDefault(); run(results[sel]) }
          }}
          placeholder="Jump to a section, project or action…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[sel] ? `cmd-${sel}` : undefined}
          className="flex-1 border-0 bg-transparent text-lg text-paper outline-none placeholder:text-muted"
        />
        <kbd className="rounded border border-line-2 px-1.5 py-0.5 font-mono text-[11px] text-muted">ESC</kbd>
      </div>
      <div id="cmd-list" role="listbox" className="max-h-[min(440px,60vh)] overflow-y-auto p-2">
        {results.map((c, k) => {
          const header = c.group !== lastGroup ? (lastGroup = c.group) : null
          return (
            <div key={c.group + c.label}>
              {header && <div className="px-3.5 pt-3 pb-1.5 font-mono text-[11px] tracking-[.1em] text-muted">{header}</div>}
              <button
                id={`cmd-${k}`}
                type="button"
                role="option"
                aria-selected={k === sel}
                onMouseMove={() => setSel(k)}
                onClick={() => run(c)}
                className={`flex min-h-11 w-full cursor-pointer items-center gap-3.5 rounded-lg border-0 px-3.5 py-2.5 text-left text-[15px] ${k === sel ? 'bg-accent text-ink' : 'bg-transparent text-paper'}`}
              >
                <span className="flex size-7 flex-none items-center justify-center rounded-md border-[1.5px] border-current font-mono text-xs">{c.icon}</span>
                <span className="flex-1">{c.label}</span>
                {c.hint && <span className={`hidden font-mono text-xs sm:inline ${k === sel ? 'text-ink/70' : 'text-muted'}`}>{c.hint}</span>}
              </button>
            </div>
          )
        })}
        {results.length === 0 && <p className="m-0 px-3.5 py-7 text-muted">No results for “{q}”</p>}
      </div>
      <div className="hidden gap-5 border-t border-line px-[18px] py-3 font-mono text-xs text-muted sm:flex">
        <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
      </div>
    </dialog>
  )
}
