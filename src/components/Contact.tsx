import { useState, type FormEvent } from 'react'
import { profile } from '../data/content'
import { Check } from './Icons'

// Set VITE_FORMSPREE_ID (e.g. in .env.local or your host's env settings) to send
// messages through Formspree. Without it the form opens a prefilled email instead.
const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined

type Status = 'idle' | 'error' | 'sending' | 'sent' | 'failed'

const field = 'rounded-[10px] border border-line-2 bg-ink p-3.5 text-base text-paper focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent'

export default function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [status, setStatus] = useState<Status>('idle')
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })

  async function submit(e: FormEvent) {
    e.preventDefault()
    const ok = form.name.trim() && /.+@.+\..+/.test(form.email) && form.msg.trim()
    if (!ok) return setStatus('error')

    if (!formspreeId) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
      const body = encodeURIComponent(`${form.msg}\n\n${form.name} <${form.email}>`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return setStatus('sent')
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.msg }),
      })
      setStatus(res.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, arrow: '→' },
    { label: 'LinkedIn', href: profile.linkedin, arrow: '↗' },
    { label: 'GitHub', href: profile.github, arrow: '↗' },
    { label: 'Résumé (PDF)', href: profile.resume, arrow: '↓' },
  ]

  return (
    <section id="contact" className="bg-ink pt-24 pb-10 sm:pt-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-4 sm:gap-[72px] sm:px-10">
        <div className="flex flex-wrap items-start gap-14">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
            <span className="eyebrow">05 / CONTACT</span>
            <h2 className="m-0 font-display text-[clamp(44px,6vw,76px)] leading-[.98] font-extrabold tracking-[-0.035em]">
              Let’s talk about <span className="text-accent">Summer 2027.</span>
            </h2>
            <p className="m-0 max-w-[460px] text-lg leading-relaxed text-soft">
              I’m looking for software engineering and data science internships. Send a note here, or reach me directly.
            </p>
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') || l.href.endsWith('.pdf') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex justify-between gap-3 border-t border-line py-[18px] text-lg text-paper no-underline transition-all last:border-b hover:pl-2 hover:text-accent"
                >
                  <span className="min-w-0 break-all">{l.label}</span>
                  <span aria-hidden="true">{l.arrow}</span>
                </a>
              ))}
            </div>
            <button type="button" onClick={onCopyEmail} className="self-start cursor-pointer border-0 bg-transparent p-0 font-mono text-[13px] text-muted underline underline-offset-4 hover:text-accent">
              Copy email address
            </button>
          </div>

          <div className="box-border min-w-0 flex-[1_1_440px] rounded-[22px] border border-line bg-panel p-6 sm:p-8">
            {status === 'sent' ? (
              <div role="status" className="flex min-h-[380px] animate-fadeup flex-col items-start justify-center gap-3.5">
                <span className="flex size-[52px] items-center justify-center rounded-full bg-accent text-ink"><Check /></span>
                <span className="font-display text-[30px] font-extrabold">{formspreeId ? 'Message sent' : 'Almost there'}</span>
                <span className="text-base text-soft">
                  {formspreeId
                    ? `Thanks, ${form.name}. I’ll reply to ${form.email}.`
                    : 'Your email app should have opened with the message filled in. Hit send there and I’ll get back to you.'}
                </span>
                <button
                  type="button"
                  onClick={() => { setForm({ name: '', email: '', msg: '' }); setStatus('idle') }}
                  className="min-h-11 cursor-pointer rounded-full border border-line-2 bg-transparent px-4 py-2.5 text-sm text-paper hover:border-paper"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-name" className="text-sm text-soft">Name</label>
                  <input id="cf-name" value={form.name} onChange={set('name')} autoComplete="name" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-email" className="text-sm text-soft">Email</label>
                  <input id="cf-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-msg" className="text-sm text-soft">Message</label>
                  <textarea id="cf-msg" rows={5} value={form.msg} onChange={set('msg')} className={`${field} resize-y`} />
                </div>
                {status === 'error' && <span role="alert" className="text-sm text-warm">Please fill in all three fields with a valid email.</span>}
                {status === 'failed' && <span role="alert" className="text-sm text-warm">Something went wrong. Email me directly at {profile.email}.</span>}
                <button type="submit" disabled={status === 'sending'} className="btn-acc self-start border-0 !px-[22px] !py-[15px] !text-base disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap justify-between gap-4 border-t border-line pt-5 font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React + Tailwind CSS</span>
          <a href="#top" className="text-soft hover:text-accent">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
