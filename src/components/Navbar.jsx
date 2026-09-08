import { useEffect, useState } from 'react'
import { site } from '../config'
import { useCart } from '../context/CartContext'

const links = [
  { href: '#shop', label: 'Shop' },
  { href: '#featured', label: 'Featured' },
  { href: '#about', label: 'Our story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border border-white/60 px-5 transition-all duration-300 ${
          scrolled ? 'bg-ivory/80 py-2.5 shadow-soft backdrop-blur-xl' : 'bg-white/30 py-3.5 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="font-display text-2xl font-bold tracking-wide text-maroon">
          {site.brand}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-ink/70 transition hover:text-maroon">
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-ivory shadow-soft transition hover:-translate-y-0.5"
          aria-label={`Open cart, ${count} items`}
        >
          <span aria-hidden="true">🛍️</span>
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-marigold px-1 text-xs font-bold text-ink">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}
