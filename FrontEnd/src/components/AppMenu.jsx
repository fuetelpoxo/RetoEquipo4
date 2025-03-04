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

    const handleConfiguracionClick = () => {
        if (!loggedInUser) {
            navigate("/login");
        } else {
            switch (loggedInUser.perfil) {
                case 'administrador':
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-3">
                <div className="container-fluid position-relative">
                    {/* Logo en la parte izquierda */}
                    <div className="navbar-brand position-relative" style={{ left: '15px' }}>
                        <img 
                            src="/logo_sede_torrelavega.png" 
                            alt="Logo Sede Torrelavega" 
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </div>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Resto del menú centrado */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white custom-hover fs-5" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item dropdown"
                                onMouseEnter={() => setIsTorneoOpen(true)}
                                onMouseLeave={() => setIsTorneoOpen(false)}>
                                <span className="nav-link text-white custom-hover fs-5" style={{ cursor: "pointer" }}>
                                    Torneo
                                </span>
                                {isTorneoOpen && (
                                    <ul className="dropdown-menu show bg-dark border-0">
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/torneo/horario">Horario</Link></li>
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/torneo/clasificacion">Clasificación</Link></li>
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/torneo/fase-final">Fase Final</Link></li>
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/torneo/reglamento">Reglamento</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white custom-hover fs-5" to="/retos">Retos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white custom-hover fs-5" to="/equipos">Equipos</Link>
                            </li>
                            <li className="nav-item dropdown"
                                onMouseEnter={() => setIsSolidarioOpen(true)}
                                onMouseLeave={() => setIsSolidarioOpen(false)}>
                                <span className="nav-link text-white custom-hover fs-5" style={{ cursor: "pointer" }}>
                                    Solidario
                                </span>
                                {isSolidarioOpen && (
                                    <ul className="dropdown-menu show bg-dark border-0">
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/solidario/objetivos">Objetivos</Link></li>
                                        <li><Link className="dropdown-item text-white custom-hover bg-dark fs-5" to="/solidario/patrocinadores">Patrocinadores</Link></li>
                                    </ul>
                                )}
                            </li>
                        </ul>

                        {/* Iconos de usuario a la derecha */}
                        <div className="d-flex align-items-center ms-auto">
                            <li className="nav-item list-unstyled">
                                <Link className="nav-link text-white icon-container" to="/login">
                                    <i className="fa fa-user fa-2x"></i>
                                </Link>
                            </li>
                            {loggedInUser && (
                                <>
                                    <li className="nav-item list-unstyled ms-2">
                                        <span
                                            className="nav-link text-white icon-container"
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleConfiguracionClick}
                                        >
                                            <i className="fa fa-cog fa-2x"></i>
                                        </span>
                                    </li>
                                    <li className="nav-item list-unstyled ms-2">
                                        <button 
                                            onClick={handleLogoutClick}
                                            className="btn btn-outline-danger"
                                            title="Cerrar sesión"
                                        >
                                            <i className="fa fa-sign-out fa-2x"></i>
                                        </button>
                                    </li>
                                </>
                            )}
                        </div>
                    </div>
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
