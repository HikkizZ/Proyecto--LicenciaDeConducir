import React, { useState } from 'react';
import axios from '../../services/root.service';

function SubirArchivo() {
  const [archivoData, setArchivoData] = useState({
    nombre: '',
    image: null, // Cambiado a "image" para coincidir con el modelo
    usuarioId: '',
    estado: 'pendiente',
  });
  
  const handleChange = (e) => {
    setArchivoData({ ...archivoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', archivoData.nombre);
      formData.append('image', archivoData.image);
      formData.append('usuarioId', archivoData.usuarioId);
      formData.append('estado', archivoData.estado);
  
      const response = await axios.post('documents/', formData);
      console.log(response.data);
      // Aquí puedes agregar lógica adicional después de crear la cita
    } catch (error) {
      console.error('Hubo un error al crear la cita:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Subir Archivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={archivoData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Archivo:</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Subir Archivo</button>
      </form>
    </div>
  );
}

export default SubirArchivo;
