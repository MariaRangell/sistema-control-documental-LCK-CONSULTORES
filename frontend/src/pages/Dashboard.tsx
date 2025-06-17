import React, { useState, useEffect } from 'react';
import { FileText, Users, Clock, CheckCircle, Building2, UserCheck, BarChart3, Settings, Handshake, Package } from 'lucide-react';

const stats = [
  { name: 'Documentos Totales', value: '1,234', icon: FileText, color: 'bg-blue-500' },
  { name: 'Usuarios Activos', value: '45', icon: Users, color: 'bg-green-500' },
  { name: 'Documentos Pendientes', value: '23', icon: Clock, color: 'bg-yellow-500' },
  { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle, color: 'bg-emerald-500' },
];
//codigo modificado con el diseño del dashboard 
const menuItems = [
  {
    id: 'empresa',
    title: 'Empresa',
    description: 'Gestión de información corporativa y datos de la organización',
    icon: Building2,
    gradient: 'from-red-400 to-red-600',
    bgGradient: 'bg-gradient-to-br from-red-500/20 to-red-600/20'
  },
  {
    id: 'personal',
    title: 'Personal',
    description: 'Administración de recursos humanos y documentación del personal',
    icon: UserCheck,
    gradient: 'from-blue-400 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'auditoria',
    title: 'Auditoría',
    description: 'Control y seguimiento de procesos de auditoría interna',
    icon: BarChart3,
    gradient: 'from-purple-400 to-purple-600',
    bgGradient: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20'
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    description: 'Ajustes del sistema y parámetros de configuración',
    icon: Settings,
    gradient: 'from-green-400 to-green-600',
    bgGradient: 'bg-gradient-to-br from-green-500/20 to-green-600/20'
  },
  {
    id: 'clientes',
    title: 'Clientes',
    description: 'Gestión de base de datos y documentación de clientes',
    icon: Handshake,
    gradient: 'from-yellow-400 to-yellow-600',
    bgGradient: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
  },
  {
    id: 'proveedores',
    title: 'Proveedores',
    description: 'Administración de proveedores y documentación comercial',
    icon: Package,
    gradient: 'from-orange-400 to-orange-600',
    bgGradient: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
  }
];

const FloatingCircles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute w-20 h-20 bg-white/10 rounded-full top-1/4 left-1/12 animate-pulse"></div>
    <div className="absolute w-32 h-32 bg-white/5 rounded-full top-3/5 right-1/6 animate-bounce"></div>
    <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-1/4 left-1/5 animate-pulse"></div>
  </div>
);

export default function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedItems, setAnimatedItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedItems(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  const navigateTo = (section, event) => {
    const element = event.currentTarget;
    element.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      element.style.transform = '';
      console.log('Navegando a:', section);
    }, 150);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <FloatingCircles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-5 w-20 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
            <div className="bg-white/95 backdrop-blur-lg px-8 py-4 rounded-2xl shadow-2xl">
              <h1 className="text-4xl font-bold text-gray-800 tracking-widest">LCK</h1>
              <div className="text-red-600 text-sm font-medium mt-1">CONSULTORES</div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 px-8 py-6 rounded-2xl shadow-2xl">
              <h2 className="text-white text-3xl font-light tracking-widest uppercase">
                Sistema de Control Documental
              </h2>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
            <div
              key={item.name}
              className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/20 ${
                animatedItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`${item.color} p-3 rounded-xl shadow-lg`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-white/80 text-sm font-medium">{item.name}</p>
                  <p className="text-white text-2xl font-bold">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative min-h-48 ${item.bgGradient} backdrop-blur-xl border border-white/20 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20 ${
                  animatedItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                onClick={(e) => navigateTo(item.id, e)}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-white text-xl font-semibold">Actividad Reciente</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Documento #{item} actualizado
                    </p>
                    <p className="text-white/60 text-sm truncate">
                      Actualizado por Usuario {item} • Hace {item} hora{item > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
