import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Hero3D = lazy(() => import('./Hero3D'))

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-marigold/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-maroon/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
      </div>

      <div className="section grid w-full items-center gap-10 pt-28 md:grid-cols-2 md:pt-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Traditional · Handpicked
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {site.brand}
            <span className="mt-1 block text-4xl text-maroon sm:text-5xl lg:text-6xl">
              {site.tagline}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-md text-lg text-ink/70"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#shop" className="btn-primary">
              Shop the collection
            </a>
            <a href="#about" className="btn-ghost">
              Our story
            </a>
          </motion.div>
        </div>

        <div className="relative h-[340px] sm:h-[440px] md:h-[520px]">
          {reduced ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-56 w-40 rounded-3xl bg-gradient-to-b from-maroon via-marigold to-teal" />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-40 w-28 animate-float rounded-3xl bg-maroon/70 blur-sm" />
                </div>
              }
            >
              <Hero3D animate={!reduced} />
            </Suspense>
          )}
        </div>
      </div>

      <a href="#shop" className="absolute inset-x-0 bottom-6 mx-auto w-fit text-sm font-semibold text-ink/50">
        <span className="inline-block animate-float">↓ scroll</span>
      </a>
    </section>
  )
}
