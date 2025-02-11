import { Link } from "react-router-dom";

function AppMenu() {
    return (<nav className="navegacion">
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/torneo">Torneo</Link></li>
            <li><Link to="/retos">Retos</Link></li>
            <li><Link to="/equipos">Equipos</Link></li>
            <li><Link to="/reglamento">Reglamento</Link></li>
            <li><Link to="/login">Iniciar Sesion</Link></li>
        </ul>
    </nav>);
}

export default AppMenu;