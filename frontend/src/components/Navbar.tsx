import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, FileSearch, LayoutDashboard, Home } from 'lucide-react'

const links = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Analysis', path: '/analysis', icon: FileSearch },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
      isActive
        ? 'bg-purple-500/15 text-purple-300'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0b0d17]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-600 p-2">
            <FileSearch size={21} />
          </div>
          <span className="text-lg font-bold text-white">
            CV<span className="text-purple-400">Analyzer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map(({ name, path }) => (
            <NavLink key={path} to={path} className={linkClass}>
              {name}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-800 p-4 md:hidden">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              <Icon size={17} />
              {name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar