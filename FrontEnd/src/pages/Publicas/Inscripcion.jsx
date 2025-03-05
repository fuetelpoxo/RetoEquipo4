import React, { useState } from 'react';

const ciclos = [
    "Elige un módulo", "DAM", "DAW", "ASIR", "Marketing", "Administración"
];

function Inscripcion() {
    const [jugadores, setJugadores] = useState([
        { nombre: "", apellidos: "", dni: "", telefono: "", ciclo: "Elige un módulo" },
        { nombre: "", apellidos: "", ciclo: "Elige un módulo" },
        { nombre: "", apellidos: "", ciclo: "Elige un módulo" },
        { nombre: "", apellidos: "", ciclo: "Elige un módulo" },
        { nombre: "", apellidos: "", ciclo: "Elige un módulo" }
    ]);

    function handleChange(index, field, value) {
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[index][field] = value;
        setJugadores(nuevosJugadores);
    };

    function agregarJugador() {
        if (jugadores.length < 10) {
            setJugadores([...jugadores, { nombre: "", apellidos: "", ciclo: "Elige un módulo" }]);
        }
    };

    function eliminarJugador(index) {
        setJugadores(jugadores.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="container" style={{ marginTop: '60px' }}>
                <h1 className="text-center text-danger mb-4 bg-dark p-3 text-white">Inscripción</h1>
                <form>
                    <div className="card p-4 mb-4 border border-dark bg-light">
                        <h2 className="text-danger">Capitán</h2>
                        {['nombre', 'apellidos', 'dni', 'telefono'].map((campo) => (
                            <div className="mb-3" key={campo}>
                                <label className="form-label text-dark">{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    value={jugadores[0][campo]}
                                    onChange={(e) => handleChange(0, campo, e.target.value)}
                                />
                            </div>
                        ))}
                        <div className="mb-3">
                            <label className="form-label text-dark">Ciclo:</label>
                            <select className="form-select border border-dark" value={jugadores[0].ciclo} onChange={(e) => handleChange(0, 'ciclo', e.target.value)}>
                                {ciclos.map((ciclo) => (
                                    <option key={ciclo} value={ciclo} disabled={ciclo === "Elige un módulo"}>{ciclo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h2 className="text-secondary">Jugadores</h2>
                    {jugadores.slice(1).map((jugador, index) => (
                        <div key={index + 1} className="card p-3 mb-3 border border-dark bg-light">
                            <h3 className="text-dark">Jugador {index + 1}</h3>
                            {['nombre', 'apellidos'].map((campo) => (
                                <div className="mb-3" key={campo}>
                                    <label className="form-label text-dark">{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                                    <input
                                        type="text"
                                        className="form-control border border-dark"
                                        value={jugador[campo]}
                                        onChange={(e) => handleChange(index + 1, campo, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="mb-3">
                                <label className="form-label text-dark">Ciclo:</label>
                                <select className="form-select border border-dark" value={jugador.ciclo} onChange={(e) => handleChange(index + 1, 'ciclo', e.target.value)}>
                                    {ciclos.map((ciclo) => (
                                        <option key={ciclo} value={ciclo} disabled={ciclo === "Elige un módulo"}>{ciclo}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => eliminarJugador(index + 1)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-danger" onClick={agregarJugador} disabled={jugadores.length >= 10}>
                        Agregar Jugador
                    </button>
                </form>
            </div>
        </>
    );
}

export default Inscripcion;