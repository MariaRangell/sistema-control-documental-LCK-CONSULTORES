import React, { useState, FormEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// TypeScript interfaces
interface Document {
  id: number;
  title: string;
  type: 'pdf' | 'word' | 'excel' | 'imagen';
  category: string;
  status: 'activo' | 'revision' | 'archivado';
  date: string;
  author: string;
  size: string;
}

interface FormData {
  docTitle: string;
  docType: string;
  docCategory: string;
  docDescription: string;
}

interface LocationState {
  seccion?: string;
  tipo?: string;
  rol?: string;
}

type UserRole = 'admin' | 'rh' | 'cliente' | 'proveedor' | 'empresa' | 'auditoria';

// NUEVA ESTRUCTURA: Menús organizados por ROL y luego por SECCIÓN
const menusPorRol: Record<UserRole, Record<string, Array<{ id: string; label: string; icon: string }>>> = {
  empresa: {
    finanzas: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'tesoreria', label: 'Tesorería', icon: '💰' },
      { id: 'sat', label: 'SAT', icon: '🏛️' },
      { id: 'secretaria-finanzas', label: 'Secretaría de Finanzas', icon: '🧾' },
      { id: 'balances', label: 'Balances', icon: '⚖️' }
    ],
    legal: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'permisos', label: 'Permisos', icon: '🧾' },
      { id: 'lineamientos', label: 'Lineamientos', icon: '📋' },
      { id: 'sat', label: 'SAT', icon: '🏛️' },
      { id: 'repse', label: 'Aviso de Registro REPSE', icon: '📤' }
    ],
    infraestructura: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'organigrama', label: 'Organigrama', icon: '🏢' },
      { id: 'instalaciones', label: 'Instalaciones', icon: '🏭' },
      { id: 'inventarios', label: 'Inventarios', icon: '📋' },
      { id: 'activos', label: 'Activos', icon: '💼' }
    ],
    facturacion: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'altas-bajas', label: 'Altas/Bajas', icon: '👥' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📤' },
      { id: 'base-datos', label: 'Base de Datos', icon: '🗄️' },
      { id: 'refacturacion', label: 'Refacturación', icon: '📋' }
    ]
  },
  
  rh: {
    contratos: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'altas-bajas', label: 'Altas/Bajas', icon: '📊' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📁' },
      { id: 'pendientes', label: 'Pendientes', icon: '⏳' },
      { id: 'base-datos', label: 'Base de Datos', icon: '💾' }
    ],
    nomina: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📤' },
      { id: 'administracion', label: 'Administración', icon: '⚙️' },
      { id: 'recibos', label: 'Recibos', icon: '🧾' },
      { id: 'discrepancias', label: 'Discrepancias', icon: '⚠️' }
    ],
    expedientes: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'organigrama', label: 'Organigrama', icon: '🏢' },
      { id: 'instalaciones', label: 'Instalaciones', icon: '🏭' },
      { id: 'inventarios', label: 'Inventarios', icon: '📋' },
      { id: 'activos', label: 'Activos', icon: '💼' }
    ],
    equipos: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'altas-bajas', label: 'Altas/Bajas', icon: '👥' },
      { id: 'inventario', label: 'Inventario', icon: '📋' },
      { id: 'asignacion', label: 'Asignación', icon: '🎯' },
      { id: 'status', label: 'Status', icon: '📊' }
    ]
  },
  
  auditoria: {
    monitoreo: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'rendimiento', label: 'Rendimiento', icon: '📊' },
      { id: 'procesos', label: 'Procesos', icon: '📤' },
      { id: 'alertas', label: 'Alertas', icon: '⚠️' },
      { id: 'reportes', label: 'Reportes', icon: '🎯' }
    ],
    accesos: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'conexiones', label: 'Conexiones', icon: '⚙️' },
      { id: 'consultas', label: 'Consultas', icon: '📋' },
      { id: 'bajas', label: 'Bajas', icon: '👥' },
      { id: 'restricciones', label: 'Restricciones', icon: '⚠️' }
    ],
    'base-datos': [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'database', label: 'Base de Datos', icon: '🗄️' },
      { id: 'administracion', label: 'Administración', icon: '💼' },
      { id: 'reportar', label: 'Reportar', icon: '⚠️' },
      { id: 'capacidad', label: 'Capacidad', icon: '✅' }
    ],
    discrepancias: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'cargas', label: 'Cargas', icon: '📤' },
      { id: 'estatus', label: 'Estatus de los Archivos', icon: '✅' },
      { id: 'modificaciones', label: 'Modificaciones', icon: '📋' },
      { id: 'avisos', label: 'Avisos', icon: '⚠️' }
    ]
  },
  
  cliente: {
    contratos: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'altas-bajas', label: 'Altas/Bajas', icon: '📊' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📁' },
      { id: 'base-datos', label: 'Base de Datos', icon: '💾' },
      { id: 'cumplimiento', label: 'Cumplimiento', icon: '✅' }
    ],
    facturas: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📁' },
      { id: 'administracion', label: 'Administración', icon: '⚙️' },
      { id: 'pendientes', label: 'Pendientes', icon: '⏳' },
      { id: 'discrepancias', label: 'Discrepancias', icon: '⚠️' }
    ],
    expedientes: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'acta-constitutiva', label: 'Acta Constitutiva', icon: '📄' },
      { id: 'constancia-fiscal', label: 'Constancia de Situación Fiscal', icon: '📋' },
      { id: 'servicios', label: 'Servicios', icon: '🔧' }
    ],
    contabilidad: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'balances', label: 'Balances', icon: '⚖️' },
      { id: 'pagos', label: 'Pagos', icon: '💳' },
      { id: 'pendientes', label: 'Pendientes', icon: '⏳' },
      { id: 'impuestos', label: 'Impuestos', icon: '🏛️' }
    ]
  },
  
  proveedor: {
    contratos: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'altas-bajas', label: 'Altas/Bajas', icon: '📊' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📁' },
      { id: 'base-datos', label: 'Base de Datos', icon: '💾' },
      { id: 'cumplimiento', label: 'Cumplimiento', icon: '✅' }
    ],
    facturas: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'carga-descarga', label: 'Carga/Descarga', icon: '📁' },
      { id: 'administracion', label: 'Administración', icon: '⚙️' },
      { id: 'pendientes', label: 'Pendientes', icon: '⏳' },
      { id: 'discrepancias', label: 'Discrepancias', icon: '⚠️' }
    ],
    expedientes: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'acta-constitutiva', label: 'Acta Constitutiva', icon: '📄' },
      { id: 'constancia-fiscal', label: 'Constancia de Situación Fiscal', icon: '📋' },
      { id: 'servicios', label: 'Servicios', icon: '🔧' }
    ],
    contabilidad: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'balances', label: 'Balances', icon: '⚖️' },
      { id: 'pagos', label: 'Pagos', icon: '💳' },
      { id: 'pendientes', label: 'Pendientes', icon: '⏳' },
      { id: 'impuestos', label: 'Impuestos', icon: '🏛️' }
    ]
  },
  
  // Para el rol admin, incluye acceso a todo
  admin: {
    empresa: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'finanzas', label: 'Finanzas', icon: '💰' },
      { id: 'legal', label: 'Legal', icon: '⚖️' },
      { id: 'infraestructura', label: 'Infraestructura', icon: '🏢' },
      { id: 'facturacion', label: 'Facturación', icon: '📋' }
    ],
    auditoria: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'monitoreo', label: 'Monitoreo', icon: '📊' },
      { id: 'accesos', label: 'Accesos', icon: '🔑' },
      { id: 'base-datos', label: 'Base de Datos', icon: '🗄️' },
      { id: 'discrepancias', label: 'Discrepancias', icon: '⚠️' }
    ],
    personal: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'contratos', label: 'Contratos', icon: '📋' },
      { id: 'expedientes', label: 'Expedientes', icon: '📋' },
      { id: 'nomina', label: 'Nómina', icon: '💰' },
      { id: 'equipos', label: 'Equipos', icon: '💻' }
    ],
    configuracion: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'accesos', label: 'Accesos', icon: '🔑' },
      { id: 'sistema', label: 'Sistema', icon: '⚙️' }
    ],
    clientes: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'contratos', label: 'Contratos', icon: '👥' },
      { id: 'facturas', label: 'Facturas', icon: '📋' },
      { id: 'expedientes', label: 'Expedientes', icon: '💼' },
      { id: 'contabilidad', label: 'Contabilidad', icon: '💰' }
    ],
    proveedores: [
      { id: 'todos', label: 'Todos los documentos', icon: '📋' },
      { id: 'contratos', label: 'Contratos', icon: '👥' },
      { id: 'facturas', label: 'Facturas', icon: '📋' },
      { id: 'expedientes', label: 'Expedientes', icon: '💼' },
      { id: 'contabilidad', label: 'Contabilidad', icon: '💰' }
    ]
  }
};

const DocumentControlSystem: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Obtener el rol del usuario desde localStorage
  const [userRole, setUserRole] = useState<UserRole>('empresa');
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { rol } = JSON.parse(userData);
      if (rol) {
        setUserRole(rol);
      }
    }
  }, []);
  
  // Estado para la sección y tipo actual
  const [seccion, setSeccion] = useState(state?.seccion || 'finanzas');
  const [tipoActivo, setTipoActivo] = useState(state?.tipo || 'todos');
  const [menuActual, setMenuActual] = useState<Array<{ id: string; label: string; icon: string }>>([]);

  // Actualiza el menú cuando cambia la sección o el rol
  useEffect(() => {
    if (state?.seccion) {
      setSeccion(state.seccion);
      setTipoActivo(state.tipo || 'todos');
    }
    
    // Obtener el menú correcto según el rol y la sección
    const menu = menusPorRol[userRole]?.[seccion] || [];
    setMenuActual(menu);
  }, [state, seccion, userRole]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Manual de Procedimientos 2024",
      type: "pdf",
      category: "procedimientos",
      status: "activo",
      date: "2024-01-15",
      author: "Juan Pérez",
      size: "2.5 MB"
    },
    {
      id: 2,
      title: "Contrato de Servicios - Cliente ABC",
      type: "word",
      category: "contratos",
      status: "revision",
      date: "2024-01-14",
      author: "María García",
      size: "1.2 MB"
    },
    {
      id: 3,
      title: "Informe Financiero Q1",
      type: "excel",
      category: "informes",
      status: "activo",
      date: "2024-01-13",
      author: "Carlos López",
      size: "850 KB"
    },
    {
      id: 4,
      title: "Política de Seguridad",
      type: "pdf",
      category: "politicas",
      status: "activo",
      date: "2024-01-12",
      author: "Ana Martínez",
      size: "1.8 MB"
    },
    {
      id: 5,
      title: "Formulario de Registro",
      type: "word",
      category: "formularios",
      status: "archivado",
      date: "2024-01-11",
      author: "Pedro Sánchez",
      size: "650 KB"
    },
    {
      id: 6,
      title: "Presentación Ejecutiva",
      type: "imagen",
      category: "informes",
      status: "activo",
      date: "2024-01-10",
      author: "Lucía Fernández",
      size: "3.2 MB"
    }
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documents);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    docTitle: '',
    docType: '',
    docCategory: '',
    docDescription: ''
  });

  // Filter documents based on search and filters
  useEffect(() => {
    const filtered = documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || doc.type === typeFilter;
      const matchesStatus = !statusFilter || doc.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    setFilteredDocuments(filtered);
  }, [documents, searchTerm, typeFilter, statusFilter]);

  // Helper functions
  const getDocumentIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      pdf: '📄',
      word: '📝',
      excel: '📊',
      imagen: '🖼️'
    };
    return icons[type] || '📄';
  };

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      activo: '#DC143C',
      revision: '#FFA500',
      archivado: '#6c757d'
    };
    return colors[status] || '#6c757d';
  };

  // Formatea el nombre de la sección
  const formatearNombreSeccion = (nombre: string): string => {
    return nombre
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleCategoriaClick = (tipo: string) => {
    setTipoActivo(tipo);
    console.log(`Mostrando documentos de ${userRole} - ${seccion} - ${tipo}`);
  };

  const cambiarSeccion = (nuevaSeccion: string) => {
    setSeccion(nuevaSeccion);
    const menu = menusPorRol[userRole]?.[nuevaSeccion] || [];
    setMenuActual(menu);
    setTipoActivo('todos');
  };

  // Obtener todas las secciones disponibles para el rol actual
  const seccionesDisponibles = Object.keys(menusPorRol[userRole] || {}).filter(s => s !== seccion);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      docTitle: '',
      docType: '',
      docCategory: '',
      docDescription: ''
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newDoc: Document = {
      id: documents.length + 1,
      title: formData.docTitle,
      type: formData.docType as 'pdf' | 'word' | 'excel' | 'imagen',
      category: formData.docCategory,
      status: 'activo',
      date: new Date().toISOString().split('T')[0],
      author: 'Usuario Actual',
      size: '1.0 MB'
    };

    setDocuments(prev => [newDoc, ...prev]);
    closeModal();
    alert('Documento agregado correctamente');
  };

  const viewDocument = (id: number) => {
    alert(`Ver documento ID: ${id}`);
  };

  const editDocument = (id: number) => {
    alert(`Editar documento ID: ${id}`);
  };

  const downloadDocument = (id: number) => {
    alert(`Descargar documento ID: ${id}`);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <style>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid rgba(200, 200, 200, 0.3);
        }

        .header {
            background: linear-gradient(135deg, #DC143C, #B22222);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }

        .toolbar {
            background: #f8f9fa;
            padding: 25px 30px;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
        }

        .search-box {
            flex: 1;
            min-width: 300px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            border: 2px solid #dee2e6;
            border-radius: 50px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: white;
            color: #333;
        }

        .search-box input:focus {
            outline: none;
            border-color: #DC143C;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.2);
            transform: translateY(-2px);
        }

        .search-icon {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #DC143C;
            font-size: 18px;
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #DC143C, #B22222);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(220, 20, 60, 0.3);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #6c757d, #495057);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(108, 117, 125, 0.3);
        }

        .filters {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }

        .filter-select {
            padding: 10px 15px;
            border: 2px solid #dee2e6;
            border-radius: 20px;
            background: white;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-select:focus {
            outline: none;
            border-color: #DC143C;
        }

        .main-content {
            display: flex;
            min-height: 600px;
        }

        .sidebar {
            width: 280px;
            background: #f8f9fa;
            border-right: 1px solid #dee2e6;
            padding: 30px;
        }

        .sidebar h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.2rem;
            padding-bottom: 15px;
            border-bottom: 2px solid #DC143C;
        }

        .sidebar ul {
            list-style: none;
        }

        .sidebar li {
            margin-bottom: 15px;
        }

        .sidebar button,
        .sidebar a {
            width: 100%;
            color: #6c757d;
            text-decoration: none;
            display: flex;
            align-items: center;
            padding: 12px 15px;
            border-radius: 15px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            background: transparent;
            text-align: left;
            font-size: 14px;
            gap: 10px;
        }

        .sidebar button:hover,
        .sidebar a:hover {
            background: rgba(220, 20, 60, 0.1);
            color: #DC143C;
            transform: translateX(5px);
        }

        .sidebar button.active,
        .sidebar a.active {
            background: linear-gradient(135deg, #DC143C, #B22222);
            color: white;
            font-weight: 600;
        }

        .otras-secciones {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }

        .otras-secciones h4 {
            font-size: 0.85rem;
            color: #999;
            text-transform: uppercase;
            margin-bottom: 15px;
            padding: 0 15px;
            letter-spacing: 1px;
        }

        .content-area {
            flex: 1;
            padding: 30px;
            background: white;
        }

        .document-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 25px;
        }

        .document-card {
            background: white;
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid #dee2e6;
            position: relative;
            overflow: hidden;
        }

        .document-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #DC143C, #B22222);
        }

        .document-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-color: #DC143C;
        }

        .document-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #DC143C, #B22222);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            margin-bottom: 15px;
        }

        .document-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }

        .document-meta {
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .document-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .btn-small {
            padding: 8px 15px;
            font-size: 12px;
            border-radius: 15px;
        }

        .stats-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 1px solid #dee2e6;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(178, 34, 34, 0.05));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
            opacity: 1;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #DC143C;
            margin-bottom: 5px;
        }

        .stat-label {
            color: #6c757d;
            font-size: 0.9rem;
        }

        .modal {
            display: ${isModalOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1000;
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            border: 1px solid #dee2e6;
        }

        .modal h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 600;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            font-size: 14px;
            transition: border-color 0.3s ease;
            background: white;
            color: #333;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #DC143C;
        }

        .close {
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #6c757d;
        }

        .close:hover {
            color: #DC143C;
        }

        .breadcrumb {
            margin-bottom: 20px;
            padding: 15px 20px;
            background: #f8f9fa;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: #6c757d;
        }

        .breadcrumb span {
            color: #DC143C;
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .main-content {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
            }
            
            .toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-box {
                min-width: auto;
            }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <h1>📄 Sistema de Control Documental</h1>
          <p>Gestión inteligente de documentos empresariales</p>
        </header>

        <div className="toolbar">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar documentos..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="filters">
            <select 
              className="filter-select" 
              value={typeFilter}
              onChange={handleTypeFilterChange}
            >
              <option value="">Todos los tipos</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
              <option value="excel">Excel</option>
              <option value="imagen">Imagen</option>
            </select>
            <select 
              className="filter-select" 
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="revision">En revisión</option>
              <option value="archivado">Archivado</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={openModal}>
            ➕ Nuevo Documento
          </button>
        </div>

        <div className="main-content">
          <aside className="sidebar">
            {/* Título dinámico según la sección */}
            <h3>📂 {formatearNombreSeccion(seccion)}</h3>
            
            {/* Menú dinámico según el rol y la sección */}
            <ul>
              {menuActual.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleCategoriaClick(item.id)}
                    className={tipoActivo === item.id ? 'active' : ''}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Otras secciones disponibles para el rol actual */}
            {seccionesDisponibles.length > 0 && (
              <div className="otras-secciones">
                <h4>Otras Secciones</h4>
                <ul>
                  {seccionesDisponibles.map((s) => (
                    <li key={s}>
                      <button onClick={() => cambiarSeccion(s)}>
                        {formatearNombreSeccion(s)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <main className="content-area">
            {/* Breadcrumb para mostrar la ruta actual */}
            <div className="breadcrumb">
              <span>{formatearNombreSeccion(userRole)}</span>
              <span>›</span>
              <span>{formatearNombreSeccion(seccion)}</span>
              <span>›</span>
              <span>{formatearNombreSeccion(tipoActivo)}</span>
            </div>

            <div className="stats-bar">
              <div className="stat-card">
                <div className="stat-number">1,247</div>
                <div className="stat-label">Total Documentos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">23</div>
                <div className="stat-label">En Revisión</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">156</div>
                <div className="stat-label">Nuevos este mes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Cumplimiento</div>
              </div>
            </div>

            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              Documentos de {formatearNombreSeccion(tipoActivo)}
            </h2>

            <div className="document-grid">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="document-card">
                  <div className="document-icon">{getDocumentIcon(doc.type)}</div>
                  <div className="document-title">{doc.title}</div>
                  <div className="document-meta">
                    <div><strong>Autor:</strong> {doc.author}</div>
                    <div><strong>Fecha:</strong> {doc.date}</div>
                    <div><strong>Tamaño:</strong> {doc.size}</div>
                    <div>
                      <strong>Estado:</strong>{' '}
                      <span style={{ color: getStatusColor(doc.status) }}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  <div className="document-actions">
                    <button 
                      className="btn btn-primary btn-small" 
                      onClick={() => viewDocument(doc.id)}
                    >
                      👁️ Ver
                    </button>
                    <button 
                      className="btn btn-secondary btn-small" 
                      onClick={() => editDocument(doc.id)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn btn-secondary btn-small" 
                      onClick={() => downloadDocument(doc.id)}
                    >
                      ⬇️ Descargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Modal para nuevo documento */}
      <div className="modal" onClick={handleModalClick}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Nuevo Documento</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="docTitle">Título del documento:</label>
              <input 
                type="text" 
                id="docTitle" 
                name="docTitle" 
                value={formData.docTitle}
                onChange={handleFormChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="docType">Tipo:</label>
              <select 
                id="docType" 
                name="docType" 
                value={formData.docType}
                onChange={handleFormChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
                <option value="excel">Excel</option>
                <option value="imagen">Imagen</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="docCategory">Categoría:</label>
              <select 
                id="docCategory" 
                name="docCategory" 
                value={formData.docCategory}
                onChange={handleFormChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="informes">Informes</option>
                <option value="contratos">Contratos</option>
                <option value="politicas">Políticas</option>
                <option value="procedimientos">Procedimientos</option>
                <option value="formularios">Formularios</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="docDescription">Descripción:</label>
              <textarea 
                id="docDescription" 
                name="docDescription" 
                value={formData.docDescription}
                onChange={handleFormChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="docFile">Archivo:</label>
              <input 
                type="file" 
                id="docFile" 
                name="docFile" 
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif" 
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '30px' }}>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DocumentControlSystem;