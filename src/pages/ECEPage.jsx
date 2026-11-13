import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { eceProjects, projects } from '../data/content'
import '../ece-gallery.css'

// Add more photos here as each electronics project gets documented.
// Photo paths are relative to the Vite public/ folder.
const ecePhotoSets = {
  'two-bit-alu': [
    {
      image: 'alu-overview.jpg',
      alt: 'Wide view of the hand-wired ALU on two breadboards, with a dense network of colorful jumper wires',
      label: '01 / The complete breadboard build',
      description: 'The full hardware setup: interconnected logic chips, power, and jumper wires.',
    },
    {
      image: 'alu-display-1.jpg',
      alt: 'Close-up of the red seven-segment display showing the number 1',
      label: '02 / Display output: 1',
      description: 'Testing the seven-segment display after routing a result through the logic circuit.',
    },
    {
      image: 'alu-display-3.jpg',
      alt: 'Close-up of the red seven-segment display showing the number 3',
      label: '03 / Display output: 3',
      description: 'Another output state while checking the arithmetic and logic selections.',
    },
    {
      image: 'alu-display-6.jpg',
      alt: 'Close-up of the red seven-segment display showing the number 6',
      label: '04 / Display output: 6',
      description: 'A display test captured during hardware debugging and verification.',
    },
  ],
}

function PhotoGallery({ build }) {
  const [current, setCurrent] = useState(0)
  const [missing, setMissing] = useState(false)
  const photoSet = ecePhotoSets[build.slug] || (build.photo ? [{
    image: build.photo,
    alt: build.photoAlt || `${build.name} hardware photograph`,
    label: '01 / Project photograph',
    description: 'A closer look at the build.',
  }] : [])
  const photo = photoSet[current] || photoSet[0]
  const photoSrc = photo?.image?.startsWith('/')
    ? photo.image
    : `${import.meta.env.BASE_URL}assets-ece/${photo?.image || ''}`

  useEffect(() => {
    setCurrent(0)
    setMissing(false)
  }, [build.slug])

  function move(direction) {
    setMissing(false)
    setCurrent((index) => (index + direction + photoSet.length) % photoSet.length)
  }

  return (
    <section className="python-console ece-console" aria-label={`${build.name} photo gallery`}>
      <div className="python-console-bar">
        <div><i /><i /><i /></div>
        <span>{build.name} / real hardware gallery</span>
        <span>{String(current + 1).padStart(2, '0')} / {String(photoSet.length).padStart(2, '0')}</span>
      </div>
      <div className="ece-gallery-viewer">
        {photo && !missing ? (
          <a href={photoSrc} target="_blank" rel="noreferrer" title="Open full-size photograph">
            <img src={photoSrc} alt={photo.alt} onError={() => setMissing(true)} />
          </a>
        ) : (
          <div className="ece-gallery-missing">Photo coming soon.</div>
        )}
      </div>
      <div className="ece-gallery-toolbar">
        <div>
          <span className="ece-gallery-index">{photo?.label || 'Project photograph'}</span>
          <p>{photo?.description}</p>
        </div>
        {photoSet.length > 1 && (
          <div className="ece-gallery-arrows">
            <button type="button" onClick={() => move(-1)} aria-label="Previous project photo">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next project photo">→</button>
          </div>
        )}
      </div>
      {photoSet.length > 1 && (
        <div className="ece-gallery-thumbs" aria-label="Choose a project photograph">
          {photoSet.map((item, index) => {
            const src = item.image.startsWith('/') ? item.image : `${import.meta.env.BASE_URL}assets-ece/${item.image}`
            return (
              <button
                type="button"
                key={item.image}
                className={index === current ? 'selected' : ''}
                onClick={() => { setCurrent(index); setMissing(false) }}
                aria-label={`Show ${item.label}`}
                aria-pressed={index === current}
              >
                <img src={src} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      )}
      <div className="ece-gallery-notes">
        <div><p className="eyebrow">Build notes / {build.level}</p><h2>{build.name}</h2></div>
        <p>{build.detail}</p>
      </div>
    </section>
  )
}

export default function ECEPage() {
  const [selected, setSelected] = useState(0)
  const build = eceProjects[selected]
  const project = projects.find((item) => item.slug === 'first-ece-projects')

  return (
    <>
      <Nav />
      <main id="main" className="project-page project-first-ece-projects">
        <header className="case-hero">
          <a href="#work">← All work</a>
          <p className="eyebrow">Project {project.number} / case study</p>
          <h1>{project.title}</h1>
          <div><p>{project.kicker}</p><span>{project.summary}</span></div>
        </header>
        <div className="case-body">
          <div className="arcade-marquee ece-marquee">
            <span>LAB NOTES / TEXAS TECH UNIVERSITY</span>
            <strong>ECE WORKSHOP</strong>
            <i>REAL CIRCUITS · REAL DEBUGGING · BUILD 01</i>
          </div>
          <section className="arcade-grid ece-grid" aria-label="My first ECE projects">
            {eceProjects.map((item, index) => (
              <button
                className={selected === index ? 'selected' : ''}
                type="button"
                key={item.slug}
                onClick={() => setSelected(index)}
              >
                <span>BUILD {item.level}</span>
                <strong>{item.name}</strong>
                <small>{item.tech}</small>
                <i aria-hidden="true">{selected === index ? '▶' : '○'}</i>
              </button>
            ))}
            <div className="ece-upcoming">
              <span>UP NEXT</span>
              <strong>More builds are coming.</strong>
              <small>Each new electronics project will join this collection.</small>
            </div>
          </section>
          <div className="arcade-status" aria-live="polite">
            <span>ON THE BENCH</span>
            <strong>{build.name}</strong>
            <p>{build.status}. {build.description}</p>
          </div>
          <PhotoGallery build={build} />
          <section className="case-text-grid ece-notes">
            <h2>Learning logic.<br />One wire at a time.</h2>
            <div>
              <p>The four operations calculate in parallel. Two selection inputs choose ADD, AND, OR, or XOR; their selected lower result bits drive the seven-segment decoder.</p>
              <p><strong>What went into this build:</strong> {build.parts.join(' · ')}.</p>
              <p>More ECE projects, build photos, and lab notes will appear here as I make them.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer dark />
    </>
  )
}
