import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Confirm from './Confirm';

function MenuEntrenador() {
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

export default MenuEntrenador;