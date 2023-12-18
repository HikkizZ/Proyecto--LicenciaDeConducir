// ListaCitas.jsx
import React, { useState } from 'react';
import axios from '../../services/root.service';
import FiltroCitas from './FiltroCitas';
import { Link } from 'react-router-dom';

function ListaCitas() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');

  const handleErrorResponse = (error) => {
    // ... Manejo de errores ...
  };

  const buscarCitas = async (tipo, id) => {
    if (!id) return;

    try {
      const endpoint = tipo === 'usuario' ? `/citas/usuario/${id}` : `/citas/especialista/${id}`;
      const response = await axios.get(endpoint);
      setCitas(response.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <FiltroCitas onBuscarCitas={buscarCitas} />
      <div className="row">
        {citas.map((cita) => (
          <div key={cita._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cita</h5>
                <p className="card-text">Fecha: {formatearFecha(cita.fecha)}</p>
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