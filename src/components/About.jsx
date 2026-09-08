import Reveal from './Reveal'

const points = [
  { t: 'Handpicked fabrics', d: 'Breathable cottons and traditional weaves, chosen with care.' },
  { t: 'Made in India', d: 'Supporting local artisans and time-honoured prints.' },
  { t: 'Easy returns', d: 'A simple, honest returns window on every order.' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden border border-marigold/50 bg-gradient-to-br from-maroon via-marigold to-teal">
            <span className="absolute inset-0 flex items-center justify-center font-display text-6xl italic text-white/80">
              Rivaayat
            </span>
            <span className="absolute bottom-4 left-4 bg-ivory px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
              Since day one
            </span>
            {/* Swap for a real photo: put a picture in /public and use an <img> here. */}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="text-4xl font-semibold text-ink sm:text-5xl">Tradition you can wear every day</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-ink/70">
              Rivaayat began at home, with a love for the prints and weaves we grew up around. Every
              set is chosen to feel special yet easy to wear, so you reach for it again and again.
              We keep our range small and thoughtful, and we pack each order like a gift.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5">
              {points.map((p) => (
                <div key={p.t} className="border-l-2 border-marigold pl-4">
                  <div className="font-display text-lg font-semibold text-maroon">{p.t}</div>
                  <div className="mt-1 text-sm text-ink/60">{p.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
