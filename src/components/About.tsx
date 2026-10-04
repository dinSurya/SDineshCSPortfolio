import { useState } from 'react'
import { profile } from '../data/content'
import { Medal } from './Icons'
import SectionHeader from './SectionHeader'

const tile = 'box-border rounded-[20px] border border-line transition duration-200 hover:-translate-y-1 hover:border-[#4A5060]'

export default function About() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="about" className="bg-ink py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-10">
        <SectionHeader n="01" label="ABOUT" title="A bit about me" />

        <div className="flex flex-wrap gap-4">
          <div className={`${tile} flex min-h-[260px] flex-[2_1_520px] flex-col justify-between gap-5 bg-panel p-7 sm:p-8`}>
            <span className="font-mono text-xs text-muted">HELLO</span>
            <p className="m-0 font-display text-2xl leading-tight font-semibold tracking-[-0.01em] text-pretty sm:text-[28px]">
              I’m a CS student at the University of Maryland who likes building things people actually use, from a
              scheduling app for a local business to the models behind a hackathon-winning dashboard.
            </p>
          </div>

          <div className={`${tile} min-h-[260px] flex-[1_1_240px] overflow-hidden`}>
            <img src={profile.photo} alt="Portrait of Surya Dineshkumar" className="size-full min-h-[260px] object-cover" />
          </div>

          <div className={`${tile} flex min-h-[260px] flex-[1_1_260px] flex-col justify-between gap-4 border-accent bg-accent p-7 text-ink`}>
            <span className="font-mono text-xs">UMD · EXPECTED MAY 2028</span>
            <div className="flex flex-col gap-1">
              <span className="font-display text-[72px] leading-none font-extrabold tracking-[-0.04em]">3.88</span>
              <span className="text-[15px] font-medium">GPA · B.S. Computer Science</span>
              <span className="text-sm">Minors: Mathematics, Computational Finance</span>
            </div>
          </div>

          <div className={`${tile} flex min-h-[240px] flex-[2_1_520px] flex-col justify-between gap-5 bg-panel p-7 sm:p-8`}>
            <span className="font-mono text-xs text-muted">STARTED EARLY · 2021 – 2024</span>
            <div className="flex flex-col gap-2.5">
              <span className="font-display text-[30px] font-extrabold tracking-[-0.02em]">CodeWizardsHQ</span>
              <p className="m-0 text-[17px] leading-relaxed text-soft">
                Three years in a pre-college software development track, building full-stack web apps with Python, Flask,
                REST APIs, SQL and Git.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
            aria-label={flipped ? 'Coursework list, flip back' : 'Coursework, flip card'}
            className="group min-h-[240px] flex-[1_1_260px] cursor-pointer border-0 bg-transparent p-0 text-left text-paper [perspective:1000px]"
          >
            <span className={`relative block size-full min-h-[240px] transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
              <span className={`${tile} absolute inset-0 flex flex-col justify-between gap-3.5 bg-panel-2 p-7 [backface-visibility:hidden]`}>
                <span className="font-mono text-xs text-muted">COURSEWORK</span>
                <span className="font-display text-[34px] leading-[1.05] font-extrabold tracking-[-0.02em]">What I’m studying</span>
                <span className="text-sm text-warm">Tap to flip ↻</span>
              </span>
              <span className={`${tile} absolute inset-0 flex flex-col justify-between gap-3.5 bg-panel-2 p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
                <span className="font-mono text-xs text-muted">COURSEWORK</span>
                <span className="flex flex-col gap-2 text-base leading-snug">
                  <span>Algorithms</span>
                  <span>Organization of Programming Languages (OCaml, Rust)</span>
                  <span>Introduction to Data Science</span>
                </span>
                <span className="text-sm text-warm">Flip back ↻</span>
              </span>
            </span>
          </button>

          <div className={`${tile} flex min-h-[240px] flex-[1_1_260px] flex-col justify-between gap-3.5 bg-panel p-7`}>
            <Medal className="text-warm" />
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[22px] leading-tight font-extrabold">OMSE Award of Academic Excellence</span>
              <span className="text-sm text-muted">Office of Multi-Ethnic Student Education, UMD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
