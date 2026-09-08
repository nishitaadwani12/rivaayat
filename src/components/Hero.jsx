import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Hero3D = lazy(() => import('./Hero3D'))

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* The rippling silk sits full-height on the right, bleeding off the edge. */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        {reduced ? (
          <div className="h-full w-full bg-gradient-to-b from-maroon via-marigold to-teal opacity-90" />
        ) : (
          <Suspense fallback={<div className="h-full w-full bg-maroon/20" />}>
            <Hero3D />
          </Suspense>
        )}
        {/* Fade the silk into the parchment on the left so text stays readable. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ivory via-ivory/40 to-transparent md:via-transparent" />
      </div>

      {/* Vertical side label, editorial detail. */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block rotate-180 text-xs font-bold uppercase tracking-[0.4em] text-ink/40 [writing-mode:vertical-rl]">
          Handpicked · Made in India
        </span>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          The {new Date().getFullYear()} Collection
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="max-w-2xl font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
        >
          {site.brand}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-sm font-display text-2xl italic text-maroon"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 max-w-sm text-ink/70"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a href="#shop" className="btn-primary">
            Shop the collection
          </a>
          <a href="#about" className="btn-ghost">
            Our story
          </a>
        </motion.div>
      </div>

      <a
        href="#featured"
        className="absolute inset-x-0 bottom-8 mx-auto w-fit text-xs font-semibold uppercase tracking-[0.3em] text-ink/40"
      >
        Scroll to explore
      </a>
    </section>
  )
}
