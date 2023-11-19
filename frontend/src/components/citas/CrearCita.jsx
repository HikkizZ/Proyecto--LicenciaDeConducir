import React, { useState } from 'react';
import axios from '../../services/root.service';

function CrearCita() {
  const [citaData, setCitaData] = useState({
    fecha: '',
    hora: '',
    especialistaId: '',
    usuarioId: '',
    estado: 'Pendiente',
    tipoExamen: ''
  });

  const handleChange = (e) => {
    setCitaData({ ...citaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/citas/', citaData);
      console.log(response.data);
      // Aquí puedes agregar lógica adicional después de crear la cita
    } catch (error) {
      console.error('Hubo un error al crear la cita:', error);
    }
  };

  return (
    <div>
      <h2>Crear Cita</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="fecha" value={citaData.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={citaData.hora} onChange={handleChange} required />
        <input type="text" name="especialistaId" placeholder="ID del Especialista" value={citaData.especialistaId} onChange={handleChange} required />
        <input type="text" name="usuarioId" placeholder="ID del Usuario" value={citaData.usuarioId} onChange={handleChange} required />
        <select name="tipoExamen" value={citaData.tipoExamen} onChange={handleChange} required>
          <option value="">Selecciona el Tipo de Examen</option>
          <option value="Teorico">Teórico</option>
          <option value="Practico">Práctico</option>
          <option value="Vista">Vista</option>
          <option value="Psicotecnico">Psicotécnico</option>
        </select>
        <button type="submit">Crear Cita</button>
      </form>
    </div>
  );
}

export default CrearCita;
