import { useLayoutEffect } from 'react'

const groups = [
  ['.manifesto', '.eyebrow, h2, .manifesto-grid > *, .manifesto-stats > div'],
  ['.projects-section', '.section-heading > *, .pile-slot'],
  ['.experience-section', '.section-heading > *, .timeline-game'],
  ['.interests-section', '.section-heading > *, .deck-scene, .interest-panel-slot'],
]

export default function PageMotion() {
  useLayoutEffect(() => {
    const gsap = window.gsap
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!gsap || reduced) return undefined

    const observers = groups.map(([rootSelector, targetSelector]) => {
      const root = document.querySelector(rootSelector)
      if (!root) return null
      const targets = root.querySelectorAll(targetSelector)
      gsap.set(targets, { autoAlpha: 0, y: 54 })

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
        })
        observer.disconnect()
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

      observer.observe(root)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  return null
}
