import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEquipos } from '../../models/EquipoModel';
import Loading from '../../components/Loading';

function InfoEquipos() {
    const { nombre } = useParams(); // Cambiar id por nombre
    const navigate = useNavigate();
    const [equipo, setEquipo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipo = async () => {
            try {
                const equipos = await getEquipos();
                const nombreDecodificado = nombre.replace(/-/g, ' ').toLowerCase();
                const equipoEncontrado = equipos.find(
                    e => e.nombre.toLowerCase() === nombreDecodificado
                );
                setEquipo(equipoEncontrado);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipo();
    }, [nombre]);

    if (loading) return <Loading />;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-danger text-white py-3">
                    <h1 className="text-center mb-0">{equipo?.nombre}</h1>
                </div>
                <div className="card-body">
                    <div className="text-center mb-4">
                        <img
                            src={equipo?.foto || '/default-team.jpg'}
                            alt={equipo?.nombre}
                            className="img-fluid rounded shadow-sm"
                            style={{
                                maxWidth: '300px',
                                height: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-danger mb-4">Información del Equipo</h3>
                        <p className="fs-5">
                            <strong>Grupo:</strong> {equipo?.grupo || 'No asignado'}
                        </p>
                        <p className="fs-5">
                            <strong>Fecha de Creación:</strong> {
                                equipo?.fechaCreacion ? new Date(equipo.fechaCreacion).toLocaleDateString() : '-'
                            }
                        </p>
                    </div>

                    <div className="text-center mt-4">
                        <button onClick={() => navigate('/equipos')} className="btn btn-danger">
                            Volver a Equipos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoEquipos;
