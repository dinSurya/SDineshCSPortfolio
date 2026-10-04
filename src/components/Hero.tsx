import { useState } from 'react'
import { commands } from '../data/content'

const prompt = (
  <>
    <span className="text-warm">surya@umd</span> <span className="text-muted">~ %</span>{' '}
  </>
)

export default function Hero() {
  const [cmd, setCmd] = useState('cat now.txt')

  return (
    <section id="top" className="bg-ink pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 sm:px-10">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
          <span className="flex items-center gap-2.5 font-mono text-[13px] tracking-[.04em] text-muted">
            <span className="size-2 rounded-full bg-warm" />
            University of Maryland · Computer Science · ’28
          </span>
          <h1 className="m-0 font-display text-[clamp(52px,8.4vw,108px)] leading-[.94] font-extrabold tracking-[-0.035em]">
            <span className="block">Surya</span>
            <span className="block text-accent">Dineshkumar</span>
          </h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-relaxed text-pretty text-soft">
            I build full-stack apps and data pipelines. Looking for software engineering and data science internships for
            Summer 2027.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="btn-acc" href="#projects">View projects →</a>
            <a className="btn-ghost" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="min-w-0 flex-[1_1_440px] overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_60px_rgba(0,0,0,.45)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#3A3F4B]" />
              <span className="size-2.5 rounded-full bg-[#3A3F4B]" />
              <span className="size-2.5 rounded-full bg-[#3A3F4B]" />
              <span className="ml-2">~/surya</span>
            </span>
            <span>zsh</span>
          </div>
          <div aria-live="polite" className="min-h-[196px] p-5 font-mono text-[13px] leading-[1.75] sm:text-sm">
            <div>{prompt}{cmd}</div>
            {commands[cmd].map((line) => (
              <div key={line} className="overflow-hidden text-ellipsis whitespace-pre text-[#DADCE2]">{line}</div>
            ))}
            <div>
              {prompt}
              <span className="inline-block h-[17px] w-[9px] animate-blink bg-accent align-[-3px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 border-t border-line px-5 pt-4 pb-5">
            <span className="text-[13px] text-muted">Try a command</span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(commands).map((k) => {
                const on = cmd === k
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setCmd(k)}
                    aria-pressed={on}
                    className={`min-h-11 cursor-pointer rounded-lg border px-3 py-2.5 font-mono text-[13px] transition ${on ? 'border-accent bg-accent text-ink' : 'border-line-2 bg-ink text-paper hover:border-accent'}`}
                  >
                    {k}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
