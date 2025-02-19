import React, { useState } from 'react';

const AddActa = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    partido_id: '',
    jugador_id: '',
    incidencia: '',
    hora: '',
    comentario: ''
  });

  const [errors, setErrors] = useState({});

  const incidencias = [
    'amarilla',
    'roja',
    'lesion',
    'cambio',
    'gol',
    'falta',
    'penalti'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!form.partido_id) newErrors.partido_id = 'El partido es requerido';
    if (!form.jugador_id) newErrors.jugador_id = 'El jugador es requerido';
    if (!form.incidencia) newErrors.incidencia = 'La incidencia es requerida';
    if (!form.hora) newErrors.hora = 'La hora es requerida';
    if (form.hora && !/^\d{1,2}:\d{2}$/.test(form.hora)) {
      newErrors.hora = 'El formato debe ser HH:MM';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(form);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  return (
    <div className="container mt-3">
      <h2>Añadir Acta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Partido</label>
          <select
            className={`form-select ${errors.partido_id ? 'is-invalid' : ''}`}
            name="partido_id"
            value={form.partido_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un partido</option>
            {/* Aquí irían las opciones de partidos */}
          </select>
          {errors.partido_id && <div className="invalid-feedback">{errors.partido_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Jugador</label>
          <select
            className={`form-select ${errors.jugador_id ? 'is-invalid' : ''}`}
            name="jugador_id"
            value={form.jugador_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un jugador</option>
            {/* Aquí irían las opciones de jugadores */}
          </select>
          {errors.jugador_id && <div className="invalid-feedback">{errors.jugador_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Incidencia</label>
          <select
            className={`form-select ${errors.incidencia ? 'is-invalid' : ''}`}
            name="incidencia"
            value={form.incidencia}
            onChange={handleChange}
          >
            <option value="">Seleccione una incidencia</option>
            {incidencias.map(inc => (
              <option key={inc} value={inc}>{inc}</option>
            ))}
          </select>
          {errors.incidencia && <div className="invalid-feedback">{errors.incidencia}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Hora (HH:MM)</label>
          <input
            type="text"
            className={`form-control ${errors.hora ? 'is-invalid' : ''}`}
            name="hora"
            value={form.hora}
            onChange={handleChange}
            placeholder="15:30"
          />
          {errors.hora && <div className="invalid-feedback">{errors.hora}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Comentario</label>
          <textarea
            className="form-control"
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddActa;