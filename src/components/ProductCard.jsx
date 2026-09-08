import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { money } from '../lib/format'

// A product card that tilts in 3D toward the pointer. Clicking opens the
// quick view where the shopper picks a size and adds to the bag.
export default function ProductCard({ product, onOpen }) {
  const ref = useRef()
  const [t, setT] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setT({ ry: (px - 0.5) * 12, rx: (0.5 - py) * 12 })
  }
  const reset = () => setT({ rx: 0, ry: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <button
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onClick={() => onOpen(product)}
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className="group w-full overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-3 text-left shadow-soft backdrop-blur-sm hover:shadow-lift"
      >
        <div
          className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl"
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
            <span className="select-none font-display text-3xl text-white/80" aria-hidden="true">
              {product.name.split(' ')[0]}
            </span>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/70">
            {product.fabric}
          </span>
        </div>

        <div className="px-2 pb-1 pt-4">
          <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink/55">{product.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-maroon">{money(product.price)}</span>
            <span className="text-sm font-semibold text-ink/60 group-hover:text-maroon">View →</span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}
