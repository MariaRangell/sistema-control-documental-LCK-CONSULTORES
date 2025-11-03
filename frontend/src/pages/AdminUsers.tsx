import React, { useEffect, useState } from 'react'

type Usuario = {
  id: number
  nombre_usuario: string
  correo: string
  nombre_completo: string
  rol: string
  empresa_asignada?: string | null
  activo: boolean
  email_verificado: boolean
}

export default function AdminUsers() {
  const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3003'
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [editing, setEditing] = useState<number|null>(null)
  const [form, setForm] = useState<Partial<Usuario>>({})

  const token = localStorage.getItem('token') || ''

  const fetchUsers = async () => {
    setLoading(true)
    setErr('')
    try {
      const resp = await fetch(`${API_URL}/api/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Error al cargar usuarios')
      setUsuarios(data.usuarios)
    } catch (e:any) {
      setErr(e.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const startEdit = (u: Usuario) => {
    setEditing(u.id)
    setForm(u)
  }
  const cancelEdit = () => { setEditing(null); setForm({}) }

  const saveEdit = async () => {
    if (!editing) return
    try {
      const resp = await fetch(`${API_URL}/api/users/${editing}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre_usuario: form.nombre_usuario,
          correo: form.correo,
          nombre_completo: form.nombre_completo,
          rol: form.rol,
          empresa_asignada: form.empresa_asignada,
          activo: form.activo
        })
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'No se pudo guardar')
      await fetchUsers()
      cancelEdit()
    } catch (e:any) {
      setErr(e.message || 'Error inesperado')
    }
  }

  const deleteUser = async (id: number) => {
    if (!confirm('¿Eliminar usuario?')) return
    try {
      const resp = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'No se pudo eliminar')
      await fetchUsers()
    } catch (e:any) {
      setErr(e.message || 'Error inesperado')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administración de Usuarios</h1>
      {err && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded">{err}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 border">ID</th>
                <th className="px-2 py-2 border">Usuario</th>
                <th className="px-2 py-2 border">Correo</th>
                <th className="px-2 py-2 border">Nombre</th>
                <th className="px-2 py-2 border">Rol</th>
                <th className="px-2 py-2 border">Empresa</th>
                <th className="px-2 py-2 border">Activo</th>
                <th className="px-2 py-2 border">Verificado</th>
                <th className="px-2 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border">{u.id}</td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <input className="border rounded p-1 w-40" value={form.nombre_usuario||''} onChange={e=>setForm(f=>({...f, nombre_usuario:e.target.value}))} />
                    ) : u.nombre_usuario}
                  </td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <input className="border rounded p-1 w-56" value={form.correo||''} onChange={e=>setForm(f=>({...f, correo:e.target.value}))} />
                    ) : u.correo}
                  </td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <input className="border rounded p-1 w-56" value={form.nombre_completo||''} onChange={e=>setForm(f=>({...f, nombre_completo:e.target.value}))} />
                    ) : u.nombre_completo}
                  </td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <select className="border rounded p-1" value={form.rol||''} onChange={e=>setForm(f=>({...f, rol:e.target.value}))}>
                        <option value="admin">admin</option>
                        <option value="empresa">empresa</option>
                        <option value="proveedor">proveedor</option>
                        <option value="rh">rh</option>
                        <option value="cliente">cliente</option>
                        <option value="auditoria">auditoria</option>
                        <option value="user">user</option>
                      </select>
                    ) : u.rol}
                  </td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <select className="border rounded p-1" value={form.empresa_asignada||''} onChange={e=>setForm(f=>({...f, empresa_asignada:e.target.value}))}>
                        <option value="">(ninguna)</option>
                        <option value="empresa">empresa</option>
                        <option value="cliente">cliente</option>
                        <option value="proveedor">proveedor</option>
                      </select>
                    ) : (u.empresa_asignada || '-')}
                  </td>
                  <td className="px-2 py-1 border">
                    {editing===u.id ? (
                      <input type="checkbox" checked={!!form.activo} onChange={e=>setForm(f=>({...f, activo:e.target.checked}))} />
                    ) : (u.activo ? 'Sí' : 'No')}
                  </td>
                  <td className="px-2 py-1 border">{u.email_verificado ? 'Sí' : 'No'}</td>
                  <td className="px-2 py-1 border space-x-2">
                    {editing===u.id ? (
                      <>
                        <button onClick={saveEdit} className="px-2 py-1 bg-green-600 text-white rounded">Guardar</button>
                        <button onClick={cancelEdit} className="px-2 py-1 bg-gray-400 text-white rounded">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={()=>startEdit(u)} className="px-2 py-1 bg-blue-600 text-white rounded">Editar</button>
                        <button onClick={()=>deleteUser(u.id)} className="px-2 py-1 bg-red-600 text-white rounded">Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
