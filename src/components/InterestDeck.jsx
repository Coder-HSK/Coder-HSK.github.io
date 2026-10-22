const stickers = [
  { label: 'PY', detail: 'Python builder', className: 'sticker-python' },
  { label: 'GTR', detail: 'Learning guitar', className: 'sticker-guitar' },
  { label: '1 DAN', detail: 'Taekwondo black belt', className: 'sticker-belt' },
  { label: 'VB', detail: 'Volleyball', className: 'sticker-volleyball' },
]

export default function InterestDeck() {
  return (
    <section className="interests-section" id="interests" aria-labelledby="interests-title">
      <div className="section-heading section-heading-dark">
        <p className="eyebrow">Off the clock / on the board</p>
        <h2 id="interests-title">Same person. Different terrain.</h2>
      </div>
      <div className="deck-scene">
        <div className="skateboard" role="img" aria-label="A skateboard covered with stickers for Python, guitar, taekwondo, and volleyball">
          <div className="deck-bolts left" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="deck-bolts right" aria-hidden="true"><i /><i /><i /><i /></div>
          {stickers.map((sticker) => <span className={`deck-sticker ${sticker.className}`} key={sticker.label}>{sticker.label}</span>)}
        </div>
        <div className="truck left" aria-hidden="true"><i /><b /></div>
        <div className="truck right" aria-hidden="true"><i /><b /></div>
      </div>
      <ul className="interest-legend">
        {stickers.map((sticker) => <li key={sticker.label}><span>{sticker.label}</span>{sticker.detail}</li>)}
      </ul>
    </section>
  )
}
