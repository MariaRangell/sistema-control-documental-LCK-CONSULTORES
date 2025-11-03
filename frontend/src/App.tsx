import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Documents from './pages/Documents';
import Users from './pages/Users';
import Settings from './pages/Settings';
import SetPassword from './pages/SetPassword';
import AdminUsers from './pages/AdminUsers';
import Menu from './pages/menu'; // 👈 Importamos la nueva página

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/establecer-contrasena" element={<SetPassword />} />

        {/* Rutas dentro del layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/users" element={<Users />} />
          <Route path="/configuracion/usuarios" element={<AdminUsers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} /> {/* 👈 Nueva ruta agregada */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Redirecciones por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
