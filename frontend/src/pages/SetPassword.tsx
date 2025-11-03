import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function SetPassword() {
  const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3003'
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const token = searchParams.get('token') || ''

  useEffect(() => {
    if (!token) setErr('Token inválido')
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    setErr('')
    if (!password || password !== confirm) {
      setErr('Las contraseñas no coinciden')
      return
    }
    try {
      const resp = await fetch(`${API_URL}/api/users/establecer-contrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Error al establecer contraseña')
      setMsg('Contraseña establecida. Ya puedes iniciar sesión.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (e:any) {
      setErr(e.message || 'Error inesperado')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Establecer contraseña</h1>
      {msg && <div className="mb-3 p-2 bg-green-50 text-green-700 border border-green-200 rounded">{msg}</div>}
      {err && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
          <input type="password" className="mt-1 w-full border rounded p-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input type="password" className="mt-1 w-full border rounded p-2" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Guardar</button>
      </form>
    </div>
  )
}
