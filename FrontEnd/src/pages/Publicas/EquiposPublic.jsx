import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogicaEquiposPublic } from '../../core/LogicaEquipos';
import Loading from '../../components/Loading';

function EquiposPublic() {
    const navigate = useNavigate();
    const { equipos, loading, error } = useLogicaEquiposPublic();

    const handleVerDetalles = (equipo) => {
        const nombreFormateado = equipo.nombre.toLowerCase().replace(/ /g, '-');
        navigate(`/equipos/infoequipos/${nombreFormateado}`);
    };

    const handleInscribirse = () => {
        navigate('/login');
    };

    if (loading) return <Loading />;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <h2 className="text-center display-5 mb-5">Equipos Participantes</h2>

                {!equipos || equipos.length === 0 ? (
                    <div className="alert alert-danger text-center">
                        No hay equipos registrados.
                    </div>
                ) : (
                    <div className="row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {equipos.map((equipo) => (
                            <div key={equipo.id} className="col">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="bg-dark text-white p-3">
                                        <h3 className="card-title h4 text-center mb-0">
                                            {equipo.nombre}
                                        </h3>
                                    </div>
                                    <div className="card-body text-center d-flex flex-column">
                                        <div className="mb-3">
                                            <img
                                                src={equipo.foto}
                                                className="img-fluid rounded shadow-sm"
                                                style={{
                                                    width: '200px',
                                                    height: '200px',
                                                    objectFit: 'cover'
                                                }}
                                                alt={equipo.nombre}
                                            />
                                        </div>
                                        <div className="mt-auto">
                                            <span className="badge bg-success-subtle text-success px-3 py-2 fs-6 mb-3">
                                                Centro: {equipo.centro?.nombre || 'No asignado'}
                                            </span>
                                            <button onClick={() => handleVerDetalles(equipo)} className="btn btn-dark w-100 mt-3">
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Banner de inscripción existente */}
            <div className="container mb-5" style={{ marginTop: '20px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center">
                            <button className="btn btn-danger btn-lg px-5 py-3 shadow-sm" onClick={handleInscribirse}>
                                Inscribe tu Equipo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquiposPublic;
