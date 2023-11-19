import React, { useState, useEffect } from 'react';
import axios from '../../services/root.service';
import { Link } from 'react-router-dom';

function ListaCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get('/citas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    fetchCitas();
  }, []);

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita._id}>
            <Link to={`/cita/${cita._id}`}>
              <p>Fecha: {cita.fecha}</p>
              <p>Hora: {cita.hora}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCitas;