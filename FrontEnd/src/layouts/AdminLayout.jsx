// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../components/MenuAdmin';

function AdminLayout() {
    return (
        <div className="container mt-5">
            {/* Menú con opciones en línea */}
            <div className="d-flex justify-content-between mb-4">
                <h3 className="me-3">Administrador</h3>
                <AdminMenu />
            </div>

            {/* Renderiza las rutas anidadas */}
            <Outlet />
        </div>
    );
}

export default AdminLayout;
