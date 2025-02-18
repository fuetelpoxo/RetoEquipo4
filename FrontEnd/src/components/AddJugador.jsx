import React, { useState, useEffect } from 'react';
import { getEquiposSelect, getEstudiosSelect } from '../models/JugadorModel';

const AddJugador = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    tipo: '',
    equipo_id: '',
    estudio_id: '', // Añadido campo estudio_id
    email: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [estudios, setEstudios] = useState([]); // Nuevo estado para estudios

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [equiposData, estudiosData] = await Promise.all([
          getEquiposSelect(),
          getEstudiosSelect()
        ]);
        setEquipos(equiposData);
        setEstudios(estudiosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.apellido1.trim()) newErrors.apellido1 = 'El primer apellido es requerido';
    if (!form.dni.trim()) newErrors.dni = 'El DNI es requerido';
    if (!form.tipo) newErrors.tipo = 'El tipo es requerido';
    if (!form.email) newErrors.email = 'El email es requerido';
    if (!form.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!form.equipo_id) newErrors.equipo_id = 'El equipo es requerido';
    if (!form.estudio_id) newErrors.estudio_id = 'El estudio es requerido'; // Nueva validación
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleEquipoSelect = (equipoId) => {
    setForm(prev => ({ ...prev, equipo_id: equipoId }));
    if (errors.equipo_id) {
      setErrors({ ...errors, equipo_id: null });
    }
  };

  return (
    <div className="container mt-3">
      <h2>Añadir Jugador</h2>
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Estudio</label>
          <select
            className={`form-select ${errors.estudio_id ? 'is-invalid' : ''}`}
            name="estudio_id"
            value={form.estudio_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un estudio</option>
            {estudios.map(estudio => (
              <option key={estudio.id} value={estudio.id}>
                {`${estudio.ciclo.nombre} - ${estudio.centro.nombre} - Curso ${estudio.curso}`}
              </option>
            ))}
          </select>
          {errors.estudio_id && <div className="invalid-feedback">{errors.estudio_id}</div>}
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

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddJugador;