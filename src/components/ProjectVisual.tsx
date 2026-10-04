import type { Project } from '../data/content'

// Screenshot when there is one, otherwise a hatched panel with the project name.
export default function ProjectVisual({ p, className = '' }: { p: Project; className?: string }) {
  if (p.image) {
    return <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" className={`size-full object-cover object-top ${className}`} />
  }
  return (
    <div className={`placeholder-hatch flex size-full items-center justify-center p-6 text-center ${className}`}>
      <span className="font-display text-3xl font-extrabold tracking-[-0.02em] text-[#5A5F6B]">{p.title}</span>
    </div>
  )
}
