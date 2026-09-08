import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { site } from '../config'

const CartContext = createContext(null)
const STORAGE_KEY = 'rivaayat-cart'

// Each line is identified by product + size so the same set in two sizes are
// separate lines.
const lineKey = (id, size) => `${id}__${size}`

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, size } = action
      const key = lineKey(product.id, size)
      const existing = state[key]
      return {
        ...state,
        [key]: {
          id: product.id,
          name: product.name,
          price: product.price,
          swatch: product.swatch,
          image: product.image,
          size,
          qty: (existing?.qty || 0) + 1,
        },
      }
    }
    case 'setQty': {
      const next = { ...state }
      if (action.qty <= 0) delete next[action.key]
      else next[action.key] = { ...next[action.key], qty: action.qty }
      return next
    }
    case 'remove': {
      const next = { ...state }
      delete next[action.key]
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

function init() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const lines = Object.entries(items).map(([key, line]) => ({ key, ...line }))
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0)
    const shipping =
      subtotal === 0 || subtotal >= site.freeShippingAbove ? 0 : site.shippingFee
    const total = subtotal + shipping

    return {
      items,
      lines,
      count,
      subtotal,
      shipping,
      total,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (product, size) => {
        dispatch({ type: 'add', product, size })
        setOpen(true)
      },
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
