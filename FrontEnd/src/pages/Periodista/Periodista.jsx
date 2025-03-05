import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePublicaciones } from '../../hook/UsePublicaciones';
import { useAuth } from '../../context/UserContext';
import AddPublicacion from '../../components/AddPublicacion';
import EditPublicacion from '../../components/EditPublicacion'; // Añadido
import Loading from '../../components/Loading';
import Confirm from '../../components/Confirm';

function Periodista() {
    const { user, logout } = useAuth(); // Añadido user
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const { publicaciones, loading, error, handleAddPublicacion, handleUpdatePublicacion, handleDeletePublicacion } = usePublicaciones(); // Añadido handleDeletePublicacion
    const [mostrarForm, setMostrarForm] = useState(false);
    const [publicacionEditar, setPublicacionEditar] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Añadido
    const [publicacionEliminar, setPublicacionEliminar] = useState(null); // Añadido


    const handleLogoutClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmLogout = () => {
        if (typeof logout === 'function') {
            logout();
            navigate('/');
            setShowConfirm(false);
        }
    };

    const handleEdit = (publicacion) => {
        setPublicacionEditar({
            id: publicacion.id,
            titulo: publicacion.titulo,
            texto: publicacion.texto,
            portada: publicacion.portada || false,
            equipo_id: publicacion.equipo_id || ''
        });
        setMostrarForm(true);
    };

    // Añadido manejo de eliminación
    const handleDelete = (publicacion) => {
        setPublicacionEliminar(publicacion);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await handleDeletePublicacion(publicacionEliminar.id);
            setShowDeleteConfirm(false);
            setPublicacionEliminar(null);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <>
            <div className="container text-center my-3">
                <div className="btn-group">
                    <Link to="/" className="btn btn-danger">
                        <i className="fa fa-home me-2"></i>
                        Página Principal
                    </Link>
                    <button 
                        onClick={handleLogoutClick}
                        className="btn btn-outline-danger"
                        title="Cerrar sesión"
                    >
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
            </div>

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Panel de Periodista</h1>
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            setPublicacionEditar(null);
                            setMostrarForm(true);
                        }}
                    >
                        <i className="fa fa-plus me-2"></i>
                        Nueva Publicación
                    </button>
                </div>

                {mostrarForm && (
                    <div className="mb-4">
                        {!publicacionEditar ? (
                            <AddPublicacion
                                onSubmit={async (data) => {
                                    try {
                                        await handleAddPublicacion({...data, usuarioId: user?.id});
                                        setMostrarForm(false);
                                    } catch (error) {
                                        console.error("Error al crear:", error);
                                    }
                                }}
                                onCancel={() => setMostrarForm(false)}
                            />
                        ) : (
                            <EditPublicacion
                                publicacion={publicacionEditar}
                                onSubmit={async (data) => {
                                    try {
                                        await handleUpdatePublicacion(publicacionEditar.id, data);
                                        setMostrarForm(false);
                                        setPublicacionEditar(null);
                                    } catch (error) {
                                        console.error("Error al actualizar:", error);
                                    }
                                }}
                                onCancel={() => {
                                    setMostrarForm(false);
                                    setPublicacionEditar(null);
                                }}
                            />
                        )}
                    </div>
                )}

                <div className="row g-4">
                    {publicaciones.map(pub => (
                        <div key={pub.id} className="col-md-6">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title mb-0">{pub.titulo}</h5>
                                        <div>
                                            <button 
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEdit(pub)}
                                            >
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(pub)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div 
                                        className="card-text mb-3" 
                                        style={{ 
                                            maxHeight: '200px', 
                                            overflow: 'auto' 
                                        }}
                                        dangerouslySetInnerHTML={{ __html: pub.texto }} 
                                    />
                                    <div className="text-muted small">
                                        <i className="fa fa-clock-o me-1"></i>
                                        {new Date(pub.fechaCreacion).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Confirm
                show={showConfirm}
                title="Cerrar Sesión"
                message="¿Estás seguro que deseas cerrar sesión?"
                onConfirm={handleConfirmLogout}
                onCancel={() => setShowConfirm(false)}
            />

            <Confirm
                show={showDeleteConfirm}
                title="Eliminar Publicación"
                message="¿Estás seguro que deseas eliminar esta publicación?"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setShowDeleteConfirm(false);
                    setPublicacionEliminar(null);
                }}
            />
        </>
    );
}

export default Periodista;
