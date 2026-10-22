import { useEffect, useState } from 'react'

export default function Nav({ light = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className={`nav-shell ${light ? 'nav-light' : ''}`}>
      <a className="wordmark" href="#/" data-route aria-label="Hitendra Annavarapu, home">
        HA<span>°</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="main-nav" aria-label="Primary" className={open ? 'is-open' : ''}>
        <a href="/#work">Work</a>
        <a href="/#experience">Experience</a>
        <a href="/#interests">Interests</a>
        <a href="#/resume" data-route>Résumé</a>
        <a className="nav-contact" href="https://www.linkedin.com/in/hitendra17/" target="_blank" rel="noreferrer">Let’s talk ↗</a>
      </nav>
    </header>
  )
}
