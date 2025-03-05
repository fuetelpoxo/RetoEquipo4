import React, { useState, useEffect } from 'react';
import { getEquiposSelect } from '../models/JugadorModel';

const BuscadorEquipos = ({ onSelect, selectedEquipoId }) => {
  const [equipos, setEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEquipos = async () => {
      try {
        const data = await getEquiposSelect();
        setEquipos(data);
      } catch (err) {
        setError('Error al cargar equipos');
      } finally {
        setLoading(false);
      }
    };

    cargarEquipos();
  }, []);

  const equiposFiltrados = equipos.filter(equipo =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <div>Cargando equipos...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="mb-3">
      <label className="form-label">Buscar Equipo</label>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Buscar equipo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select
        className="form-select"
        value={selectedEquipoId || ''}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">Seleccione un equipo</option>
        {equiposFiltrados.map(equipo => (
          <option key={equipo.id} value={equipo.id}>
            {equipo.nombre} - Grupo {equipo.grupo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BuscadorEquipos;