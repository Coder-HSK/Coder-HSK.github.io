import Nav from '../components/Nav'
import Hero from '../components/Hero'
import ProjectPile from '../components/ProjectPile'
import ExperienceGame from '../components/ExperienceGame'
import InterestDeck from '../components/InterestDeck'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <section className="manifesto" id="intro" aria-labelledby="manifesto-title">
          <p className="eyebrow">Profile / 2026</p>
          <h2 id="manifesto-title">Not just code on a screen.</h2>
          <div className="manifesto-grid">
            <p className="manifesto-lead">I’m a computer science student drawn to the place where software meets the physical world.</p>
            <div>
              <p>That means airflow simulations for race cars, code for competitive robots, study tools built under a 24-hour clock, and small games that taught me how larger systems fit together.</p>
              <p>I care about clear interfaces, useful feedback, and building things that actually do something.</p>
            </div>
          </div>
          <div className="manifesto-stats" aria-label="Highlights">
            <div><strong>Top 5</strong><span>HackWesTX 2026</span></div>
            <div><strong>Best Auth0</strong><span>Campfire · team of four</span></div>
            <div><strong>135+</strong><span>Volunteer hours</span></div>
            <div><strong>3.62</strong><span>Texas Tech GPA</span></div>
          </div>
        </section>
        <ProjectPile />
        <ExperienceGame />
        <InterestDeck />
      </main>
      <Footer dark />
    </>
  )
}
