import React, { useState, useEffect } from 'react';
import { getEstudiosSelect } from '../models/JugadorModel';

const AddInscripcion = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    nombre_equipo: '',
    jugadores: Array(5).fill().map(() => ({
      nombre: '',
      apellido1: '',
      apellido2: '',
      dni: '',
      email: '',
      telefono: '',
      estudio_id: ''
    })),
    comentarios: ''
  });

  const [estudios, setEstudios] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarEstudios = async () => {
      try {
        const data = await getEstudiosSelect();
        setEstudios(data);
      } catch (error) {
        console.error('Error al cargar estudios:', error);
      }
    };
    cargarEstudios();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre_equipo) newErrors.nombre_equipo = 'El nombre del equipo es requerido';
    
    // Validar cada jugador
    form.jugadores.forEach((jugador, index) => {
      if (!jugador.nombre) newErrors[`jugador${index}_nombre`] = 'El nombre es requerido';
      if (!jugador.apellido1) newErrors[`jugador${index}_apellido1`] = 'El primer apellido es requerido';
      if (!jugador.dni) newErrors[`jugador${index}_dni`] = 'El DNI es requerido';
      if (!jugador.email) newErrors[`jugador${index}_email`] = 'El email es requerido';
      if (!jugador.telefono) newErrors[`jugador${index}_telefono`] = 'El teléfono es requerido';
      if (!jugador.estudio_id) newErrors[`jugador${index}_estudio_id`] = 'El estudio es requerido';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJugadorChange = (index, field, value) => {
    const newJugadores = [...form.jugadores];
    newJugadores[index] = {
      ...newJugadores[index],
      [field]: value
    };
    setForm(prev => ({
      ...prev,
      jugadores: newJugadores
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(form);
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label className="form-label">Nombre del Equipo</label>
        <input
          type="text"
          className={`form-control ${errors.nombre_equipo ? 'is-invalid' : ''}`}
          value={form.nombre_equipo}
          onChange={(e) => setForm({...form, nombre_equipo: e.target.value})}
        />
        {errors.nombre_equipo && <div className="invalid-feedback">{errors.nombre_equipo}</div>}
      </div>

      <h4 className="mt-4">Jugadores</h4>
      {form.jugadores.map((jugador, index) => (
        <div key={index} className="card mb-3 p-3">
          <h5>Jugador {index + 1}</h5>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errors[`jugador${index}_nombre`] ? 'is-invalid' : ''}`}
                value={jugador.nombre}
                onChange={(e) => handleJugadorChange(index, 'nombre', e.target.value)}
              />
              {errors[`jugador${index}_nombre`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_nombre`]}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Primer Apellido</label>
              <input
                type="text"
                className={`form-control ${errors[`jugador${index}_apellido1`] ? 'is-invalid' : ''}`}
                value={jugador.apellido1}
                onChange={(e) => handleJugadorChange(index, 'apellido1', e.target.value)}
              />
              {errors[`jugador${index}_apellido1`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_apellido1`]}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Segundo Apellido</label>
              <input
                type="text"
                className="form-control"
                value={jugador.apellido2}
                onChange={(e) => handleJugadorChange(index, 'apellido2', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">DNI</label>
              <input
                type="text"
                className={`form-control ${errors[`jugador${index}_dni`] ? 'is-invalid' : ''}`}
                value={jugador.dni}
                onChange={(e) => handleJugadorChange(index, 'dni', e.target.value)}
              />
              {errors[`jugador${index}_dni`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_dni`]}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors[`jugador${index}_email`] ? 'is-invalid' : ''}`}
                value={jugador.email}
                onChange={(e) => handleJugadorChange(index, 'email', e.target.value)}
              />
              {errors[`jugador${index}_email`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_email`]}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className={`form-control ${errors[`jugador${index}_telefono`] ? 'is-invalid' : ''}`}
                value={jugador.telefono}
                onChange={(e) => handleJugadorChange(index, 'telefono', e.target.value)}
              />
              {errors[`jugador${index}_telefono`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_telefono`]}</div>}
            </div>
            <div className="col-12 mb-2">
              <label className="form-label">Estudio</label>
              <select
                className={`form-select ${errors[`jugador${index}_estudio_id`] ? 'is-invalid' : ''}`}
                value={jugador.estudio_id}
                onChange={(e) => handleJugadorChange(index, 'estudio_id', e.target.value)}
              >
                <option value="">Selecciona un estudio</option>
                {estudios.map(estudio => (
                  <option key={estudio.id} value={estudio.id}>
                    {estudio.nombre}
                  </option>
                ))}
              </select>
              {errors[`jugador${index}_estudio_id`] && 
                <div className="invalid-feedback">{errors[`jugador${index}_estudio_id`]}</div>}
            </div>
          </div>
        </div>
      ))}

      <div className="mb-3">
        <label className="form-label">Comentarios</label>
        <textarea
          className="form-control"
          value={form.comentarios}
          onChange={(e) => setForm({...form, comentarios: e.target.value})}
          rows="3"
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-danger">
          Guardar Inscripción
        </button>
      </div>
    </form>
  );
};

export default AddInscripcion;