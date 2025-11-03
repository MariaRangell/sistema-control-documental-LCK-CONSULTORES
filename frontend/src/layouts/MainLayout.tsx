import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import {
  FileText, Users, Settings, LayoutDashboard,
  FolderOpen, FolderKey, ArrowLeftRight, Database, FileClock
} from 'lucide-react'

type UserRole = 'admin' | 'user' | 'empresa' | 'proveedor' | 'rh' | 'cliente' | 'auditoria'
type CompanyType = 'woco' | 'signify' | 'signify_luminarias'
type UserData = { 
  nombre: string; 
  rol: UserRole;
  empresa_asignada?: CompanyType;
  correo?: string;
  nombre_usuario?: string;
  id?: number;
}
type NavItem = { name: string; href: string; icon: React.ElementType }
type NavByRole = Partial<Record<UserRole, NavItem[]>>
type SubItem = { name: string; icon: string; href?: string }

// Menú por rol (ADMIN compacto y agrupado)
const navByRole: NavByRole = {
  admin: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Administración', href: '#', icon: Users },
    { name: 'Auditoría', href: '#', icon: FolderKey },
    // Convertir Configuración en menú con subitems
    { name: 'Configuración', href: '#', icon: Settings },
  ],
  user: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  // Otros roles mantienen navegación básica
  rh: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  cliente: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  proveedor: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  auditoria: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
}

function getSubItems(itemName: string, rol: UserRole): SubItem[] {
  // Grupo Administración (admin) - SIN usuarios (se mueven a Configuración)
  if (rol === 'admin' && itemName === 'Administración') {
    return [
      { name: 'RH', icon: '👥', href: '/rh' },
      { name: 'Clientes', icon: '🧾', href: '/clientes' },
      { name: 'Proveedores', icon: '📦', href: '/proveedores' },
    ]
  }
  // Grupo Auditoría
  if (rol === 'admin' && itemName === 'Auditoría') {
    return [
      { name: 'Accesos', icon: '🔑', href: '/auditoria/accesos' },
      { name: 'Discrepancias', icon: '⚠️', href: '/auditoria/discrepancias' },
      { name: 'Base de Datos', icon: '🗄️', href: '/auditoria/base-datos' },
      { name: 'Monitoreo', icon: '📊', href: '/auditoria/monitoreo' },
    ]
  }
  // Configuración: aquí van Usuarios (Alta/Admin) y Ajustes
  if (rol === 'admin' && itemName === 'Configuración') {
    return [
      { name: 'Usuarios (Alta)', icon: '👤➕', href: '/users' },
      { name: 'Usuarios (Admin)', icon: '👥⚙️', href: '/configuracion/usuarios' },
      { name: 'Ajustes del sistema', icon: '⚙️', href: '/settings' },
    ]
  }
  return []
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData>({ nombre: '', rol: 'user' })
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleToggle = (name: string) => {
    setOpenMenu(prev => (prev === name ? null : name))
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:3003/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  const navigation: NavItem[] = navByRole[user.rol] || []

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-24 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs font-bold">LCK</span>
            </div>
            <nav className="hidden md:flex flex-wrap gap-x-6 overflow-visible" ref={menuRef}>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                const subItems = getSubItems(item.name, user.rol)
                const isOpen = openMenu === item.name

                return subItems.length > 0 ? (
                  <div
                    key={item.name}
                    className="relative inline-block text-left"
                    onMouseEnter={() => setOpenMenu(item.name)}
                  >
                    <button onClick={() => handleToggle(item.name)} className="inline-flex items-center border-b-2 px-2 pt-1 text-sm font-medium text-black border-transparent hover:border-gray-300 hover:text-gray-700 focus:outline-none">
                      <item.icon className="mr-2 h-5 w-5 text-black" />
                      {item.name}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div
                        className="absolute left-0 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-2"
                        onMouseDown={(e)=>e.stopPropagation()}
                      >
                        <div className="flex flex-col">
                          {subItems.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.href || '#'}
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center px-3 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-red-700 rounded"
                            >
                              <span className="mr-3 w-4 text-center">{subItem.icon}</span>
                              <span className="leading-5">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center border-b-2 px-2 pt-1 text-sm font-medium text-black ${
                      isActive ? 'border-indigo-500' : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5 text-black" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="font-semibold text-gray-900 truncate max-w-[26ch]" title={user.nombre}>{user.nombre}</div>
              <div className="text-xs text-gray-500 capitalize truncate max-w-[30ch]">
                {user.rol} - empresa
              </div>
              <div className="text-[11px] text-gray-600 truncate max-w-[40ch]" title="LCK CONSULTORES S.A. DE C.V.">
                LCK CONSULTORES S.A. DE C.V.
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              title="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
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
