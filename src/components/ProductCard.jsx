import { motion } from 'framer-motion'
import { money } from '../lib/format'

// Editorial "lookbook" card: a tall portrait frame, quiet type, and a gentle
// image zoom on hover. No tilt or shine, so it reads as a boutique catalogue.
export default function ProductCard({ product, onOpen, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55 }}
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
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl italic text-white/85">
            {product.name.split(' ')[0]}
          </span>
        )}

        {/* Index number, editorial detail. */}
        {typeof index === 'number' && (
          <span className="absolute left-3 top-3 font-display text-sm text-white/80">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        {/* Fabric tag + hover "View" cue. */}
        <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
          {product.fabric}
        </span>
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-maroon py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-ivory transition-transform duration-300 group-hover:translate-y-0">
          View piece
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-maroon">
          {product.name}
        </h3>
        <span className="shrink-0 text-sm tracking-wide text-ink/70">{money(product.price)}</span>
      </div>
      <div className="mt-2 h-px w-full bg-ink/10" />
    </motion.button>
  )
}
