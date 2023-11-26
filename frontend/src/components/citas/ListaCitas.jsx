import React, { useState, useEffect } from 'react';
import axios from '../../services/root.service';
import FiltroCitas from './FiltroCitas';
import { Link, useNavigate } from 'react-router-dom';

function ListaCitas() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectToLogin) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000); // Redirige después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [redirectToLogin, navigate]);

  const handleErrorResponse = (error) => {
    if (error.response && error.response.status === 401) {
      setError('Acceso denegado. Serás redirigido a la página de inicio.');
      setRedirectToLogin(true);
    } else {
      console.error('Error al obtener citas:', error);
      setError('Error al obtener citas.');
    }
  };

  const obtenerCitasPorUsuario = async (usuarioId) => {
    try {
      const response = await axios.get(`/citas/usuario/${usuarioId}`);
      setCitas(response.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const obtenerCitasPorEspecialista = async (especialistaId) => {
    try {
      const response = await axios.get(`/citas/especialista/${especialistaId}`);
      setCitas(response.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <FiltroCitas onFiltrarUsuario={obtenerCitasPorUsuario} onFiltrarEspecialista={obtenerCitasPorEspecialista} />
      <div className="row">
        {citas.map((cita) => (
          <div key={cita._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cita</h5>
                <p className="card-text">Fecha: {cita.fecha}</p>
                <p className="card-text">Hora: {cita.hora}</p>
                <Link to={`/cita/${cita._id}`} className="btn btn-primary">
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaCitas;
