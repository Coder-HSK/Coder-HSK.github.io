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

  if (path === '/resume') return <ResumePage />
  if (path.startsWith('/projects/')) return <ProjectPage slug={path.split('/')[2]} />
  return <Home />
}
