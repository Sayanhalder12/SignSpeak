import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Flex', to: '/flex' },
  { label: 'Camera', to: '/camera' },
  { label: 'Edit Gesture', to: '/edit-gesture' },
  { label: 'About', to: '/about' },
]

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <div className="navbar-side navbar-left">
          <NavLink className="logo" to="/">
            SIGNSPEAK
          </NavLink>
        </div>
        <div className="nav-links navbar-center">
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
        <div className="navbar-side navbar-right">
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            <span className="theme-icon" aria-hidden="true">
              {theme === 'dark' ? '☀' : '🌙'}
            </span>
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
