import { useEffect, useState } from 'react'

const interests = [
  {
    id: 'coding',
    label: 'Coding',
    kicker: 'Compiles eventually.',
    className: 'sticker-coding',
    icon: 'computer',
    copy: 'I like building things, breaking them in oddly specific ways, and learning enough to put them back together better.',
    facts: [
      'Currently learning C.',
      'Intermediate with Python.',
      'HTML and CSS are my favorite creative playground.',
      'Beginner territory: JavaScript, React, and JSX.',
    ],
  },
  {
    id: 'music',
    label: 'Music',
    kicker: 'Soundtrack required.',
    className: 'sticker-music',
    icon: 'headphones',
    copy: 'Everything I do needs music in the background. That obsession eventually convinced me to stop only listening and start learning too.',
    facts: ['Learning electric guitar.', 'Learning electric keyboard.', 'Silence is fine. A great playlist is better.'],
  },
  {
    id: 'fitness',
    label: 'Fitness',
    kicker: 'Ctrl + Alt + Lift.',
    className: 'sticker-fitness',
    icon: 'dumbbell',
    copy: 'If something goes wrong—or I am simply having a rough day—the gym is my reset button. I go regularly, not just when life throws an error.',
    facts: ['Gym regular.', 'Best stress debugger I have found.', 'The room where I feel capable of taking on anything.'],
  },
  {
    id: 'volleyball',
    label: 'Volleyball',
    kicker: 'Friendship, gravity, questionable dives.',
    className: 'sticker-volleyball',
    icon: 'volleyball',
    copy: 'I love playing volleyball with friends. The spark came from Haikyu!!, a high-energy, spoiler-free story about determined high-school players learning teamwork, timing, and how to challenge much bigger opponents.',
    facts: ['Best played with friends.', 'Inspired by Haikyu!!', 'Yes, every good rally feels cinematic.'],
  },
  {
    id: 'travel',
    label: 'Travel',
    kicker: 'Every trip becomes a side quest.',
    className: 'sticker-travel',
    icon: 'car',
    copy: 'When I visit somewhere new, I explore until curiosity is completely satisfied—or until my feet file a formal complaint.',
    facts: ['Dream stops: Japan, Germany, and Paris.', 'Long-term quest: see all seven wonders.', 'No interesting side street left behind.'],
  },
  {
    id: 'games',
    label: 'Games',
    kicker: 'Side quests are the main quest.',
    className: 'sticker-games',
    icon: 'controller',
    copy: 'Story-mode games are my favorite kind of disappearing act. Valorant and Fortnite are the reliable go-tos—they helped make lockdown a lot more survivable.',
    facts: [
      'Finished: RE9, Stray, Red Dead Redemption 2, and Hollow Knight.',
      'Next up: Black Myth: Wukong, Marvel’s Spider-Man, Uncharted 4, Ghost of Tsushima, and Ghost of Yōtei.',
      'Backlog status: thriving and slightly dangerous.',
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    kicker: 'Evidence that I leave the keyboard.',
    className: 'sticker-photography',
    icon: 'polaroid',
    copy: 'I am still an amateur, but I love being the person behind the camera—catching raw emotion, small in-between moments, and landscapes that refuse to look ordinary.',
    facts: ['People, emotion, and unplanned moments.', 'Landscapes whenever the view demands it.', 'Professional level: enthusiastic camera person.'],
  },
]

function InterestIcon({ type }) {
  const shared = { viewBox: '0 0 100 100', 'aria-hidden': true, focusable: 'false' }

  if (type === 'computer') return (
    <svg {...shared}><rect x="14" y="16" width="72" height="53" rx="5" /><path d="M23 26h54v32H23zM36 83h28M43 69l-3 14m17-14 3 14" /><path d="m30 39 8 7-8 7m14 0h15" /></svg>
  )
  if (type === 'headphones') return (
    <svg {...shared}><path d="M19 53V43a31 31 0 0 1 62 0v10" /><rect x="13" y="48" width="18" height="32" rx="8" /><rect x="69" y="48" width="18" height="32" rx="8" /><path d="M31 73c7 8 15 11 25 11" /></svg>
  )
  if (type === 'dumbbell') return (
    <svg {...shared}><path d="M28 50h44" /><rect x="18" y="34" width="11" height="32" rx="3" /><rect x="8" y="39" width="10" height="22" rx="3" /><rect x="71" y="34" width="11" height="32" rx="3" /><rect x="82" y="39" width="10" height="22" rx="3" /></svg>
  )
  if (type === 'volleyball') return (
    <svg {...shared}><circle cx="50" cy="50" r="38" /><path d="M50 12c8 12 9 24 3 35M18 31c14-1 25 5 34 16M15 66c13-7 26-7 38 0M53 47c14 2 25 10 32 22M53 47c7 12 6 25-2 40" /></svg>
  )
  if (type === 'car') return (
    <svg {...shared}><path d="M14 59v-8l9-5 9-18h37l11 18 8 5v19H14z" /><path d="M32 28 25 47h52L68 28M20 57h13m34 0h15" /><circle cx="29" cy="70" r="9" /><circle cx="73" cy="70" r="9" /></svg>
  )
  if (type === 'controller') return (
    <svg {...shared}><path d="M31 30h38c10 0 16 8 18 18l4 22c2 10-10 15-16 7L63 63H37L25 77c-7 8-18 3-16-7l4-22c2-10 8-18 18-18Z" /><path d="M27 47v17M18.5 55.5h17M67 49h.1M77 58h.1" /></svg>
  )
  return (
    <svg {...shared}><path d="M22 12h52l7 11v65H22z" /><path d="M22 24h59M35 12v12" /><circle cx="52" cy="49" r="17" /><circle cx="52" cy="49" r="8" /><path d="M32 75h39" /></svg>
  )
}

export default function InterestDeck() {
  const [activeId, setActiveId] = useState(null)
  const [pinned, setPinned] = useState(false)
  const active = interests.find((interest) => interest.id === activeId)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveId(null)
        setPinned(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const toggleInterest = (id) => {
    if (activeId === id && pinned) {
      setActiveId(null)
      setPinned(false)
      return
    }
    setActiveId(id)
    setPinned(true)
  }

  return (
    <section
      className="interests-section"
      id="interests"
      aria-labelledby="interests-title"
      onPointerLeave={() => {
        if (!pinned) setActiveId(null)
      }}
    >
      <div className="section-heading section-heading-dark">
        <p className="eyebrow">Off the clock / on the board</p>
        <h2 id="interests-title">Same person. Different terrain.</h2>
        <p>Hover, focus, or tap a sticker. Every one has a story hiding underneath.</p>
      </div>

      <div className="interest-showcase">
        <div className="deck-scene">
          <div className="skateboard" aria-label="A tall skateboard covered with seven interactive interest stickers">
            <div className="deck-texture" aria-hidden="true" />
            <div className="deck-bolts left" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="deck-bolts right" aria-hidden="true"><i /><i /><i /><i /></div>
            <span className="deck-tag tag-build" aria-hidden="true">BUILD</span>
            <span className="deck-tag tag-play" aria-hidden="true">PLAY</span>
            <span className="deck-tag tag-roam" aria-hidden="true">ROAM</span>
            {interests.map((interest) => (
              <button
                type="button"
                className={`deck-sticker ${interest.className}${activeId === interest.id ? ' is-active' : ''}`}
                key={interest.id}
                aria-label={`Open ${interest.label} story`}
                aria-expanded={activeId === interest.id}
                aria-controls="interest-story"
                onPointerEnter={() => setActiveId(interest.id)}
                onFocus={() => setActiveId(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              >
                <InterestIcon type={interest.icon} />
                <span>{interest.label}</span>
              </button>
            ))}
          </div>
          <div className="truck left" aria-hidden="true"><i /><b /></div>
          <div className="truck right" aria-hidden="true"><i /><b /></div>
        </div>

        <div className={`interest-panel-slot${active ? ` has-story from-${active.id}` : ''}`} id="interest-story" aria-live="polite">
          {active ? (
            <article className="interest-panel" key={active.id}>
              <div className="interest-photo-placeholder" aria-label={`${active.label} photo placeholder`}>
                <InterestIcon type={active.icon} />
                <span>Your {active.label.toLowerCase()} photo goes here</span>
                <small>Photo evidence incoming</small>
              </div>
              <div className="interest-story-copy">
                <p className="eyebrow">{active.label} / personal file</p>
                <h3>{active.kicker}</h3>
                <p>{active.copy}</p>
                <ul>
                  {active.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </div>
              <button
                className="interest-close"
                type="button"
                aria-label={`Close ${active.label} story`}
                onClick={() => {
                  setActiveId(null)
                  setPinned(false)
                }}
              >Close ×</button>
            </article>
          ) : (
            <div className="interest-panel-empty">
              <span>Pick a sticker</span>
              <p>Seven interests. One skateboard. Absolutely no sensible filing system.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
