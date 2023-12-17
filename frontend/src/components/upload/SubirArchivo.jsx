import React, { useState } from 'react';
import axios from '../../services/root.service';

function SubirArchivo() {
  const [archivo, setArchivo] = useState(null);
  const [nombre, setNombre] = useState('');

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('nombre', nombre);

      // Asegúrate de que la URL sea la correcta
      const response = await axios.post('documents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      // Aquí puedes agregar lógica adicional después de subir el archivo
    } catch (error) {
      console.error('Hubo un error al subir el archivo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Subir Archivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="archivo" className="form-label">Archivo:</label>
          <input type="file" className="form-control" id="archivo" name="archivo" onChange={handleArchivoChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Subir Archivo</button>
      </form>
    </div>
  );
}

export default SubirArchivo;
