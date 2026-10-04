import { useCallback, useEffect, useRef, useState } from 'react'
import SiteNav from './components/SiteNav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ProjectModal from './components/ProjectModal'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import Toast from './components/Toast'
import { profile, projects } from './data/content'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2000)
  }, [])

  const copyEmail = useCallback(() => {
    navigator.clipboard
      ?.writeText(profile.email)
      .then(() => showToast('Email copied to clipboard'))
      .catch(() => showToast(profile.email))
  }, [showToast])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SiteNav onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpen={setProjectId} />
        <Skills />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <ProjectModal project={projects.find((p) => p.id === projectId) ?? null} onClose={() => setProjectId(null)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onOpenProject={setProjectId} onCopyEmail={copyEmail} />
      <Toast message={toast} />
    </>
  )
}
