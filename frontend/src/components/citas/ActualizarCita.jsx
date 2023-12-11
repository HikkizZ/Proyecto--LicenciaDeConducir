import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';

function ActualizarCita() {
  const [citaData, setCitaData] = useState({
    fecha: '',
    hora: '',
    estado: ''
  });
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await axios.get(`/citas/${id}`);
        const { fecha, hora, estado } = response.data;
        const fechaFormateada = fecha ? fecha.split('T')[0] : '';
        setCitaData({ fecha: fechaFormateada, hora, estado });
      } catch (error) {
        handleErrorResponse(error);
      }
    };

    fetchCita();
  }, [id]);

  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        setError('No tienes permiso de actualizar esta cita.');
      } else if (error.response.status === 400) {
        setError('Fuera de plazo para actualizar la cita.');
      } else {
        console.error('Error al actualizar la cita:', error);
        setError('Error al actualizar la cita.');
      }
    } else {
      // Manejo de errores que no son de respuesta HTTP
      console.error('Error al actualizar la cita:', error);
      setError('Error al actualizar la cita.');
    }
  };

  const handleChange = (e) => {
    setCitaData({ ...citaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/citas/${id}`, citaData);
      navigate('/citas'); // Redirige a la lista de citas después de actualizar
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="mb-4">Actualizar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha:</label>
          <input type="date" className="form-control" id="fecha" name="fecha" value={citaData.fecha} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="hora" className="form-label">Hora:</label>
          <input type="time" className="form-control" id="hora" name="hora" value={citaData.hora} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado:</label>
          <select className="form-select" id="estado" name="estado" value={citaData.estado} onChange={handleChange} required>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
            {/* Agrega más estados según sea necesario */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Cita</button>
      </form>
    </div>
  );
}

export default ActualizarCita;
