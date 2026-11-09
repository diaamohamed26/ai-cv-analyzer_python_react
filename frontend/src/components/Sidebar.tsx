import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileSearch,
  Upload,
  Sparkles,
} from 'lucide-react'

const items = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'CV Analysis', path: '/analysis', icon: FileSearch },
]

function Sidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-gray-800 bg-[#0b0d17] p-5 lg:block">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Workspace
      </p>

      <nav className="space-y-2">
        {items.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-purple-600/15 text-purple-300'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={19} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
        <Sparkles className="mb-3 text-purple-400" size={22} />
        <h3 className="font-semibold text-white">Powered by Groq AI</h3>
        <p className="mt-2 text-xs leading-5 text-gray-400">
          Get insights and recommendations from your CV.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar