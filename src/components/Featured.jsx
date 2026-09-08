import { motion } from 'framer-motion'
import { products } from '../data/products'
import { money } from '../lib/format'
import Reveal from './Reveal'

// Editorial lookbook: one large hero piece on the left, a slim numbered index
// of the rest on the right. A magazine spread, not a card grid.
export default function Featured({ onOpen }) {
  const [hero, ...rest] = products.slice(0, 5)

  return (
    <section id="featured" className="section">
      <Reveal>
        <span className="eyebrow">The Lookbook</span>
        <h2 className="max-w-xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          A closer look at this season
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Large feature */}
        <motion.button
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          onClick={() => onOpen(hero)}
          className="group text-left"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: hero.image ? undefined : hero.swatch }}
          >
            {hero.image ? (
              <img
                src={hero.image}
                alt={hero.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-display text-4xl italic text-white/85">
                {hero.name}
              </span>
            )}
            <span className="absolute bottom-4 left-4 bg-ivory px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
              Editor's pick
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-maroon">{hero.name}</h3>
            <span className="text-ink/70">{money(hero.price)}</span>
          </div>
        </motion.button>

        {/* Numbered index */}
        <div className="flex flex-col justify-center divide-y divide-ink/10">
          {rest.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => onOpen(p)}
              className="group flex items-center gap-5 py-5 text-left"
            >
              <span className="font-display text-lg text-ink/35">{String(i + 2).padStart(2, '0')}</span>
              <div
                className="h-20 w-16 shrink-0 overflow-hidden"
                style={{ backgroundColor: p.image ? undefined : p.swatch }}
              >
                {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1">
                <h4 className="font-display text-xl font-semibold text-ink group-hover:text-maroon">{p.name}</h4>
                <p className="text-sm text-ink/55">{p.fabric}</p>
              </div>
              <span className="text-sm text-ink/70">{money(p.price)}</span>
              <span className="text-ink/30 transition group-hover:translate-x-1 group-hover:text-maroon">→</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
