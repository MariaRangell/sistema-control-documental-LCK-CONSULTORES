import React, { useState, useEffect, MouseEvent } from 'react';
<<<<<<< HEAD
import { FileText, Users, Clock, CheckCircle, Building2, UserCheck, BarChart3, Settings, Handshake, Package, DollarSign, FolderOpen, Monitor } from 'lucide-react';
=======
import { FileText, Users, Clock, CheckCircle, Building2, UserCheck, BarChart3, Settings, Handshake, Package, DollarSign, FolderOpen, Monitor, FileDigitIcon, Scale, FileClock, FolderKey, Database, ArrowLeftRight } from 'lucide-react';
>>>>>>> 0a6c85f

// Tipos para los stats y menú
interface StatItem {
  name: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  bgGradient: string;
}

type UserRole = 'admin' | 'rh' | 'cliente' | 'proveedor'| 'empresa'| 'auditoria';

const statsByRole: Record<UserRole, StatItem[]> = {
  admin: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
  rh: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
  cliente: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
  proveedor: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
  empresa: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
  auditoria: [
    { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
    { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
    { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
  ],
};

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  admin: [
    { id: 'empresa', title: 'Empresa', description: 'Gestión de información corporativa y datos de la organización', icon: Building2, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-gray-900/80' },
    { id: 'auditoria', title: 'Auditoría', description: 'Control y seguimiento de procesos de auditoría interna', icon: BarChart3, bgGradient: 'bg-gradient-to-br from-gray-700/80 to-gray-900/80' },
<<<<<<< HEAD
    { id: 'personal', title: 'Información Personal', description: 'Gestión de tu información y documentación personal', icon: UserCheck, bgGradient: 'bg-gradient-to-br from-gray-600/80 to-red-700/80' },
=======
    { id: 'personal', title: 'Recursos Humanos', description: 'Gestión de tu información y documentación personal', icon: UserCheck, bgGradient: 'bg-gradient-to-br from-gray-600/80 to-red-700/80' },
>>>>>>> 0a6c85f
    { id: 'configuracion', title: 'Configuración', description: 'Ajustes del sistema y parámetros de configuración', icon: Settings, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-800/80' },
    { id: 'clientes', title: 'Clientes', description: 'Gestión de base de datos y documentación de clientes', icon: Handshake, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'proveedores', title: 'Proveedores', description: 'Administración de proveedores y documentación comercial', icon: Package, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
  ],
  rh: [
    { id: 'contratos', title: 'Contratos', description: 'Altas/Bajas • Carga/Descarga • Pendientes • Base de Datos', icon: FileText, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'nomina', title: 'Nómina', description: 'Carga/Descarga • Administración • Recibos • Discrepancias', icon: DollarSign, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'expedientes', title: 'Expedientes', description: 'Organigrama • Instalaciones • Inventarios • Activos', icon: FolderOpen, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'equipos', title: 'Equipos', description: 'Altas/Bajas • Inventario • Asignación • Status', icon: Monitor, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
  ],
<<<<<<< HEAD
  viewer: [
    { id: 'contratos', title: 'Contratos', description: 'Altas/Bajas • Carga/Descarga • Pendientes • Base de Datos', icon: FileText, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'nomina', title: 'Nómina', description: 'Carga/Descarga • Administración • Recibos • Discrepancias', icon: DollarSign, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'expedientes', title: 'Expedientes', description: 'Organigrama • Instalaciones • Inventarios • Activos', icon: FolderOpen, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'equipos', title: 'Equipos', description: 'Altas/Bajas • Inventario • Asignación • Status', icon: Monitor, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
=======
  cliente: [
    { id: 'contratos', title: 'Contratos', description: 'Altas/Bajas • Carga/Descarga • Base de Datos • Cumplimiento', icon: FileText, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'facturas', title: 'Facturas', description: 'Carga/Descarga • Administración • Pendientes • Discrepancias', icon: FileDigitIcon, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'expedientes', title: 'Expedientes', description: 'Acta constitutiva • Constancia de situación fiscal • Servicios', icon: FolderOpen, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'contabilidad', title: 'Contabilidad', description: 'Balances • Pagos • Pendientes • Impuestos', icon: DollarSign, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
>>>>>>> 0a6c85f
  ],
  proveedor: [
    { id: 'contratos', title: 'Contratos', description: 'Altas/Bajas • Carga/Descarga • Base de Datos • Cumplimiento', icon: FileText, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'facturas', title: 'Facturas', description: 'Carga/Descarga • Administración • Pendientes • Discrepancias', icon: FileDigitIcon, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'expedientes', title: 'Expedientes', description: 'Acta constitutiva • Constancia de situación fiscal • Servicios', icon: FolderOpen, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'contabilidad', title: 'Contabilidad', description: 'Balances • Pagos • Pendientes • Impuestos', icon: DollarSign, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
  ],
  empresa: [
    { id: 'finanzas', title: 'Finanzas', description: 'Tesorería • SAT • Secretaría de Finanzas • Balances', icon: DollarSign, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'legal', title: 'Legal', description: ' • Permisos • Lineamientos• SAT• Aviso de Registro REPSE', icon: Scale, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'infraestructura', title: 'Infraestructura', description: 'Organigrama • Instalaciones • Inventarios • Activos', icon: Building2, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'facturación', title: 'Facturación', description: 'Altas/Bajas • Carga/Descarga • Base de Datos • Refacturación', icon: FileDigitIcon, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
  ],
  auditoria: [
    { id: 'monitoreo', title: 'Monitoreo', description: 'Rendimiento • Alertas • Reportes', icon: FileClock, bgGradient: 'bg-gradient-to-br from-red-600/80 to-red-800/80' },
    { id: 'accesos', title: 'Accesos', description: 'Conexiones • Consultas • Bajas • Restricciones', icon: FolderKey, bgGradient: 'bg-gradient-to-br from-red-700/80 to-gray-900/80' },
    { id: 'base de datos', title: 'Base de Datos', description: 'Base de Datos • Administración • Reportar • Capacidad', icon: Database, bgGradient: 'bg-gradient-to-br from-gray-800/80 to-red-700/80' },
    { id: 'discrepancias', title: 'Discrepancias', description: 'Cargas • Estatus de Archivos • Modificaciones • Avisos', icon: ArrowLeftRight, bgGradient: 'bg-gradient-to-br from-red-800/80 to-gray-900/80' },
  ]
};

const FloatingCircles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute w-20 h-20 bg-gray/5 rounded-full top-1/4 left-1/12 animate-pulse"></div>
    <div className="absolute w-32 h-32 bg-red-500/10 rounded-full top-3/5 right-1/6 animate-bounce"></div>
    <div className="absolute w-16 h-16 bg-gray-300/10 rounded-full bottom-1/4 left-1/5 animate-pulse"></div>
    <div className="absolute w-24 h-24 bg-red/3 rounded-full top-1/6 right-1/4 animate-pulse"></div>
  </div>
);

export default function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedItems, setAnimatedItems] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [actualRole, setActualRole] = useState<UserRole>('admin');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedItems(true), 100);
    const userData = localStorage.getItem('user');
    if (userData) {
      const { rol, nombre } = JSON.parse(userData);
      if (rol === 'admin' || rol === 'empresa' || rol === 'rh' || rol === 'proveedor' || rol === 'cliente'|| rol === 'auditoria') {
        setUserRole(rol);
        setActualRole(rol);
      }
      if (nombre) {
        setUserName(nombre);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setActualRole(newRole);
  };

  const navigateTo = (section: string, event: MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = '';
      console.log('Navegando a:', section);
    }, 150);
  };

  return (
    <div 
      className="min-h-screen bg-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <FloatingCircles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-5 w-20 h-1 bg-gradient-to-r from-red-600 to-white rounded-full"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
            <div className="bg-white/95 backdrop-blur-lg px-8 py-4 rounded-2xl border-none shadow-none">
              <img
                src="/logo1.png"
                alt="Logo LCK Consultores"
                className="mx-auto max-w-full h-24 object-contain"
              />
              {userName && (
                <div className="mt-2 text-center text-lg text-gray-700 font-semibold">
                  Bienvenido, {userName}
                </div>
              )}
            </div>
            
            <div className="bg-white border-none shadow-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 px-8 py-6 rounded-2xl">
              <h2 className="text-red text-3xl font-light tracking-widest uppercase text-shadow-md text-shadow-black/50">
                Sistema de Control Documental
              </h2>
            </div>
          </div>
        </header>

        {/* Selector de Rol visible solo para admin - PERSISTENTE */}
        {userRole === 'admin' && (
          <div className="flex justify-center mb-8">
            <select
              value={actualRole}
              onChange={handleRoleChange}
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-red-400 bg-white text-gray-700"
            >
              <option value="admin">Administrador</option>
              <option value="rh">Recursos Humanos</option>
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
              <option value="auditoria">Auditoria</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(statsByRole[actualRole] || []).map((item: StatItem, index: number) => (
            <div
              key={item.name}
              className={`relative overflow-hidden rounded-2xl bg-gray-700/10 backdrop-blur-xl border border-gray-300/50 p-6 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gold/95 hover:border-red-400/50 ${
                animatedItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`${item.color} p-3 rounded-xl shadow-lg`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">{item.name}</p>
                  <p className="text-gray-900 text-2xl font-bold">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Grid */} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(menuItemsByRole[actualRole] || []).map((item: MenuItem, index: number) => {
            const IconComponent = item.icon;
            
<<<<<<< HEAD
            // Definir subapartados para RH
            const getSubItems = (itemId: string) => {
              switch(itemId) {
                case 'contratos':
                  return [
                    { name: 'Altas/Bajas', icon: '👥' },
                    { name: 'Carga/Descarga', icon: '📤' },
                    { name: 'Pendientes', icon: '⏳' },
                    { name: 'Base de Datos', icon: '🗄️' }
                  ];
                case 'nomina':
                  return [
                    { name: 'Carga/Descarga', icon: '📤' },
                    { name: 'Administración', icon: '⚙️' },
                    { name: 'Recibos', icon: '🧾' },
                    { name: 'Discrepancias', icon: '⚠️' }
                  ];
                case 'expedientes':
                  return [
                    { name: 'Organigrama', icon: '🏢' },
                    { name: 'Instalaciones', icon: '🏭' },
                    { name: 'Inventarios', icon: '📋' },
                    { name: 'Activos', icon: '💼' }
                  ];
                case 'equipos':
                  return [
                    { name: 'Altas/Bajas', icon: '👥' },
                    { name: 'Inventario', icon: '📋' },
                    { name: 'Asignación', icon: '🎯' },
                    { name: 'Status', icon: '📊' }
                  ];
                default:
                  return [];
=======
            const getSubItems = (itemId: string) => {
              switch(itemId) { 
                //SUB-MENU RH
                case 'contratos':
                  return [
                    { name: 'Altas/Bajas', icon: '👥', href: '/rh/contratos/altas-bajas' },
                    { name: 'Carga/Descarga', icon: '📤', href: '/rh/contratos/carga' },
                    { name: 'Pendientes', icon: '⏳', href: '/rh/contratos/pendientes' },
                    { name: 'Base de Datos', icon: '🗄️', href: '/rh/contratos/base-datos' },
                  ];
                case 'nomina':
                  return [
                    { name: 'Carga/Descarga', icon: '📤', href: '/rh/nomina/carga' },
                    { name: 'Administración', icon: '⚙️', href: '/rh/nomina/admin' },
                    { name: 'Recibos', icon: '🧾', href: '/rh/nomina/recibos' },
                    { name: 'Discrepancias', icon: '⚠️', href: '/rh/nomina/discrepancias' },
                  ];
                case 'expedientes':
                  return [
                    { name: 'Organigrama', icon: '🏢', href: '/rh/expedientes/organigrama' },
                    { name: 'Instalaciones', icon: '🏭', href: '/rh/expedientes/instalaciones' },
                    { name: 'Inventarios', icon: '📋', href: '/rh/expedientes/inventarios' },
                    { name: 'Activos', icon: '💼', href: '/rh/expedientes/activos' },
                  ];
                case 'equipos':
                  return [
                    { name: 'Altas/Bajas', icon: '👥', href: '/rh/equipos/altas-bajas' },
                    { name: 'Inventario', icon: '📋', href: '/rh/equipos/inventario' },
                    { name: 'Asignación', icon: '🎯', href: '/rh/equipos/asignacion' },
                    { name: 'Status', icon: '📊', href: '/rh/equipos/status' },
                  ]; 

                //SUB-MENU CLIENTES
                case 'contratos':    
                  return [
                    { name: 'Altas/Bajas', icon: '👥', href: '/cliente/contratos/altas-bajas' },
                    { name: 'Carga/Descarga', icon: '📤', href: '/cliente/contratos/carga' },
                    { name: 'Base de Datos', icon: '🗄️', href: '/cliente/contratos/base-datos' },
                    { name: 'Cumplimiento', icon: '✅', href: '/cliente/contratos/cumplimiento' }
                  ];
                case 'facturas':
                  return [
                    { name: 'Carga/Descarga', icon: '📤', href: '/cliente/facturas/carga' },
                    { name: 'Administración', icon: '⚙️', href: '/cliente/facturas/admin' },
                    { name: 'Pendientes', icon: '⏳', href: '/cliente/facturas/pendientes' },
                    { name: 'Discrepancias', icon: '⚠️', href: '/cliente/facturas/discrepancias' }
                  ];
                case 'expedientes':
                  return [
                    { name: 'Acta Constitutiva', icon: '📜', href: '/cliente/expedientes/acta' },
                    { name: 'Constancia de Situación Fiscal', icon: '🏛️', href: '/cliente/expedientes/fiscal' },
                    { name: 'Servicios', icon: '🔧', href: '/cliente/expedientes/servicios' },
                  ];
                case 'contabilidad':
                  return [
                    { name: 'Balances', icon: '⚖️', href: '/cliente/contabilidad/balances' },
                    { name: 'Pagos', icon: '💳', href: '/cliente/contabilidad/pagos' },
                    { name: 'Pendientes', icon: '⏳', href: '/cliente/contabilidad/pendientes' },
                    { name: 'Impuestos', icon: '🏛️', href: '/cliente/contabilidad/impuestos' }
                  ];

                //SUB-MENU PROVEEDORES
                case 'contratos':
                  return [
                    { name: 'Altas/Bajas', icon: '👥', href: '/proveedor/contratos/altas-bajas' },
                    { name: 'Carga/Descarga', icon: '📤', href: '/proveedor/contratos/carga' },
                    { name: 'Base de Datos', icon: '🗄️', href: '/proveedor/contratos/base-datos' },
                    { name: 'Cumplimiento', icon: '✅', href: '/proveedor/contratos/cumplimiento' }
                  ]; 
                case 'facturas':
                  return [
                    { name: 'Carga/Descarga', icon: '📤', href: '/proveedor/facturas/carga' },
                    { name: 'Administración', icon: '⚙️', href: '/proveedor/facturas/admin' },
                    { name: 'Pendientes', icon: '⏳', href: '/proveedor/facturas/pendientes' },
                    { name: 'Discrepancias', icon: '⚠️', href: '/proveedor/facturas/discrepancias' }
                  ];
                case 'expedientes':
                  return [
                    { name: 'Acta Constitutiva', icon: '📜', href: '/proveedor/expedientes/acta' },
                    { name: 'Constancia de Situación Fiscal', icon: '🏛️', href: '/proveedor/expedientes/fiscal' },
                    { name: 'Servicios', icon: '🔧', href: '/proveedor/expedientes/servicios' },
                  ];
                case 'contabilidad':
                  return [
                    { name: 'Balances', icon: '⚖️', href: '/proveedor/contabilidad/balances' },
                    { name: 'Pagos', icon: '💳', href: '/proveedor/contabilidad/pagos' },
                    { name: 'Pendientes', icon: '⏳', href: '/proveedor/contabilidad/pendientes' },
                    { name: 'Impuestos', icon: '🏛️', href: '/proveedor/contabilidad/impuestos' }
                  ];        

                //SUB-MENU EMPRESA    
                  case 'finanzas':
                  return [
                    { name: 'Tesorería', icon: '💰', href: '/empresa/finanzas/tesoreria' },
                    { name: 'SAT', icon: '🏛️', href: '/empresa/finanzas/sat' },
                    { name: 'Secretaria de Finanzas', icon: '🧾', href: '/empresa/finanzas/secretaria' },
                    { name: 'Balances', icon: '⚖️', href: '/empresa/finanzas/balances' },
                  ];
                case 'infraestructura':
                  return [
                    { name: 'Organigrama', icon: '🏢', href: '/empresa/infraestructura/organigrama' },
                    { name: 'Instalaciones', icon: '🏭', href: '/empresa/infraestructura/instalaciones' },
                    { name: 'Inventarios', icon: '📋', href: '/empresa/infraestructura/inventarios' },
                    { name: 'Activos', icon: '💼', href: '/empresa/infraestructura/activos' },
                  ];
                case 'legal':
                  return [
                    { name: 'Permisos', icon: '🧾', href: '/empresa/legal/permisos' },
                    { name: 'Lineamientos', icon: '📋', href: '/empresa/legal/lineamientos' },
                    { name: 'SAT', icon: '🏛️', href: '/empresa/legal/sat' },
                    { name: 'Aviso de registro REPSE', icon: '📤', href: '/empresa/legal/repse' },
                  ];   
                  case 'facturación':
                  return [
                    { name: 'Altas/Bajas', icon: '👥', href: '/empresa/facturacion/altas-bajas' },
                    { name: 'Carga/Descarga', icon: '📤', href: '/empresa/facturacion/carga' },
                    { name: 'Base de Datos', icon: '🗄️', href: '/empresa/facturacion/base-datos' },
                    { name: 'Refacturación', icon: '📋', href: '/empresa/facturacion/refacturacion' },
                  ];

                  //SUB-MENU AUDITORIA
                case 'monitoreo':
                  return [
                    { name: 'Rendimiento', icon: '📊', href: '/auditoria/monitoreo/rendimiento' },
                    { name: 'Procesos', icon: '📤', href: '/auditoria/monitoreo/procesos' },
                    { name: 'Alertas', icon: '⚠️', href: '/auditoria/monitoreo/alertas' },
                    { name: 'Reportes', icon: '🎯', href: '/auditoria/monitoreo/reportes' },
                  ];
                case 'accesos':
                  return [
                    { name: 'Conexiones', icon: '⚙️', href: '/auditoria/accesos/conexiones' },
                    { name: 'Consultas', icon: '📋', href: '/auditoria/accesos/consultas' },
                    { name: 'Bajas', icon: '👥', href: '/auditoria/accesos/bajas' },
                    { name: 'Restricciones', icon: '⚠️', href: '/auditoria/accesos/restricciones' },
                  ];           
                case 'base de datos':
                  return [
                    { name: 'Base de Datos', icon: '🗄️', href: '/auditoria/base-datos/database' },
                    { name: 'Administración', icon: '💼', href: '/auditoria/base-datos/admin' },
                    { name: 'Reportar', icon: '⚠️', href: '/auditoria/base-datos/reportar' },
                    { name: 'Capacidad', icon: '✅', href: '/auditoria/base-datos/capacidad' },
                  ];  
                case 'discrepancias':
                  return [
                    { name: 'Cargas', icon: '📤', href: '/auditoria/discrepancias/cargas' },
                    { name: 'Estatus de los archivos', icon: '✅', href: '/auditoria/discrepancias/estatus' },
                    { name: 'Modificaciones', icon: '📋', href: '/auditoria/discrepancias/modificaciones' },
                    { name: 'Avisos', icon: '⚠️', href: '/auditoria/discrepancias/avisos' },
                  ];  
                  //SUB-MENU ADMINISTRADOR
                case 'empresa':
                  return [
                    { name: 'Finanzas', icon: '💰', href: '/empresa/finanzas' }, 
                    { name: 'Infraestructura', icon: '🏭', href: '/empresa/infraestructura' },
                    { name: 'Legal', icon: '🧾', href: '/empresa/legal' },
                    { name: 'Facturación', icon: '📋', href: '/empresa/facturacion' },
                  ];
                case 'auditoria':
                  return [
                    { name: 'Monitoreo', icon: '📊', href: '/auditoria/monitoreo' },
                    { name: 'Accesos', icon: '🔑', href: '/auditoria/accesos' },
                    { name: 'Base de Datos', icon: '🗄️', href: '/auditoria/base-datos' },
                    { name: 'Discrepancias', icon: '⚠️', href: '/auditoria/discrepancias' },
                  ];           
                case 'personal':
                  return [
                    { name: 'Contratos', icon: '📋', href: '/rh/contratos' },
                    { name: 'Expedientes', icon: '📋', href: '/rh/expedientes' },
                    { name: 'Nómina', icon: '💰', href: '/rh/nomina' },
                    { name: 'Equipos', icon: '💻', href: '/rh/equipos' },
                  ];  
                case 'configuracion':
                  return [
                    { name: 'Accesos', icon: '🔑', href: '/configuracion/accesos' },
                    { name: 'Sistema', icon: '⚙️', href: '/configuracion/sistema' },
                  ]; 
                  case 'clientes':
                  return [
                    { name: 'Contratos', icon: '👥', href: '/clientes/contratos' },
                    { name: 'Facturas', icon: '📋', href: '/clientes/facturas' },
                    { name: 'Expedientes', icon: '💼', href: '/clientes/expedientes' },
                    { name: 'Contabilidad', icon: '💰', href: '/clientes/contabilidad' },
                  ];
                  case 'proveedores':
                  return [
                    { name: 'Contratos', icon: '👥', href: '/proveedores/contratos' },
                    { name: 'Facturas', icon: '📋', href: '/proveedores/facturas' },
                    { name: 'Expedientes', icon: '💼', href: '/proveedores/expedientes' },
                    { name: 'Contabilidad', icon: '💰', href: '/proveedores/contabilidad' },
                  ]
                default:
                  return [];  
>>>>>>> 0a6c85f
              }
            };

            const subItems = getSubItems(item.id);
            
            return (
              <div
                key={item.id}
                className={`group relative min-h-48 ${item.bgGradient} backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-800/40 hover:border-red-500/30 overflow-hidden ${
                  animatedItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                onClick={(e) => navigateTo(item.id, e)}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
                
                {/* Subapartados overlay - aparece en hover */}
                {subItems.length > 0 && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex flex-col justify-center items-center p-6 z-20">
                    <h4 className="text-white text-lg font-semibold mb-4 text-center">
                      {item.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {subItems.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all duration-200"
                          style={{ animationDelay: `${subIndex * 100}ms` }}
                        >
                          <span className="text-lg">{subItem.icon}</span>
                          <span className="text-white text-xs font-medium truncate">
                            {subItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <IconComponent className="h-12 w-12 text-white group-hover:text-red-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold uppercase tracking-wide mb-2 group-hover:text-red-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
            <h2 className="text-white text-xl font-semibold flex items-center">
              <div className="w-1 h-6 bg-amber-600 rounded-full mr-3"></div>
              Actividad Reciente
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/40 hover:border hover:border-gray-600/30 transition-all duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600/30">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Documento #{item} actualizado
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      Actualizado por Usuario {item} • Hace {item} hora{item > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                      Completado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}