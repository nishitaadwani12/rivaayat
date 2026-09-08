import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Hero3D = lazy(() => import('./Hero3D'))

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Full-bleed flowing silk behind everything. */}
      <div className="absolute inset-0">
        {reduced ? (
          <div className="h-full w-full bg-gradient-to-br from-maroon via-marigold to-teal" />
        ) : (
          <Suspense fallback={<div className="h-full w-full bg-maroon/30" />}>
            <Hero3D />
          </Suspense>
        )}
      </div>

      {/* Scrims: lift the left for headline contrast, ground the bottom. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ivory via-ivory/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

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
          className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
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
          className="mt-4 max-w-sm text-ink/75"
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
        className="absolute inset-x-0 bottom-8 mx-auto w-fit text-xs font-semibold uppercase tracking-[0.3em] text-ink/50"
      >
        Scroll to explore
      </a>
    </section>
  )
}
