import { Link } from "react-router-dom";
import { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import './AppMenu.css';

function AppMenu() {
    const [isTorneoOpen, setIsTorneoOpen] = useState(false);
    const [isSolidarioOpen, setIsSolidarioOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item dropdown"
                        onMouseEnter={() => setIsTorneoOpen(true)}
                        onMouseLeave={() => setIsTorneoOpen(false)}>
                        <span className="nav-link text-white custom-hover" onClick={() => setIsTorneoOpen(!isTorneoOpen)} style={{ cursor: "pointer" }} >Torneo</span>
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
                        <span className="nav-link text-white custom-hover" onClick={() => setIsSolidarioOpen(!isSolidarioOpen)} style={{ cursor: "pointer" }} >Solidario</span>
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
                </ul>
            </div>
        </nav>
    );
}

export default AppMenu;
