import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import './AppMenu.css';

function AppMenu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/torneo">Torneo</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/retos">Retos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/equipos">Equipos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white custom-hover" to="/reglamento">Reglamento</Link>
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
