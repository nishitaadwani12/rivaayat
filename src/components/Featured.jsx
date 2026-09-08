import { products } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

// A simple, clean grid of a few featured sets.
export default function Featured({ onOpen }) {
  const picks = products.slice(0, 4)

  return (
    <section id="featured" className="section">
      <Reveal>
        <span className="eyebrow">Featured</span>
        <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Loved this season</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {picks.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
