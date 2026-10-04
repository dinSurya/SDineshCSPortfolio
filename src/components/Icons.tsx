type P = { size?: number; className?: string }
const base = (size = 20) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
})

export const SearchIcon = ({ size = 15, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
)
export const CloseIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const MenuIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
)
export const ArrowLeft = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
)
export const ArrowRight = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Chevron = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 9l6 6 6-6" /></svg>
)
export const Check = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="M5 12l5 5 9-10" /></svg>
)
export const Medal = ({ size = 34, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} className={className}><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>
)
