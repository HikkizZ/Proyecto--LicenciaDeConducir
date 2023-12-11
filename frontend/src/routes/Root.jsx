import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Header from '../components/Header'; // Importa el componente Header

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} /> {/* Usa el componente Header */}
      <div className="container mt-4"> {/* Contenedor para el contenido principal */}
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </div>
    </div>
  );
}

export default Root;
