import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { products, productExtras, sampleReviews, sizes as ALL_SIZES } from '../data/products'
import { money } from '../lib/format'
import { enquiryLink } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'
import Stars from './Stars'

// A full, scrollable product page (like Myntra): gallery, rating, pricing,
// size selector, highlights, reviews, and related products.
export default function ProductDetail({ product, onOpen, onClose }) {
  const { add } = useCart()
  const [size, setSize] = useState('')
  const [err, setErr] = useState(false)

  useEffect(() => {
    setSize('')
    setErr(false)
    // Jump to top whenever a different product opens.
    const el = document.getElementById('pd-scroll')
    if (el) el.scrollTop = 0
  }, [product])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const reviews = product.reviews?.length ? product.reviews : sampleReviews
  const mrp = Math.round((product.price * 1.6) / 10) * 10
  const discount = Math.round(((mrp - product.price) / mrp) * 100)
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  // Rating bar distribution (nice-looking, derived from the average).
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const base = Math.max(0, 100 - Math.abs(product.rating - star) * 45)
    return { star, pct: Math.round(base) }
  })

  const addToBag = () => {
    if (!size) {
      setErr(true)
      return
    }
    add(product, size)
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          id="pd-scroll"
          className="fixed inset-0 z-[55] overflow-y-auto bg-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-ivory/90 px-5 py-4 backdrop-blur-md sm:px-8">
            <button
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 hover:text-maroon"
            >
              ← Back to shop
            </button>
            <span className="text-xs uppercase tracking-[0.2em] text-ink/40">{product.category}</span>
          </div>

          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
            {/* Gallery + buy box */}
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ backgroundColor: product.image ? undefined : product.swatch }}
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-display text-4xl italic text-white/85">
                      {product.name}
                    </span>
                  )}
                </div>
                {/* Thumbnail strip (placeholder tints until you add real photos). */}
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square"
                      style={{ backgroundColor: product.swatch, opacity: 1 - i * 0.18 }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">{product.pattern}</p>
                <h1 className="mt-1 font-display text-4xl font-semibold text-ink">{product.name}</h1>

                <div className="mt-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-teal px-2 py-0.5 text-sm font-bold text-ivory">
                    {product.rating} ★
                  </span>
                  <span className="text-sm text-ink/55">{product.ratingCount} ratings</span>
                </div>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-ink">{money(product.price)}</span>
                  <span className="text-ink/40 line-through">{money(mrp)}</span>
                  <span className="font-semibold text-maroon">{discount}% off</span>
                </div>
                <p className="mt-1 text-xs text-ink/45">Inclusive of all taxes</p>

                {/* Size */}
                <div className="mt-7">
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-ink/60">Select size</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSize(s)
                          setErr(false)
                        }}
                        className={`h-11 w-12 border font-semibold transition ${
                          size === s
                            ? 'border-maroon bg-maroon text-ivory'
                            : 'border-ink/20 bg-white text-ink hover:border-maroon/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {err && <p className="mt-2 text-sm font-semibold text-maroon">Please choose a size.</p>}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button onClick={addToBag} className="btn-primary flex-1">
                    Add to bag
                  </button>
                  {enquiryLink(product, size) && (
                    <a
                      href={enquiryLink(product, size)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#128C7E] transition hover:bg-[#25D366]/20"
                    >
                      💬 Enquire
                    </a>
                  )}
                </div>

                {/* Highlights */}
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <h3 className="font-display text-xl font-semibold text-ink">Product details</h3>
                  <p className="mt-2 text-ink/70">{product.description}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
                    <Detail label="Fabric" value={product.fabric} />
                    <Detail label="Fit" value={product.fit} />
                    <Detail label="Pattern" value={product.pattern} />
                    <Detail label="Category" value={product.category} />
                  </dl>
                  <div className="mt-5">
                    <p className="text-sm font-bold uppercase tracking-wide text-ink/60">Care</p>
                    <ul className="mt-2 list-inside list-disc text-sm text-ink/70">
                      {productExtras.care.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-5 text-sm text-ink/60">🚚 {productExtras.delivery}</p>
                </div>
              </div>
            </div>

            {/* Ratings & reviews */}
            <section className="mt-14 border-t border-ink/10 pt-10">
              <h2 className="font-display text-3xl font-semibold text-ink">Ratings & reviews</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
                <div className="text-center md:text-left">
                  <div className="font-display text-5xl font-bold text-ink">{product.rating}</div>
                  <Stars value={product.rating} className="mt-1 text-lg" />
                  <p className="mt-1 text-sm text-ink/55">{product.ratingCount} verified ratings</p>
                  <div className="mt-4 space-y-1.5">
                    {dist.map((d) => (
                      <div key={d.star} className="flex items-center gap-2 text-sm">
                        <span className="w-6 text-ink/60">{d.star}★</span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                          <span className="block h-full rounded-full bg-teal" style={{ width: `${d.pct}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-ink/10">
                  {reviews.map((r, i) => (
                    <div key={i} className="py-5 first:pt-0">
                      <div className="flex items-center gap-3">
                        <Stars value={r.stars} />
                        <span className="font-semibold text-ink">{r.name}</span>
                        <span className="text-xs text-ink/45">{r.date}</span>
                      </div>
                      <p className="mt-2 text-ink/70">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related */}
            <section className="mt-14 border-t border-ink/10 pt-10">
              <h2 className="font-display text-3xl font-semibold text-ink">You may also like</h2>
              <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
                {related.map((p) => (
                  <button key={p.id} onClick={() => onOpen(p)} className="group text-left">
                    <div
                      className="relative aspect-[3/4] overflow-hidden"
                      style={{ backgroundColor: p.image ? undefined : p.swatch }}
                    >
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center font-display text-xl italic text-white/85">
                          {p.name.split(' ')[0]}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span className="font-display text-base font-semibold text-ink group-hover:text-maroon">{p.name}</span>
                      <span className="text-sm text-ink/70">{money(p.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-ink/45">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  )
}
