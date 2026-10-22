import { useState } from 'react'
import { projects } from '../data/content'

export default function ProjectPile() {
  const [active, setActive] = useState(null)
  const activeProject = projects[active ?? 0]

  return (
    <section className="projects-section" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading-dark">
        <p className="eyebrow">Selected work / 04</p>
        <h2 id="work-title">Open the box.</h2>
        <p>Hover, focus, or tap a card to pull it from the pile.</p>
      </div>
      <div className={`project-pile ${active !== null ? 'has-active' : ''}`} role="list" onPointerLeave={() => setActive(null)}>
        {projects.map((project, index) => (
          <div
            className={`pile-slot ${active === index ? 'is-active' : ''}`}
            style={{ '--i': index }}
            key={project.slug}
            role="listitem"
          >
            <article className={`pile-card tone-${project.accent}`}>
              <div className="card-topline"><span>{project.number}</span><span>Case study ↗</span></div>
              <div>
                <p className="card-kicker">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p className="card-summary">{project.summary}</p>
              </div>
              <div className="card-bottomline">
                <ul aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <span className="card-cta">View project <span aria-hidden="true">↗</span></span>
              </div>
            </article>
          </div>
        ))}
        <a
          className="pile-card-link"
          href={`#/projects/${activeProject.slug}`}
          data-route
          aria-label={`Open ${activeProject.title}`}
          onPointerEnter={() => setActive((current) => current ?? 0)}
          onFocus={() => setActive((current) => current ?? 0)}
          onBlur={() => setActive(null)}
        />
        <nav className="pile-hit-map" aria-label="Open a project">
          {projects.map((project, index) => (
            <a
              key={project.slug}
              href={`#/projects/${project.slug}`}
              data-route
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              aria-label={`Open ${project.title}`}
            >
              <span>{project.number}</span>
              <strong>{project.title}</strong>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
