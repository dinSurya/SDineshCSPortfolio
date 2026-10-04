import { useState } from 'react'
import SiteNav from './components/SiteNav'
import Hero from './components/Hero'

export default function App() {
  const [, setPaletteOpen] = useState(false)

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SiteNav onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
      </main>
    </>
  )
}
