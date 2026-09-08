import { useEffect, useState } from 'react'
import { site } from '../config'
import { useCart } from '../context/CartContext'

const links = [
  { href: '#shop', label: 'Shop' },
  { href: '#featured', label: 'Lookbook' },
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
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? 'border-ink/10 bg-ivory/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-3 items-center px-5 py-4 sm:px-8">
        {/* Left: nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 transition hover:text-maroon"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Center: wordmark */}
        <a
          href="#top"
          className="col-start-2 justify-self-center text-center font-display text-3xl font-bold tracking-[0.15em] text-maroon"
        >
          {site.brand}
        </a>

        {/* Right: bag */}
        <div className="col-start-3 justify-self-end">
          <button
            onClick={openCart}
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80 transition hover:text-maroon"
            aria-label={`Open bag, ${count} items`}
          >
            <span className="hidden sm:inline">Bag</span>
            <span className="relative">
              <span aria-hidden="true">🛍️</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 text-[10px] font-bold text-ivory">
                  {count}
                </span>
              )}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
