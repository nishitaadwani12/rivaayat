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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-maroon via-marigold to-teal shadow-lift">
            <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-white/70">
              Rivaayat
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
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {points.map((p) => (
                <div key={p.t} className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-soft">
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
