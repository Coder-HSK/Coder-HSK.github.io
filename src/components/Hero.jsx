import { useLayoutEffect, useRef } from 'react'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gsap = window.gsap
    if (reduce || !gsap) return undefined

    const context = gsap.context(() => {
      const first = '.hero-first .hero-word'
      const last = '.hero-last .hero-word'
      const supporting = '.hero-kicker, .hero-meta, .hero-actions, .hero-scroll-cue'

      gsap.set(first, { xPercent: -118, force3D: true })
      gsap.set(last, { xPercent: 118, force3D: true })
      gsap.set(supporting, { autoAlpha: 0, y: 30, force3D: true })
      gsap.set('.hero-cross', { scale: 0, rotation: -100, force3D: true })

      const timeline = gsap.timeline({ delay: 0.25, defaults: { ease: 'power3.inOut' } })
      timeline
        .to(first, { xPercent: 0, duration: 4.85 })
        .to(last, { xPercent: 0, duration: 4.85 }, '-=3.6')
        .to(supporting, { autoAlpha: 1, y: 0, duration: 4.15, stagger: 0.18, ease: 'power3.out' }, '-=3.35')
        .to('.hero-cross', { scale: 1, rotation: 0, duration: 4.05, ease: 'back.out(1.2)' }, '-=4.05')
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <p className="hero-kicker">Computer science · robotics · product engineering</p>
      <h1 id="hero-title">
        <span className="hero-line hero-first"><span className="hero-word">HITENDRA</span></span>
        <span className="hero-line hero-last"><span className="hero-word">ANNAVARAPU</span></span>
      </h1>
      <span className="hero-cross" aria-hidden="true">+</span>
      <div className="hero-footer">
        <p className="hero-meta">I build systems that move, measure, teach, and occasionally turn into games.</p>
        <div className="hero-actions">
          <a className="button button-accent" href="#work">Explore work</a>
          <a className="button button-ghost" href="#/resume" data-route>View résumé</a>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#intro"><span>Scroll to enter</span><i aria-hidden="true">↓</i></a>
    </section>
  )
}
