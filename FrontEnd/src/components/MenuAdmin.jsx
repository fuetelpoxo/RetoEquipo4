// AdminMenu.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Confirm from './Confirm';
import 'font-awesome/css/font-awesome.min.css';

function AdminMenu() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

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

    return (
        <>
            <div className="container text-center my-3">
                <div className="btn-group">
                    <Link to="/" className="btn btn-danger">Página Principal</Link>
                    <Link to="/administrador" className="btn btn-danger">Inicio Admin</Link>
                    <Link to="/administrador/usuarios" className="btn btn-danger">Usuarios</Link>
                    <Link to="/administrador/actas" className="btn btn-danger">Actas</Link>
                    <Link to="/administrador/inscripciones" className="btn btn-danger">Inscripciones</Link>
                    <Link to="/administrador/equipos" className="btn btn-danger">Equipos</Link>
                    <Link to="/administrador/jugadores" className="btn btn-danger">Jugadores</Link>
                    <Link to="/administrador/donaciones" className="btn btn-danger">Donaciones</Link>
                    <button 
                        onClick={handleLogoutClick}
                        className="btn btn-outline-danger"
                        title="Cerrar sesión"
                    >
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
            </div>

            <Confirm
                show={showConfirm}
                title="Cerrar Sesión"
                message="¿Estás seguro que deseas cerrar sesión?"
                onConfirm={handleConfirmLogout}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}

export default AdminMenu;
