import { useLayoutEffect, useRef } from 'react'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gsap = window.gsap
    if (reduce || !gsap) return undefined

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .from('.hero-first .hero-word', { xPercent: -110, duration: 1.15 })
        .from('.hero-last .hero-word', { xPercent: 110, duration: 1.15 }, '-=0.86')
        .from('.hero-kicker, .hero-meta, .hero-actions, .hero-scroll-cue', { opacity: 0, y: 24, duration: 0.72, stagger: 0.09 }, '-=0.5')
        .from('.hero-cross', { scale: 0, rotation: -90, duration: 0.7 }, '-=0.75')
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
