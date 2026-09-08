// Star rating display. `value` is 0 to 5 and can be fractional.
export default function Stars({ value = 0, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  return (
    <span
      className={`relative inline-block leading-none ${className}`}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <span className="text-ink/20">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap text-marigold" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  )
}
