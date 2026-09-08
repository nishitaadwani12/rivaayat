import { motion } from 'framer-motion'
import { money } from '../lib/format'

// A simple, clean product card: image, name, price. Gentle zoom on hover.
export default function ProductCard({ product, onOpen }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(product)}
      className="group block w-full text-left"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ backgroundColor: product.image ? undefined : product.swatch }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl italic text-white/85">
            {product.name.split(' ')[0]}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink transition group-hover:text-maroon">
          {product.name}
        </h3>
        <span className="shrink-0 text-sm text-ink/70">{money(product.price)}</span>
      </div>
    </motion.button>
  )
}
