import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../config'
import { money } from '../lib/format'
import { bagOrderLink } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ onCheckout }) {
  const { open, closeCart, lines, count, subtotal, shipping, total, setQty, remove } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-ink/10 p-5">
              <h2 className="font-display text-2xl font-semibold text-ink">Your bag ({count})</h2>
              <button onClick={closeCart} className="rounded-full px-3 py-1 text-lg text-ink/60" aria-label="Close bag">
                ✕
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="text-5xl">🛍️</span>
                <p className="text-ink/60">Your bag is empty for now.</p>
                <button onClick={closeCart} className="btn-ghost">
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-auto p-5">
                  {lines.map((l) => (
                    <div key={l.key} className="flex gap-3 rounded-2xl border border-ink/10 bg-white/60 p-3">
                      <div
                        className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                        style={{ backgroundColor: l.image ? undefined : l.swatch }}
                      >
                        {l.image ? (
                          <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="font-display text-xs text-white/80">{l.name.split(' ')[0]}</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold text-ink">{l.name}</p>
                          <button onClick={() => remove(l.key)} className="text-sm text-ink/40 hover:text-maroon">
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-ink/50">Size {l.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(l.key, l.qty - 1)}
                              className="h-7 w-7 rounded-full border border-ink/20 font-bold"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-semibold">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.key, l.qty + 1)}
                              className="h-7 w-7 rounded-full border border-ink/20 font-bold"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-maroon">{money(l.price * l.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-ink/10 p-5">
                  <div className="flex justify-between text-sm text-ink/70">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-ink/70">
                    <span>Delivery</span>
                    <span>{shipping === 0 ? 'Free' : money(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-display text-lg font-bold text-ink">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>

                  <button onClick={onCheckout} className="btn-primary w-full">
                    Checkout
                  </button>

                  {bagOrderLink(lines, total) && (
                    <a
                      href={bagOrderLink(lines, total)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366]/10 px-6 py-3 font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20"
                    >
                      <span aria-hidden="true">💬</span> Order on WhatsApp
                    </a>
                  )}
                  {subtotal > 0 && subtotal < site.freeShippingAbove && (
                    <p className="text-center text-xs text-ink/50">
                      Add {money(site.freeShippingAbove - subtotal)} more for free delivery.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
