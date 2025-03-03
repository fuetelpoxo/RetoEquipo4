import React, { useState, useEffect } from 'react';
import { useEstudios } from '../hook/useEstudios';
import { useCentros } from '../hook/useCentros';

const AddInscripcion = ({ onSubmit, onCancel }) => {
    const { estudios, loading: loadingEstudios } = useEstudios();
    const { centros, loading: loadingCentros } = useCentros();
    const [form, setForm] = useState({
        nombre_equipo: '',
        centro_id: '', // Añadido campo centro_id
        jugadores: [{
            nombre: '',
            apellido1: '',
            apellido2: '',
            dni: '',
            email: '',
            telefono: '',
            estudio_id: '',
            rol: 'jugador'
        }],
        comentarios: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!form.nombre_equipo) newErrors.nombre_equipo = 'El nombre del equipo es requerido';
        if (!form.centro_id) newErrors.centro_id = 'El centro es requerido';
        
        if (form.jugadores.length < 1) {
            newErrors.jugadores = 'Se requieren al menos 5 jugadores';
        }

        // Validar cada jugador
        form.jugadores.forEach((jugador, index) => {
            if (!jugador.nombre) newErrors[`jugador${index}_nombre`] = 'El nombre es requerido';
            if (!jugador.apellido1) newErrors[`jugador${index}_apellido1`] = 'El primer apellido es requerido';
            if (!jugador.dni) newErrors[`jugador${index}_dni`] = 'El DNI es requerido';
            if (!jugador.email) newErrors[`jugador${index}_email`] = 'El email es requerido';
            if (!jugador.telefono) newErrors[`jugador${index}_telefono`] = 'El teléfono es requerido';
            if (!jugador.estudio_id) newErrors[`jugador${index}_estudio_id`] = 'El estudio es requerido';
            if (!jugador.rol) newErrors[`jugador${index}_rol`] = 'El rol es requerido';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddJugador = () => {
        if (form.jugadores.length < 12) {
            setForm(prev => ({
                ...prev,
                jugadores: [...prev.jugadores, {
                    nombre: '',
                    apellido1: '',
                    apellido2: '',
                    dni: '',
                    email: '',
                    telefono: '',
                    estudio_id: '',
                    rol: 'jugador'
                }]
            }));
        }
    };

    const handleRemoveJugador = (index) => {
        if (form.jugadores.length > 1) {
            setForm(prev => ({
                ...prev,
                jugadores: prev.jugadores.filter((_, i) => i !== index)
            }));
        }
    };

    const handleJugadorChange = (index, field, value) => {
        setForm(prev => ({
            ...prev,
            jugadores: prev.jugadores.map((jugador, i) =>
                i === index ? { ...jugador, [field]: value } : jugador
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Transformar los datos del formulario al formato que espera el backend
            const inscripcionData = {
                comentarios: form.comentarios,
                estado: 'pendiente', // Estado inicial
                nombre_equipo: form.nombre_equipo,
                centro_id: form.centro_id,
                jugadores: form.jugadores.map(jugador => ({
                    ...jugador,
                    estudio_id: parseInt(jugador.estudio_id)
                }))
            };

            await onSubmit(inscripcionData);
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

            <div className="mb-3">
                <label className="form-label">Centro</label>
                <select
                    className={`form-select ${errors.centro_id ? 'is-invalid' : ''}`}
                    value={form.centro_id}
                    onChange={(e) => setForm({...form, centro_id: e.target.value})}
                >
                    <option value="">Selecciona un centro</option>
                    {centros.map(centro => (
                        <option key={centro.id} value={centro.id}>
                            {centro.nombre}
                        </option>
                    ))}
                </select>
                {errors.centro_id && <div className="invalid-feedback">{errors.centro_id}</div>}
            </div>

            {errors.jugadores && (
                <div className="alert alert-danger">{errors.jugadores}</div>
            )}

            {form.jugadores.map((jugador, index) => (
                <div key={index} className="card mb-3 p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Jugador {index + 1}</h5>
                        {form.jugadores.length > 1 && (
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleRemoveJugador(index)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className={`form-control ${errors[`jugador${index}_nombre`] ? 'is-invalid' : ''}`}
                                value={jugador.nombre}
                                onChange={(e) => handleJugadorChange(index, 'nombre', e.target.value)}
                            />
                            {errors[`jugador${index}_nombre`] && (
                                <div className="invalid-feedback">{errors[`jugador${index}_nombre`]}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label">Primer Apellido</label>
                            <input
                                type="text"
                                className={`form-control ${errors[`jugador${index}_apellido1`] ? 'is-invalid' : ''}`}
                                value={jugador.apellido1}
                                onChange={(e) => handleJugadorChange(index, 'apellido1', e.target.value)}
                            />
                            {errors[`jugador${index}_apellido1`] && (
                                <div className="invalid-feedback">{errors[`jugador${index}_apellido1`]}</div>
                            )}
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
                            {errors[`jugador${index}_dni`] && (
                                <div className="invalid-feedback">{errors[`jugador${index}_dni`]}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors[`jugador${index}_email`] ? 'is-invalid' : ''}`}
                                value={jugador.email}
                                onChange={(e) => handleJugadorChange(index, 'email', e.target.value)}
                            />
                            {errors[`jugador${index}_email`] && (
                                <div className="invalid-feedback">{errors[`jugador${index}_email`]}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                className={`form-control ${errors[`jugador${index}_telefono`] ? 'is-invalid' : ''}`}
                                value={jugador.telefono}
                                onChange={(e) => handleJugadorChange(index, 'telefono', e.target.value)}
                            />
                            {errors[`jugador${index}_telefono`] && (
                                <div className="invalid-feedback">{errors[`jugador${index}_telefono`]}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label">Rol</label>
                            <select
                                className={`form-select ${errors[`jugador${index}_rol`] ? 'is-invalid' : ''}`}
                                value={jugador.rol}
                                onChange={(e) => handleJugadorChange(index, 'rol', e.target.value)}
                            >
                                <option value="">Selecciona un rol</option>
                                <option value="capitan">Capitán</option>
                                <option value="jugador">Jugador</option>
                            </select>
                            {errors[`jugador${index}_rol`] && <div className="invalid-feedback">{errors[`jugador${index}_rol`]}</div>}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label">Estudio</label>
                            <select
                                className={`form-select ${errors[`jugador${index}_estudio_id`] ? 'is-invalid' : ''}`}
                                value={jugador.estudio_id}
                                onChange={(e) => handleJugadorChange(index, 'estudio_id', e.target.value)}
                                disabled={loadingEstudios}
                            >
                                <option value="">Selecciona un estudio</option>
                                {estudios.map(estudio => (
                                    <option key={estudio.id} value={estudio.id}>
                                        {estudio.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors[`jugador${index}_estudio_id`] && <div className="invalid-feedback">{errors[`jugador${index}_estudio_id`]}</div>}
                        </div>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddJugador}
                    disabled={form.jugadores.length >= 12}
                >
                    <i className="fa fa-plus me-2"></i>
                    Añadir Jugador ({form.jugadores.length}/12)
                </button>
                <span className="text-muted">
                    Mínimo 5 jugadores - Máximo 12 jugadores
                </span>
            </div>

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