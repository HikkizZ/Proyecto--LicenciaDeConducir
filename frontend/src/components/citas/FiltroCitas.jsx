import React, { useState } from 'react';

function FiltroCitas({ onFiltrarUsuario, onFiltrarEspecialista }) {
  const [tipoFiltro, setTipoFiltro] = useState('usuario');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoFiltro === 'usuario') {
      onFiltrarUsuario(id);
    } else {
      onFiltrarEspecialista(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <select className="form-select" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
            <option value="usuario">Usuario</option>
            <option value="especialista">Especialista</option>
          </select>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Ingrese ID"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Filtrar</button>
        </div>
      </div>
    </form>
  );
}

export default FiltroCitas;
