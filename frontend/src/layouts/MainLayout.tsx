import { Outlet } from 'react-router-dom'
import { FileText, Users, Settings, LayoutDashboard } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'

type UserRole = 'admin' | 'user' | 'viewer'
type UserData = { nombre: string; rol: UserRole }

type NavItem = { name: string; href: string; icon: React.ElementType }

type NavByRole = {
  admin: NavItem[]
  user: NavItem[]
  viewer: NavItem[]
}

const navByRole: NavByRole = {
  admin: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Usuarios', href: '/users', icon: Users },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  user: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  viewer: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
  ],
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData>({ nombre: '', rol: 'viewer' })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navigation: NavItem[] = navByRole[user.rol] || []

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navbar global */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <img
              className="h-16 w-auto"
              src="/logo1.png"
              alt="LCK Consultores"
            />
            <nav className="sm:flex sm:space-x-8">
              {navigation.map((item: NavItem) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-black ${
                      isActive
                        ? 'border-indigo-500'
                        : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5 text-black" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700">{user.nombre}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      {/* Espacio para el header fijo */}
      <div className="pt-16">
        <main className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}   