import { motion } from 'framer-motion'
import { products } from '../data/products'
import { money } from '../lib/format'
import Reveal from './Reveal'

// Bento-style spotlight of a few sets at different sizes.
export default function Featured({ onOpen }) {
  const picks = products.slice(0, 4)
  const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2']

  return (
    <section id="featured" className="section">
      <Reveal>
        <span className="eyebrow">Loved this season</span>
        <h2 className="max-w-xl text-4xl font-semibold text-ink sm:text-5xl">Pieces worth coming back to</h2>
      </Reveal>

      <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-4 md:grid-cols-4">
        {picks.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => onOpen(p)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/70 text-left shadow-soft ${spans[i]}`}
            style={{ backgroundColor: p.swatch }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-4">
              <p className="font-display text-lg font-semibold text-white">{p.name}</p>
              <p className="text-sm text-white/85">{money(p.price)}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
