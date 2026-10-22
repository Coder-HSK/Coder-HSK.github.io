import { useState } from 'react'
import { projects } from '../data/content'

export default function ProjectPile() {
  const [active, setActive] = useState(null)

  const toggle = (index) => setActive(active === index ? null : index)

  return (
    <section className="projects-section" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading-dark">
        <p className="eyebrow">Selected work / 04</p>
        <h2 id="work-title">Open the box.</h2>
        <p>Hover, focus, or tap a card to pull it from the pile.</p>
      </div>
      <div className="project-pile" role="list">
        {projects.map((project, index) => (
          <div
            className={`pile-slot ${active === index ? 'is-active' : ''}`}
            style={{ '--i': index }}
            key={project.slug}
            role="listitem"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <article className={`pile-card tone-${project.accent}`}>
              <button className="card-hit" type="button" onClick={() => toggle(index)} aria-expanded={active === index} aria-label={`Preview ${project.title}`} />
              <div className="card-topline"><span>{project.number}</span><span>Case study ↗</span></div>
              <div>
                <p className="card-kicker">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p className="card-summary">{project.summary}</p>
              </div>
              <div className="card-bottomline">
                <ul aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <a href={`#/projects/${project.slug}`} data-route onFocus={() => setActive(index)}>View project <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
