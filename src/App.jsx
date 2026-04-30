import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Flex from './pages/Flex'
import Camera from './pages/Camera'
import About from './pages/About'
import EditGesture from './pages/EditGesture'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('signspeak-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('signspeak-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flex" element={<Flex />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/about" element={<About />} />
          <Route path="/edit-gesture" element={<EditGesture />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
