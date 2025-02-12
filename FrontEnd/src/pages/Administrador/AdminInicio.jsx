import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir a las rutas
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

function AdminInicio() {
    return (
        <div className="container mt-5">
            {/* Botón de inicio */}
            <Link to="/" className="btn btn-danger mb-4">
                <i className="fa fa-home"></i> Volver al Inicio
            </Link>

            {/* Menú con opciones en línea */}
            <div className="d-flex justify-content-between mb-4">
                <h3 className="me-3"> Administrador</h3>
                <div className="d-flex">
                    <Link to="/usuarios" className="btn btn-danger mx-2">
                        Usuarios
                    </Link>
                    <Link to="/roles" className="btn btn-danger mx-2">
                        Roles
                    </Link>
                    <Link to="/retos" className="btn btn-danger mx-2">
                        Retos
                    </Link>
                    <Link to="/equipos" className="btn btn-danger mx-2">
                        Equipos
                    </Link>
                    <Link to="/donaciones" className="btn btn-danger mx-2">
                        Donaciones
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminInicio;
