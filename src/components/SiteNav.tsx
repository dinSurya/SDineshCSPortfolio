import { useEffect, useState } from 'react'
import { profile, sections } from '../data/content'
import { useActiveSection } from '../useActiveSection'
import { CloseIcon, MenuIcon, SearchIcon } from './Icons'

const ids = sections.map((s) => s.id)

export default function SiteNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(ids)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-[#1E2129] bg-ink/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-4 py-3.5 sm:px-10">
        <a href="#top" aria-label="Surya Dineshkumar, back to top" className="flex items-center gap-2.5 text-paper no-underline">
          <span className="flex size-[38px] items-center justify-center rounded-[10px] bg-accent font-display text-base font-extrabold text-ink">SD</span>
          <span className="text-[15px] font-semibold">{profile.name}</span>
        </a>

        <div className="hidden gap-0.5 rounded-full border border-line bg-panel p-1 lg:flex">
          {sections.map((s) => {
            const on = active === s.id
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm no-underline transition ${on ? 'bg-paper text-ink' : 'text-soft hover:bg-[#232631] hover:text-paper'}`}
              >
                {s.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden min-h-[42px] cursor-pointer items-center gap-2 rounded-full border border-line-2 bg-panel px-3.5 font-mono text-xs text-paper transition hover:border-accent sm:flex"
          >
            <SearchIcon />⌘K
          </button>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-acc hidden !px-[18px] !py-2.5 !text-sm sm:inline-flex">
            Résumé ↓
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-2 bg-panel text-paper lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex h-dvh animate-fadeup flex-col bg-ink p-5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="flex size-[38px] items-center justify-center rounded-[10px] bg-accent font-display font-extrabold text-ink">SD</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-2 text-paper"
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <div className="mt-14 flex flex-col">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-3.5 border-b border-line py-2.5 font-display text-[42px] font-extrabold tracking-[-0.02em] text-paper no-underline hover:text-accent"
              >
                <span className="font-mono text-xs font-normal text-muted">0{i + 1}</span>
                {s.label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 font-mono text-[13px] text-muted">
            <a href={`mailto:${profile.email}`} className="text-muted no-underline hover:text-accent">{profile.email}</a>
            <div className="flex gap-5">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="text-paper hover:text-accent">Résumé ↓</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-paper hover:text-accent">LinkedIn ↗</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-paper hover:text-accent">GitHub ↗</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
