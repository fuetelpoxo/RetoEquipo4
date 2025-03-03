import React, { useState, useEffect } from 'react';
import { useEquipos } from '../../hook/UseEquipos';
import { useAuth } from '../../context/UserContext';
import Loading from '../../components/Loading';
import EditEquipo from '../../components/EditEquipo';
import AddInscripcion from '../../components/AddInscripcion';
import DetallesEquipo from '../../components/DetallesEquipo';
import MenuEntrenador from '../../components/MenuEntrenador';
import { useInscripciones } from '../../hook/useInscripciones';

function Entrenador() {
    const { equipos, loading: loadingEquipos, error: errorEquipos, handleUpdateEquipo } = useEquipos();
    const { handleCreateInscripcion } = useInscripciones();
    const { loggedInUser } = useAuth();
    const [vista, setVista] = useState('info');
    const [miEquipo, setMiEquipo] = useState(null);

    useEffect(() => {
        if (loggedInUser && equipos.length > 0) {
            const equipoEntrenador = equipos.find(e => e.usuarioIdCreacion === loggedInUser.id);
            setMiEquipo(equipoEntrenador);
        }
    }, [equipos, loggedInUser]);

    const handleCrearInscripcion = async (data) => {
        try {
            await handleCreateInscripcion({
                ...data,
                usuarioIdCreacion: loggedInUser.id,
                estado: 'pendiente'
            });
            setVista('info');
        } catch (error) {
            console.error('Error al crear inscripción:', error);
        }
    };

    if (loadingEquipos) return <Loading />;
    if (errorEquipos) return <div className="alert alert-danger">{errorEquipos}</div>;

    return (
        <div className="container mt-5">
            <MenuEntrenador />
            <h1 className="mb-4">Panel de Entrenador</h1>

            {!miEquipo && vista === 'info' && (
                <div className="text-center">
                    <p className="mb-4">No tienes un equipo asignado</p>
                    <button 
                        className="btn btn-success"
                        onClick={() => setVista('crear')}
                    >
                        <i className="fa fa-plus me-2"></i>
                        Inscribir Equipo
                    </button>
                </div>
            )}

            {miEquipo && vista === 'info' && (
                <>
                    <DetallesEquipo 
                        equipo={miEquipo} 
                        onCancel={() => setVista('editar')}
                    />
                    <div className="text-end mt-3">
                        <button 
                            className="btn btn-danger"
                            onClick={() => setVista('editar')}
                        >
                            <i className="fas fa-edit me-2"></i>
                            Editar Equipo
                        </button>
                    </div>
                </>
            )}

            {vista === 'crear' && (
                <AddInscripcion 
                    onSubmit={handleCrearInscripcion}
                    onCancel={() => setVista('info')}
                />
            )}

            {vista === 'editar' && miEquipo && (
                <EditEquipo 
                    equipo={miEquipo}
                    onSubmit={async (data) => {
                        await handleUpdateEquipo(miEquipo.id, data);
                        setVista('info');
                    }}
                    onCancel={() => setVista('info')}
                />
            )}
        </div>
    );
}

export default Entrenador;
