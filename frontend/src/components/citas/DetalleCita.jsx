import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from '../../services/root.service';

function DetalleCita() {
  const [cita, setCita] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await axios.get(`/citas/${id}`);
        setCita(response.data);
      } catch (error) {
        console.error('Error al obtener la cita:', error);
      }
    };

    fetchCita();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      try {
        await axios.delete(`/citas/${id}`);
        navigate('/citas'); // Redirige a la lista de citas después de eliminar
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/actualizar-cita/${id}`); // Redirige a la página de actualización de cita
  };

  if (!cita) {
    return <div>Cargando detalles de la cita...</div>;
  }

  return (
    <div>
      <h2>Detalle de Cita</h2>
      {/* Muestra los detalles de la cita aquí */}
      <p>Fecha: {cita.fecha}</p>
      <p>Hora: {cita.hora}</p>
      <p>Especialista ID: {cita.especialistaId}</p>
      <p>Usuario ID: {cita.usuarioId}</p>
      <p>Estado: {cita.estado}</p>
      <p>Tipo de Examen: {cita.tipoExamen}</p>
      {/* Botónes*/}
      <button onClick={handleUpdate}>Actualizar Cita</button>
      <button onClick={handleDelete}>Eliminar Cita</button>
    </div>
  );
}

export default DetalleCita;