import type { ReactNode } from 'react'

export default function SectionHeader({ n, label, title, children }: { n: string; label: string; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-2.5">
        <span className="eyebrow">{n} / {label}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </div>
  )
}
