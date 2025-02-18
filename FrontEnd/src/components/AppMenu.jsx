import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from '../context/UserContext';
import { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import './AppMenu.css';

function AppMenu() {
    const { loggedInUser } = useAuth();
    const [isTorneoOpen, setIsTorneoOpen] = useState(false);
    const [isSolidarioOpen, setIsSolidarioOpen] = useState(false);
    const navigate = useNavigate(); // Usamos useNavigate para la redirección programática

    // Función de redirección para el ícono de configuración
    const handleConfiguracionClick = () => {
        if (!loggedInUser) {
            navigate("/login"); // Si no hay usuario, redirige al login
        } else {
            switch (loggedInUser.role) {
                case 'admin':
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-3">
            <div className="container-fluid position-relative"> {/* Added position-relative */}
                <div className="w-100 d-flex justify-content-center align-items-center"> {/* Changed to center */}
                    {/* Centered Navigation Items */}
                    <ul className="navbar-nav">
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
                        <li className="nav-item">
                            <Link className="nav-link text-white custom-hover fs-5" to="/solidario">Solidario</Link>
                        </li>
                    </ul>

                    {/* Right-aligned Icons - now absolutely positioned */}
                    <div className="d-flex align-items-center position-absolute" style={{ right: '15px' }}>
                        <li className="nav-item list-unstyled">
                            <Link className="nav-link text-white icon-container" to="/login">
                                <i className="fa fa-user fa-2x"></i>
                            </Link>
                        </li>
                        {loggedInUser && (
                            <li className="nav-item list-unstyled ms-2">
                                <span
                                    className="nav-link text-white icon-container"
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleConfiguracionClick}
                                >
                                    <i className="fa fa-cog fa-2x"></i>
                                </span>
                            </li>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AppMenu;
