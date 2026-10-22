export default function Footer({ dark = false }) {
  return (
    <footer className={dark ? 'footer footer-dark' : 'footer'}>
      <p className="eyebrow">Start a conversation</p>
      <h2>Have a hard problem?<br />I like those.</h2>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/hitendra17/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/Coder-HSK" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="#/resume" data-route>Résumé →</a>
      </div>
      <div className="footer-bottom"><span>Hitendra Annavarapu</span><span>Robotics + software · 2026</span></div>
    </footer>
  )
}
