import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Confirm from './Confirm';
import './AppMenu.css';

function AppMenu() {
    const { loggedInUser, logout } = useAuth();
    const [isTorneoOpen, setIsTorneoOpen] = useState(false);
    const [isSolidarioOpen, setIsSolidarioOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

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

    // Función de redirección para el ícono de configuración
    const handleConfiguracionClick = () => {
        if (!loggedInUser) {
            navigate("/login"); // Si no hay usuario, redirige al login
        } else {
            switch (loggedInUser.perfil) { // Cambiado de role a perfil
                case 'administrador': // Cambiado de admin a administrador
                    navigate("/administrador");
                    break;
                case 'director':
                    navigate("/director");
                    break;
                case 'entrenador':
                    navigate("/entrenador");
                    break;
                case 'periodista':
                    navigate("/periodista");
                    break;
                default:
                    navigate("/");  
                    break;
            }
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white custom-hover" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item dropdown"
                            onMouseEnter={() => setIsTorneoOpen(true)}
                            onMouseLeave={() => setIsTorneoOpen(false)}>
                            <span className="nav-link text-white custom-hover" style={{ cursor: "pointer" }}>
                                Torneo
                            </span>
                            {isTorneoOpen && (
                                <ul className="dropdown-menu show bg-dark border-0">
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/torneo/horario">Horario</Link></li>
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/torneo/clasificacion">Clasificación</Link></li>
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/torneo/fase-final">Fase Final</Link></li>
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/torneo/reglamento">Reglamento</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white custom-hover" to="/retos">Retos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white custom-hover" to="/equipos">Equipos</Link>
                        </li>
                        <li className="nav-item dropdown"
                            onMouseEnter={() => setIsSolidarioOpen(true)}
                            onMouseLeave={() => setIsSolidarioOpen(false)}>
                            <span className="nav-link text-white custom-hover" style={{ cursor: "pointer" }}>
                                Solidario
                            </span>
                            {isSolidarioOpen && (
                                <ul className="dropdown-menu show bg-dark border-0">
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/solidario/objetivos">Objetivos</Link></li>
                                    <li><Link className="dropdown-item text-white custom-hover bg-dark" to="/solidario/patrocinadores">Patrocinadores</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="nav-item ms-auto">
                            <Link className="nav-link text-white icon-container" to="/login">
                                <i className="fa fa-user"></i>
                            </Link>
                        </li>
                        {loggedInUser && (
                            <>
                                <li className="nav-item ms-auto">
                                    <span
                                        className="nav-link text-white icon-container"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleConfiguracionClick}  // Llamamos a la función de redirección
                                    >
                                        <i className="fa fa-cog"></i>
                                    </span>
                                </li>
                                <li className="nav-item ms-2">
                                    <button 
                                        onClick={handleLogoutClick}
                                        className="btn btn-outline-danger"
                                        title="Cerrar sesión"
                                    >
                                        <i className="fa fa-sign-out"></i>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

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

export default AppMenu;
