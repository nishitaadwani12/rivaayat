import { site } from '../config'

const fmt = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
})

// Format a rupee amount, e.g. 2499 -> "₹2,499".
export function money(rupees) {
  return fmt.format(rupees)
}
