// AdminMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

function AdminMenu() {
    return (
        <div className="container text-center my-3">
            <div className="btn-group">
                <Link to="/" className="btn btn-danger">Inicio</Link>
                <Link to="/administrador/usuarios" className="btn btn-danger">Usuarios</Link>
                <Link to="/administrador/actas" className="btn btn-danger">Actas</Link>
                <Link to="/administrador/retos" className="btn btn-danger">Retos</Link>
                <Link to="/administrador/equipos" className="btn btn-danger">Equipos</Link>
                <Link to="/administrador/jugadores" className="btn btn-danger">Jugadores</Link>
                <Link to="/administrador/donaciones" className="btn btn-danger">Donaciones</Link>
            </div>
        </div>
    );
    
}

export default AdminMenu;
