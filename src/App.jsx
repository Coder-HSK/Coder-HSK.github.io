import { useEffect, useState } from 'react'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import ResumePage from './pages/ResumePage'

function useRoute() {
  const readRoute = () => window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/'
  const [path, setPath] = useState(readRoute)

  useEffect(() => {
    const onChange = () => setPath(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (next) => {
    const route = next.replace(/^#/, '')
    window.location.hash = route
    setPath(route)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return [path, navigate]
}

export default function App() {
  const [path, navigate] = useRoute()

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[data-route]')
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return
      event.preventDefault()
      navigate(link.getAttribute('href'))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const skipToContent = (event) => {
    event.preventDefault()
    const main = document.getElementById('main')
    if (!main) return

    main.tabIndex = -1
    main.focus({ preventScroll: true })
    main.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  let page = <Home />
  if (path === '/resume') page = <ResumePage />
  if (path.startsWith('/projects/')) page = <ProjectPage slug={path.split('/')[2]} />

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to content</a>
      {page}
    </>
  )
}
