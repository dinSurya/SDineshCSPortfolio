export default function Toast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink shadow-xl transition duration-300 ${message ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      {message}
    </div>
  )
}
