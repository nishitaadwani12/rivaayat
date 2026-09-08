import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, products } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function Catalog({ onOpen }) {
  const [active, setActive] = useState('All')

  const shown = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="shop" className="section">
      <Reveal>
        <span className="eyebrow">The collection</span>
        <h2 className="text-4xl font-semibold text-ink sm:text-5xl">Shop co-ord sets</h2>
        <p className="mt-3 max-w-md text-ink/60">
          Timeless prints in comfortable fabrics. Tap any set to choose your size.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === c
                ? 'bg-maroon text-ivory shadow-soft'
                : 'border border-ink/15 bg-white/60 text-ink/70 hover:border-ink/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }}>
              <ProductCard product={p} onOpen={onOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
