import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { campfireScreens, diskScreens, games, projects } from '../data/content'

const rawBase = 'https://raw.githubusercontent.com/Coder-HSK/Coder-HSK.github.io/main'

function ScreenCarousel({ screens, folder, tone = 'campfire' }) {
  const [current, setCurrent] = useState(0)
  const active = screens[current]
  const move = (direction) => setCurrent((value) => (value + direction + screens.length) % screens.length)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`screen-showcase ${tone}`}>
      <div className="laptop-wrap">
        <div className="laptop-lid">
          <div className="laptop-camera" />
          <img src={`${rawBase}/${folder}/${active[0]}`} alt={`${active[1]} screen from the project`} />
        </div>
        <div className="laptop-base" aria-hidden="true"><i /></div>
      </div>
      <div className="screen-copy" aria-live="polite">
        <p className="eyebrow">Screen {String(current + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</p>
        <h2>{active[1]}</h2>
        <p>{active[2]}</p>
        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous screen">←</button>
          <div className="screen-dots" aria-label="Choose a screen">
            {screens.map((screen, index) => <button key={screen[0]} type="button" className={index === current ? 'active' : ''} onClick={() => setCurrent(index)} aria-label={`Show ${screen[1]}`} />)}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next screen">→</button>
        </div>
      </div>
    </div>
  )
}

function CampfireCase() {
  return (
    <>
      <div className="case-meta"><span>HackWesTX 2026</span><span>4-person team</span><span>24 hours</span><span>Top 5 · Best Use of Auth0</span></div>
      <ScreenCarousel screens={campfireScreens} folder="assets-campfire" />
      <section className="case-text-grid">
        <h2>Teach the syllabus.<br />Not the other way around.</h2>
        <div><p>Campfire turns a shared syllabus into a visible learning map. Each topic begins untouched and changes as the group teaches, reviews, and verifies it together.</p><p>Auth0 handles secure sign-in; Supabase and PostgreSQL support rooms and progress; Claude, Gemini, and ElevenLabs power the AI-assisted learning experiences.</p></div>
      </section>
    </>
  )
}

function GamesCase() {
  const [selected, setSelected] = useState(0)
  const activeGame = games[selected]
  const gameUrl = `${import.meta.env.BASE_URL}Games/${activeGame.file}`

  return (
    <>
      <div className="arcade-marquee"><span>INSERT CURIOSITY</span><strong>PYTHON ARCADE</strong><i>PLAYER 01 · READY</i></div>
      <section className="arcade-grid" aria-label="Python games">
        {games.map((game, index) => (
          <button className={selected === index ? 'selected' : ''} type="button" key={game.name} onClick={() => setSelected(index)}>
            <span>LVL {game.level}</span><strong>{game.name}</strong><small>{game.tech}</small><i aria-hidden="true">{selected === index ? '▶' : '○'}</i>
          </button>
        ))}
      </section>
      <div className="arcade-status" aria-live="polite"><span>NOW SELECTED</span><strong>{activeGame.name}</strong><p>{activeGame.playable ? 'Playable in the browser through the same Python terminal used in the original portfolio.' : 'This pygame project needs a local graphics window; its original project page and source notes are shown below.'}</p></div>
      <section className="python-console" aria-labelledby="python-console-title">
        <div className="python-console-bar">
          <div><i /><i /><i /></div>
          <span id="python-console-title">{activeGame.file} / {activeGame.playable ? 'browser-playable' : 'source walkthrough'}</span>
          <a href={gameUrl} target="_blank" rel="noreferrer">Open full screen ↗</a>
        </div>
        <iframe key={activeGame.file} src={gameUrl} title={`${activeGame.name} interactive project`} loading="lazy" />
      </section>
      <a className="button button-dark" href="https://coder-hsk.github.io/Project_2.html" target="_blank" rel="noreferrer">Open the original game archive ↗</a>
    </>
  )
}

function DiskCase() {
  return (
    <>
      <div className="case-meta"><span>HackWesTX 2026</span><span>TCL track</span><span>24 hours</span><span>Native macOS app</span></div>
      <ScreenCarousel screens={diskScreens} folder="assets-diskmetrics" tone="disk" />
      <section className="case-text-grid"><h2>Your disk is busy.<br />Now you know why.</h2><div><p>DiskMetrics compresses storage health, capacity trends, and live I/O into a lightweight menu-bar experience.</p><p>The expanded dashboard adds S.M.A.R.T.-based health, time-to-full projection, process-level activity, filesystem diagnostics, and configurable alerts.</p></div></section>
    </>
  )
}

function PortfolioCase() {
  return (
    <div className="before-after">
      <div><span>THEN / STATIC HTML</span><h2>Building things<br />that move<br />& think.</h2><p>The first version established the core story: robotics, software, and practical projects.</p></div>
      <div><span>NOW / REACT + GSAP</span><h2>More motion.<br />More depth.<br />Same builder.</h2><p>This rebuild adds a cinematic entry, accessible interactions, project narratives, and a clearer path through the work.</p></div>
    </div>
  )
}

export default function ProjectPage({ slug }) {
  const project = projects.find((item) => item.slug === slug) || projects[0]
  const content = { campfire: <CampfireCase />, 'python-games': <GamesCase />, diskmetrics: <DiskCase />, 'robotics-site': <PortfolioCase /> }[project.slug]

  return (
    <>
      <Nav />
      <main id="main" className={`project-page project-${project.slug}`}>
        <header className="case-hero">
          <a href="#work">← All work</a>
          <p className="eyebrow">Project {project.number} / case study</p>
          <h1>{project.title}</h1>
          <div><p>{project.kicker}</p><span>{project.summary}</span></div>
        </header>
        <div className="case-body">{content}</div>
      </main>
      <Footer dark />
    </>
  )
}
