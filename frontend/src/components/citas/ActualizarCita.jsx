import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';

function ActualizarCita() {
  const [citaData, setCitaData] = useState({
    fecha: '',
    hora: '',
    estado: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await axios.get(`/citas/${id}`);
        const { fecha, hora, estado } = response.data;
        setCitaData({ fecha, hora, estado });
      } catch (error) {
        console.error('Error al obtener la cita:', error);
      }
    };

    fetchCita();
  }, [id]);

  const handleChange = (e) => {
    setCitaData({ ...citaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/citas/${id}`, citaData);
      navigate('/citas'); // Redirige a la lista de citas después de actualizar
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Cita</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input type="date" name="fecha" value={citaData.fecha} onChange={handleChange} required />
        </label>
        <label>
          Hora:
          <input type="time" name="hora" value={citaData.hora} onChange={handleChange} required />
        </label>
        <label>
          Estado:
          <select name="estado" value={citaData.estado} onChange={handleChange} required>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
            {/* Agrega más estados según sea necesario */}
          </select>
        </label>
        <button type="submit">Actualizar Cita</button>
      </form>
    </div>
  );
}

export default ActualizarCita;
