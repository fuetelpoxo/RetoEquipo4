import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEquipos, getJugadoresByEquipo } from '../../models/EquipoModel';
import Loading from '../../components/Loading';

function InfoEquipos() {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [equipo, setEquipo] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipos = await getEquipos();
                const nombreDecodificado = nombre.replace(/-/g, ' ').toLowerCase();
                const equipoEncontrado = equipos.find(
                    e => e.nombre.toLowerCase() === nombreDecodificado
                );

                if (equipoEncontrado) {
                    setEquipo(equipoEncontrado);
                    const jugadoresData = await getJugadoresByEquipo(equipoEncontrado.id);
                    setJugadores(jugadoresData);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nombre]);

    if (loading) return <Loading />;

    const entrenador = jugadores.find(j => j.tipo === 'entrenador');
    const capitan = jugadores.find(j => j.tipo === 'capitan');
    const jugadoresRegulares = jugadores.filter(j => j.tipo === 'jugador');

    return (
        <div className="container mt-5">
            {/* Cabecera del equipo */}
            <div className="card shadow-lg mb-5">
                <div className="card-header bg-dark text-white py-3">
                    <h1 className="text-center mb-0">{equipo?.nombre}</h1>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center mb-4">
                            <img
                                src={equipo?.foto || '/default-team.jpg'}
                                alt={equipo?.nombre}
                                className="img-fluid rounded shadow"
                                style={{ maxWidth: '300px', height: '300px', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="border-bottom border-danger pb-2 mb-4">Información del Equipo</h3>
                            <p className="fs-5">
                                <strong>Grupo:</strong> {equipo?.grupo || 'No asignado'}
                            </p>
                            <p className="fs-5">
                                <strong>Fecha de Creación:</strong> {
                                    equipo?.fechaCreacion ? new Date(equipo.fechaCreacion).toLocaleDateString() : '-'
                                }
                            </p>
                            {/* Añadir sección de patrocinadores */}
                            <div className="mt-4">
                                <h4 className="border-bottom border-danger pb-2 mb-4">Patrocinadores</h4>
                                {equipo?.patrocinadores && equipo.patrocinadores.length > 0 ? (
                                    <div className="row g-3">
                                        {equipo.patrocinadores.map((patrocinador, index) => (
                                            <div key={index} className="col-6">
                                                <div className="card bg-light border-0">
                                                    <div className="card-body text-center">
                                                        <h5 className="mb-0">{patrocinador.nombre}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No hay patrocinadores registrados</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Staff Técnico */}
            <div className="row mb-5">
                {entrenador && (
                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-header bg-dark text-white">
                                <h3 className="h5 mb-0">Entrenador</h3>
                            </div>
                            <div className="card-body text-center">
                                <img
                                    src={entrenador.foto || '/default-coach.jpg'}
                                    alt={entrenador.nombre}
                                    className="mb-3"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                                <h4>{`${entrenador.nombre} ${entrenador.apellido1 || ''}`}</h4>
                                <span className="badge bg-dark">Entrenador</span>
                            </div>
                        </div>
                    </div>
                )}
                {capitan && (
                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-header bg-dark text-white">
                                <h3 className="h5 mb-0">Capitán del Equipo</h3>
                            </div>
                            <div className="card-body text-center">
                                <div className="position-relative d-inline-block">
                                    <img
                                        src={capitan.foto || '/default-player.jpg'}
                                        alt={capitan.nombre}
                                        className="mb-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                </div>
                                <h4>{`${capitan.nombre} ${capitan.apellido1 || ''}`}</h4>
                                <span className="badge bg-dark">Capitán</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Plantilla */}
            <div className="card shadow-lg mb-5">
                <div className="card-header bg-dark text-white">
                    <h3 className="h5 mb-0">Plantilla</h3>
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        {jugadoresRegulares.map((jugador, index) => (
                            <div key={index} className="col-6 col-md-4 col-lg-3">
                                <div className="text-center">
                                    <img
                                        src={jugador.foto || '/default-player.jpg'}
                                        alt={jugador.nombre}
                                        className="mb-2"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <h5 className="mb-0">{`${jugador.nombre} ${jugador.apellido1 || ''}`}</h5>
                                    <small className="text-muted">{jugador.posicion || 'Jugador'}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-4 mb-5">
                <button onClick={() => navigate('/equipos')} className="btn btn-outline-dark">
                    Volver a Equipos
                </button>
            </div>
        </div>
    );
}

export default InfoEquipos;
