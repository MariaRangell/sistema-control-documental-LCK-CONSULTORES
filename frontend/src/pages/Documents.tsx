import React, { useEffect, useState } from 'react'

type GFile = {
  id: string
  name: string
  mimeType?: string
  modifiedTime?: string
  size?: string
}

export default function Documents() {
  const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3003'
  const [files, setFiles] = useState<GFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token') || ''
        if (!token) {
          setError('Inicia sesión para ver tus documentos')
          setLoading(false)
          return
        }
        const res = await fetch(`${API_URL}/api/drive/list`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'No se pudieron cargar los archivos')
        const sorted = (data.files || []).sort((a: GFile, b: GFile) => (
          new Date(b.modifiedTime || 0).getTime() - new Date(a.modifiedTime || 0).getTime()
        ))
        setFiles(sorted)
      } catch (e:any) {
        setError(e.message || 'Error inesperado')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Documentos recientes</h1>
      </div>
      {loading && <div>Cargando…</div>}
      {error && !loading && (
        <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
      )}
      {!loading && !error && (
        files.length === 0 ? (
          <div className="text-gray-500">No hay archivos recientes.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((f) => (
              <div key={f.id} className="border rounded-lg p-3 hover:shadow">
                <div className="font-medium truncate" title={f.name}>{f.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {f.modifiedTime ? new Date(f.modifiedTime).toLocaleString() : ''}
                </div>
                <div className="text-xs text-gray-500">{f.size ? `${Math.round(Number(f.size)/1024)} KB` : ''}</div>
                <a
                  href={`https://drive.google.com/file/d/${f.id}/view`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-sm text-red-600 hover:underline"
                >
                  Abrir en Drive
                </a>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
} 