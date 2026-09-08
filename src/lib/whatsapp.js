import { site } from '../config'
import { money } from './format'

// Build a WhatsApp click-to-chat link with a pre-filled message.
// Returns null when no number is configured (so buttons can hide themselves).
export function whatsappLink(text) {
  if (!site.whatsapp) return null
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

// Enquiry about a single piece, optionally with a chosen size.
export function enquiryLink(product, size) {
  const sizePart = size ? ` in size ${size}` : ''
  return whatsappLink(
    `Hi ${site.brand}! I'm interested in the "${product.name}"${sizePart} (${money(product.price)}). Is it available?`,
  )
}

// Send the whole bag as a WhatsApp message (a no-fee way to order).
export function bagOrderLink(lines, total) {
  const items = lines
    .map((l) => `- ${l.name} (size ${l.size}) x${l.qty} = ${money(l.price * l.qty)}`)
    .join('\n')
  return whatsappLink(
    `Hi ${site.brand}! I'd like to order:\n${items}\n\nTotal: ${money(total)}\n\nPlease let me know how to proceed.`,
  )
}
