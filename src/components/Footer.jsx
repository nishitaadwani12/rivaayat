import { site } from '../config'
import { whatsappLink } from '../lib/whatsapp'

export default function Footer() {
  const wa = whatsappLink(`Hi ${site.brand}! I have a question.`)

  return (
    <footer className="border-t border-ink/10 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="font-display text-xl font-bold text-maroon">{site.brand}</div>

        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-ink/60">
          <a href="#shop" className="hover:text-maroon">Shop</a>
          <a href="#featured" className="hover:text-maroon">Featured</a>
          <a href="#about" className="hover:text-maroon">Our story</a>
          {wa && (
            <a href={wa} target="_blank" rel="noreferrer" className="hover:text-maroon">WhatsApp</a>
          )}
          {site.instagram && (
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer" className="hover:text-maroon">
              Instagram
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="hover:text-maroon">Email</a>
          )}
        </nav>

        <p className="text-xs text-ink/50">© {new Date().getFullYear()} {site.brand}</p>
      </div>
    </footer>
  )
}
