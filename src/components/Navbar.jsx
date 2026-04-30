import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Flex', to: '/flex' },
  { label: 'Camera', to: '/camera' },
  { label: 'About', to: '/about' },
  { label: 'Edit Gesture', to: '/edit-gesture' },
]

function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <NavLink className="logo" to="/">
          SIGNSPEAK
        </NavLink>
        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
