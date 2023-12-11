import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';

function DetalleCita() {
  const [cita, setCita] = useState(null);
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await axios.get(`/citas/${id}`);
        setCita(response.data);
      } catch (error) {
        handleErrorResponse(error);
      }
    };

    fetchCita();
  }, [id]);

  const handleErrorResponse = (error) => {
    if (error.response && error.response.status === 403) {
      setError('No tienes permiso de eliminar esta cita.');
    } else {
      console.error('Error al obtener detalles de la cita:', error);
      setError('Error al obtener detalles de la cita.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      try {
        await axios.delete(`/citas/${id}`);
        navigate('/citas'); // Redirige a la lista de citas después de eliminar
      } catch (error) {
        handleErrorResponse(error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/actualizar-cita/${id}`); // Redirige a la página de actualización de cita
  };

  if (!cita) {
    return <div className="text-center">Cargando detalles de la cita...</div>;
  }

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="mb-4">Detalle de Cita</h2>
      <div className="card">
        <div className="card-body">
          <p>Fecha: {cita.fecha}</p>
          <p>Hora: {cita.hora}</p>
          <p>Especialista ID: {cita.especialistaId}</p>
          <p>Usuario ID: {cita.usuarioId}</p>
          <p>Estado: {cita.estado}</p>
          <p>Tipo de Examen: {cita.tipoExamen}</p>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleUpdate}>Actualizar Cita</button>
        <button className="btn btn-danger" onClick={handleDelete}>Eliminar Cita</button>
      </div>
    </div>
  );
}

export default DetalleCita;
