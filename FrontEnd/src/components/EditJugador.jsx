import React, { useState, useEffect } from 'react';
import BuscadorEquipos from './BuscadorEquipos';
import { getEquiposSelect } from '../models/JugadorModel'; // Importar la función para obtener equipos

const EditJugador = ({ jugador, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    nombre: jugador?.nombre || '',
    apellido1: jugador?.apellido1 || '',
    apellido2: jugador?.apellido2 || '',
    dni: jugador?.dni || '',
    tipo: jugador?.tipo || '',
    equipo_id: jugador?.equipo_id || '',
    email: jugador?.email || '',
    telefono: jugador?.telefono || ''
  });

  const [errors, setErrors] = useState({});

  // Añadir estado para los equipos
  const [equipos, setEquipos] = useState([]);
  
  // Cargar equipos al montar el componente
  useEffect(() => {
    const cargarEquipos = async () => {
      try {
        const data = await getEquiposSelect();
        setEquipos(data);
      } catch (error) {
        console.error('Error al cargar equipos:', error);
      }
    };
    cargarEquipos();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.apellido1.trim()) newErrors.apellido1 = 'El primer apellido es requerido';
    if (!form.dni.trim()) newErrors.dni = 'El DNI es requerido';
    if (!form.tipo) newErrors.tipo = 'El tipo es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Clonar el objeto form para no modificar el estado directamente
      const dataToSubmit = { ...form };
      
      await onSubmit(dataToSubmit);
      onCancel();
    } catch (error) {
      // Si el error es de email duplicado, mostramos el error específico
      if (error.message.includes('email')) {
        setErrors(prev => ({
          ...prev,
          email: 'Este email ya está en uso'
        }));
      }
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleEquipoSelect = (equipoId) => {
    setForm(prev => ({ ...prev, equipo_id: equipoId }));
  };

  return (
    <div className="container mt-3">
      <h2>{jugador ? "Editar Jugador" : "Añadir Jugador"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Primer Apellido</label>
          <input
            type="text"
            className={`form-control ${errors.apellido1 ? 'is-invalid' : ''}`}
            name="apellido1"
            value={form.apellido1}
            onChange={handleChange}
          />
          {errors.apellido1 && <div className="invalid-feedback">{errors.apellido1}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Segundo Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido2"
            value={form.apellido2}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
            name="dni"
            value={form.dni}
            onChange={handleChange}
          />
          {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccione tipo</option>
            <option value="jugador">Jugador</option>
            <option value="capitan">Capitán</option>
            <option value="entrenador">Entrenador</option>
          </select>
          {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <select
            className={`form-select ${errors.equipo_id ? 'is-invalid' : ''}`}
            name="equipo_id"
            value={form.equipo_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un equipo</option>
            {equipos.map(equipo => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>
          {errors.equipo_id && <div className="invalid-feedback">{errors.equipo_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <BuscadorEquipos
          onSelect={handleEquipoSelect}
          selectedEquipoId={form.equipo_id}
        />

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditJugador;