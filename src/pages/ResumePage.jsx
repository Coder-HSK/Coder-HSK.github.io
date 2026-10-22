import Nav from '../components/Nav'
import Footer from '../components/Footer'

const skills = ['Python', 'JavaScript', 'React', 'Vite', 'Supabase', 'HTML', 'CSS', 'Git', 'GitHub', 'SolidWorks', 'SimScale', 'Machine Learning', 'Robotics']

function Entry({ title, meta, children }) {
  return <article className="resume-entry"><h3>{title}</h3><p className="resume-meta">{meta}</p><p>{children}</p></article>
}

export default function ResumePage() {
  return (
    <>
      <Nav light />
      <main id="main" className="resume-page">
        <header className="resume-hero">
          <p className="eyebrow">Résumé / 2026</p>
          <h1>Hitendra<br />Annavarapu</h1>
          <div><p>Computer science student building practical software, robotics, and engineering systems.</p><button type="button" className="button button-dark" onClick={() => window.print()}>Print / save PDF ↓</button></div>
        </header>
        <div className="resume-layout">
          <div>
            <section className="resume-section"><h2>Education</h2><Entry title="Texas Tech University" meta="B.S. Computer Science · Sophomore · Lubbock, Texas">GPA: 3.62 · President’s List, Spring 2026 with a 4.00 semester GPA.</Entry><Entry title="Lebanon Trail High School" meta="Frisco, Texas">High School Diploma.</Entry></section>
            <section className="resume-section"><h2>Experience</h2><Entry title="USA Martial Arts" meta="Junior Instructor · 2022—Present">Instruct mixed-age classes of up to 34 students, ages 3–24, in technique, discipline, and physical conditioning.</Entry><Entry title="Pinnacle Full-Stack Interns" meta="Software Intern">Built machine-learning models for spam detection, genre classification, and price prediction.</Entry></section>
            <section className="resume-section"><h2>Engineering</h2><Entry title="Red Raider Racing" meta="Aerodynamics Team · Fall 2026—Present">Model race-car components in SolidWorks and evaluate airflow performance in SimScale.</Entry><Entry title="Raider Aerospace Society" meta="Member · Fall 2026—Present">Work across rocket design, manufacturing, simulation, testing, and launch projects.</Entry><Entry title="RATS Robotics Club" meta="Member · Fall 2026—Present">Apply coding concepts to robots for competitive events.</Entry></section>
          </div>
          <aside>
            <section className="resume-section"><h2>Selected projects</h2><Entry title="Campfire" meta="HackWesTX 2026">Study-room platform built by a team of four in 24 hours. Top 5 and Best Use of Auth0.</Entry><Entry title="DiskMetrics" meta="HackWesTX 2026 · TCL track">Native macOS storage health and I/O monitoring app.</Entry><Entry title="Python Game Portfolio" meta="2025—Present">Nine games of increasing complexity using object-oriented design.</Entry></section>
            <section className="resume-section"><h2>Skills</h2><ul className="resume-skills">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>
            <section className="resume-section"><h2>Leadership & service</h2><Entry title="Mechminds" meta="Founder & President">Founded a high-school robotics club and taught fundamentals and prototyping.</Entry><Entry title="Community service" meta="135+ hours">Service with North Texas Food Bank, Plano Haggard Library, Karya Siddi Hanuman Temple, and others.</Entry></section>
            <section className="resume-section resume-contact"><h2>Connect</h2><a href="https://www.linkedin.com/in/hitendra17/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/Coder-HSK" target="_blank" rel="noreferrer">GitHub ↗</a></section>
          </aside>
        </div>
      </main>
      <Footer dark />
    </>
  )
}
