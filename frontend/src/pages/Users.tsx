import { useState } from 'react'
import { UserPlus, Search, Mail, Phone, Shield } from 'lucide-react'

type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer' | 'cliente' | 'proveedor' 
  status: 'active' | 'inactive'
  lastLogin: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@lck.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15 10:30'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@lck.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-15 09:15'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos.lopez@lck.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-03-14 16:45'
  },
  {
    id: 4,
    name: 'María García',
    email: 'maria.garcia@lck.com',
    role: 'cliente',
    status: 'active',
    lastLogin: '2024-03-15 09:15'
  },
  ,
  {
    id: 5,
    name: 'María García',
    email: 'maria.garcia@lck.com',
    role: 'proveedor',
    status: 'active',
    lastLogin: '2024-03-15 09:15'
  },
]

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  user: 'bg-blue-100 text-blue-800',
  viewer: 'bg-gray-100 text-gray-800'
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800'
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los usuarios registrados en el sistema
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlus className="inline-block h-4 w-4 mr-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rol
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Último Acceso
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-400 mr-2" />
                          {user.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {user.email}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role === 'admin' && 'Administrador'}
                          {user.role === 'user' && 'Usuario'}
                          {user.role === 'viewer' && 'Visualizador'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[user.status]}`}>
                          {user.status === 'active' && 'Activo'}
                          {user.status === 'inactive' && 'Inactivo'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Editar<span className="sr-only">, {user.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 