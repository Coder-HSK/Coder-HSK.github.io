import { useEffect, useRef, useState } from 'react'
import { timeline } from '../data/content'

export default function ExperienceGame() {
  const [position, setPosition] = useState(0)
  const sectionRef = useRef(null)

  const move = (direction) => setPosition((current) => Math.max(0, Math.min(timeline.length - 1, current + direction)))

  useEffect(() => {
    const onKey = (event) => {
      if (!sectionRef.current?.contains(document.activeElement)) return
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const entry = timeline[position]

  return (
    <section className="experience-section" id="experience" ref={sectionRef} aria-labelledby="experience-title">
      <div className="section-heading">
        <p className="eyebrow">Work experience / playable timeline</p>
        <h2 id="experience-title">Every role unlocks the next.</h2>
        <p>Move the character across the platform to explore current work, research, leadership, and engineering roles.</p>
      </div>
      <div className="timeline-game" tabIndex="0" aria-label={`Timeline checkpoint ${position + 1} of ${timeline.length}: ${entry.title}`}>
        <div className="game-sky" aria-hidden="true"><span>··</span><span>+</span><span>·</span></div>
        <div className="checkpoint-detail" aria-live="polite">
          <span>{String(position + 1).padStart(2, '0')} / {String(timeline.length).padStart(2, '0')} · {entry.label}</span>
          <h3>{entry.title}</h3>
          <strong>{entry.role}</strong>
          <p>{entry.text}</p>
        </div>
        <div className="platform-track" style={{ '--position': position, '--count': timeline.length }}>
          <div className="runner" aria-hidden="true"><i /><b /></div>
          {timeline.map((item, index) => (
            <button
              className={`checkpoint ${index <= position ? 'is-cleared' : ''}`}
              key={item.title}
              type="button"
              onClick={() => setPosition(index)}
              aria-label={`Go to ${item.title}`}
              aria-current={index === position ? 'step' : undefined}
            >
              <span>{index + 1}</span>
              <small aria-hidden="true">{item.title}</small>
            </button>
          ))}
        </div>
        <div className="game-controls">
          <button type="button" onClick={() => move(-1)} disabled={position === 0}>← Previous</button>
          <button type="button" onClick={() => move(1)} disabled={position === timeline.length - 1}>Next →</button>
        </div>
      </div>
    </section>
  )
}
