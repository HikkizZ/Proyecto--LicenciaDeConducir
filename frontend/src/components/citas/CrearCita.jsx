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
      const response = await axios.post('citas/', citaData);
      console.log(response.data);
      // Aquí puedes agregar lógica adicional después de crear la cita
    } catch (error) {
      console.error('Hubo un error al crear la cita:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Cita</h2>
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
          <label htmlFor="especialistaId" className="form-label">ID del Especialista:</label>
          <input type="text" className="form-control" id="especialistaId" name="especialistaId" placeholder="ID del Especialista" value={citaData.especialistaId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId" className="form-label">ID del Usuario:</label>
          <input type="text" className="form-control" id="usuarioId" name="usuarioId" placeholder="ID del Usuario" value={citaData.usuarioId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoExamen" className="form-label">Tipo de Examen:</label>
          <select className="form-select" id="tipoExamen" name="tipoExamen" value={citaData.tipoExamen} onChange={handleChange} required>
            <option value="">Selecciona el Tipo de Examen</option>
            <option value="Teorico">Teórico</option>
            <option value="Practico">Práctico</option>
            <option value="Vista">Vista</option>
            <option value="Psicotecnico">Psicotécnico</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Crear Cita</button>
      </form>
    </div>
  );
}

export default CrearCita;
