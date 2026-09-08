import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sizes as ALL_SIZES } from '../data/products'
import { money } from '../lib/format'
import { enquiryLink } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'

// Modal to choose a size and add the set to the bag.
export default function QuickView({ product, onClose }) {
  const { add } = useCart()
  const [size, setSize] = useState('')
  const [err, setErr] = useState(false)

  // Reset the chosen size whenever a different product is opened.
  useEffect(() => {
    setSize('')
    setErr(false)
  }, [product])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

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
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-t-3xl bg-ivory shadow-lift sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div
                className="relative flex h-64 items-center justify-center md:h-full"
                style={{ backgroundColor: product.image ? undefined : product.swatch }}
              >
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-4xl text-white/80">{product.name.split(' ')[0]}</span>
                )}
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-ink"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <span className="eyebrow">{product.category}</span>
                <h2 className="font-display text-3xl font-semibold text-ink">{product.name}</h2>
                <p className="mt-2 text-ink/65">{product.description}</p>
                <p className="mt-1 text-sm text-ink/50">Fabric: {product.fabric}</p>
                <p className="mt-4 font-display text-2xl font-bold text-maroon">{money(product.price)}</p>

                <div className="mt-6">
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-ink/60">Select size</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSize(s)
                          setErr(false)
                        }}
                        className={`h-11 w-12 rounded-xl border font-semibold transition ${
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

                <button onClick={addToBag} className="btn-primary mt-8 w-full">
                  Add to bag
                </button>

                {enquiryLink(product, size) && (
                  <a
                    href={enquiryLink(product, size)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366]/10 px-6 py-3 font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20"
                  >
                    <span aria-hidden="true">💬</span> Enquire on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
