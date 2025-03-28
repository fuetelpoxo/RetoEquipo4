// src/routes/AppEnrutador.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from '../layouts/AppLayout.jsx';
import LoginLayout from "../components/LoginLayout.jsx";
import LogIn from '../pages/Publicas/LogIn.jsx';
import Inicio from '../pages/Publicas/Inicio.jsx';
import RetosInfo from '../pages/Publicas/RetosInfo.jsx';
import Reglamento from '../pages/Publicas/Reglamento.jsx';
import InfoEquipos from '../pages/Publicas/InfoEquipos.jsx';
import RetosPublic from '../pages/Publicas/RetosPublic.jsx';
import EquiposPublic from '../pages/Publicas/EquiposPublic.jsx';
import TorneoSolidario from '../pages/Publicas/TorneoSolidario.jsx';
import Horarios from '../pages/Publicas/Horarios.jsx';
import FaseFinal from '../pages/Publicas/FaseFinal.jsx';
import Clasificacion from '../pages/Publicas/Clasificacion.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdministradorInicio from '../pages/Administrador/AdminInicio.jsx';
import Usuarios from '../pages/Administrador/Usuarios.jsx';
import Actas from '../pages/Administrador/Actas.jsx';
import Equipos from '../pages/Administrador/Equipos.jsx';
import Donaciones from '../pages/Administrador/Donaciones.jsx';
import ActasDirector from '../pages/DirectorTecnico/ActasDirector.jsx';
import Entrenador from '../pages/Entrenador/Entrenador.jsx';
import Periodista from '../pages/Periodista/Periodista.jsx';
import { useAuth } from '../context/UserContext';
import Jugadores from '../pages/Administrador/Jugadores';
import Inscripciones from '../pages/Administrador/Inscripciones';


function AppEnrutador() {
  const { loggedInUser } = useAuth();

  // Redirigir al login si no hay usuario logueado en rutas privadas
  if (!loggedInUser) {
    return (
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Inicio />} />
            <Route path="login" element={<LoginLayout />}>
              <Route index element={<LogIn />} />
            </Route>
            <Route path="retos" element={<RetosPublic />} />
            <Route path="retos/inforetos" element={<RetosInfo />} />
            <Route path="solidario" element={<TorneoSolidario />} />
            <Route path="equipos" element={<EquiposPublic />} />
            <Route path="equipos/infoequipos/:nombre" element={<InfoEquipos />} />
            <Route path="torneo/horario" element={<Horarios />} />
            <Route path="torneo/fase-final" element={<FaseFinal />} />
            <Route path="torneo/reglamento" element={<Reglamento />} />
            <Route path="torneo/clasificacion" element={<Clasificacion />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Inicio />} />
          <Route path="login" element={<LoginLayout />}>
            <Route index element={<LogIn />} />
          </Route>
          <Route path="retos" element={<RetosPublic />} />
          <Route path="retos/inforetos" element={<RetosInfo />} />
          <Route path="solidario" element={<TorneoSolidario />} />
          <Route path="equipos" element={<EquiposPublic />} />
          <Route path="equipos/infoequipos/:nombre" element={<InfoEquipos />} />
          <Route path="torneo/horario" element={<Horarios />} />
          <Route path="torneo/fase-final" element={<FaseFinal />} />
          <Route path="torneo/reglamento" element={<Reglamento />} />
          <Route path="torneo/clasificacion" element={<Clasificacion />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path="/administrador" element={<AdminLayout />}>
          <Route index element={<AdministradorInicio />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="actas" element={<Actas />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="jugadores" element={<Jugadores />} />
          <Route path="donaciones" element={<Donaciones />} />
          <Route path="inscripciones" element={<Inscripciones />} />
        </Route>

        <Route path="/director" element={<ActasDirector />} />
        <Route path="/entrenador" element={<Entrenador />} />
        <Route path="/periodista" element={<Periodista />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppEnrutador;
