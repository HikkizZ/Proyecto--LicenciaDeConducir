// FiltroCitas.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../services/root.service';

function FiltroCitas({ onBuscarCitas }) {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('/users');
        if (response.data && Array.isArray(response.data.data)) {
          setUsuarios(response.data.data);
        } else {
          setError('Error al cargar usuarios');
        }
      } catch (error) {
        setError('Error al cargar usuarios');
      }
    };

    obtenerUsuarios();
  }, []);

  const handleSeleccionarUsuario = (usuarioId) => {
    const usuarioSeleccionado = usuarios.find(user => user._id === usuarioId);
    if (!usuarioSeleccionado) return;

    const esEspecialista = usuarioSeleccionado.roles.some(rol => rol.name === 'especialista');
    const tipoBusqueda = esEspecialista ? 'especialista' : 'usuario';

    onBuscarCitas(tipoBusqueda, usuarioId);
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.username}</td>
              <td 
                className="text-primary" 
                style={{ cursor: 'pointer' }} 
                onClick={() => handleSeleccionarUsuario(usuario._id)}
              >
                {usuario.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltroCitas;
