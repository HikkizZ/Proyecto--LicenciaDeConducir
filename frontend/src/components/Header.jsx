import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext'; // Importa useAuth

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Utiliza useAuth para obtener el usuario

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ height: '30px' }} />
          Licencias de conducir
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/crear-cita">Agendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/citas">Especialista</Link>
            </li>
            {/* Agrega más elementos de navegación según sea necesario */}
          </ul>
          <span className="navbar-text ml-auto">
            {user.email} {/* Muestra el correo del usuario */}
          </span>
          <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
