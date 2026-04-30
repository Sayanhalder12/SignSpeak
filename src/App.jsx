import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Flex from './pages/Flex'
import Camera from './pages/Camera'
import About from './pages/About'
import EditGesture from './pages/EditGesture'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
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
