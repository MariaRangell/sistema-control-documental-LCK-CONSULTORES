import React, { useState } from 'react'

export default function Users() {
  const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3003'
  const [form, setForm] = useState({
    nombre_usuario: '',
    correo: '',
    nombre_completo: '',
    rol: 'user',
    // empresa_asignada fija para backend
    empresa_asignada: 'empresa'
  })
  const [msg, setMsg] = useState('')
  const [activationLink, setActivationLink] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    setActivationLink('')
    setErr('')
    setLoading(true)
    try {
      const token = localStorage.getItem('token') || ''
      const resp = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Error al crear usuario')
      setMsg(data.message || 'Usuario creado')
      if (data.activationLink) setActivationLink(data.activationLink)
      setForm({ nombre_usuario: '', correo: '', nombre_completo: '', rol: 'user', empresa_asignada: 'empresa' })
    } catch (e:any) {
      setErr(e.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Alta de Usuarios</h1>
      {msg && <div className="mb-3 p-2 bg-green-50 text-green-700 border border-green-200 rounded">{msg}</div>}
      {activationLink && (
        <div className="mb-3 p-2 bg-blue-50 text-blue-700 border border-blue-200 rounded break-all">
          Enlace de activación: <a className="underline" href={activationLink} target="_blank" rel="noreferrer">{activationLink}</a>
        </div>
      )}
      {err && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} className="mt-1 w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} className="mt-1 w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} className="mt-1 w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select name="rol" value={form.rol} onChange={handleChange} className="mt-1 w-full border rounded p-2">
            <option value="admin">admin</option>
            <option value="empresa">empresa</option>
            <option value="proveedor">proveedor</option>
            <option value="rh">rh</option>
            <option value="cliente">cliente</option>
            <option value="auditoria">auditoria</option>
            <option value="user">user</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <div className="mt-1 w-full border rounded p-2 bg-gray-50 text-gray-700">LCK CONSULTORES S.A. DE C.V.</div>
        </div>
        <button disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          {loading ? 'Creando...' : 'Crear usuario'}
        </button>
      </form>
    </div>
  )
} 