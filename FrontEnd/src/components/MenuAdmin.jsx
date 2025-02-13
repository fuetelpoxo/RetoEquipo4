// AdminMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

function AdminMenu() {
    return (
        <div className="d-flex">
            <Link to="/" className="btn btn-danger mx-2">
                <i className="fa fa-home"></i> Inicio
            </Link>
            <Link to="/administrador/usuarios" className="btn btn-danger mx-2">
                Usuarios
            </Link>
            <Link to="/administrador/roles" className="btn btn-danger mx-2">
                Roles
            </Link>
            <Link to="/administrador/retos" className="btn btn-danger mx-2">
                Retos
            </Link>
            <Link to="/administrador/equipos" className="btn btn-danger mx-2">
                Equipos
            </Link>
            <Link to="/administrador/donaciones" className="btn btn-danger mx-2">
                Donaciones
            </Link>
        </div>
    );
}

export default AdminMenu;
