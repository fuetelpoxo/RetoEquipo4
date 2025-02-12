import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from '../pages/Publicas/LogIn.jsx';
import AppLayout from '../layouts/AppLayout.jsx';
import Inicio from '../pages/Publicas/Inicio.jsx';
import Torneo from '../pages/Publicas/Torneo.jsx';
import Horarios from '../pages/Publicas/Horarios.jsx';
import FaseFinal from '../pages/Publicas/FaseFinal.jsx';
import RetosInfo from '../pages/Publicas/RetosInfo.jsx';
import Reglamento from '../pages/Publicas/Reglamento.jsx';
import InfoEquipos from '../pages/Publicas/InfoEquipos.jsx';
import Inscripcion from '../pages/Publicas/Inscripcion.jsx';
import RetosPublic from '../pages/Publicas/RetosPublic.jsx';
import EquiposPublic from '../pages/Publicas/EquiposPublic.jsx';
import TorneoSolidario from '../pages/Publicas/TorneoSolidario.jsx';
import Clasificacion from '../pages/Publicas/Clasificacion.jsx';
import Patrocinadores from '../pages/Publicas/Patrocinadores.jsx';
import Objetivos from '../pages/Publicas/Objetivos.jsx';

function AppEnrutador() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={< Inicio />} />
                    <Route path="login" element={< LogIn />} />
                    <Route path="torneo" element={< Torneo />} />
                    <Route path="retos" element={< RetosPublic />} />
                    <Route path="retos/inforetos" element={< RetosInfo />} />
                    <Route path="solidario" element={< TorneoSolidario />} />
                    <Route path="solidario/patrocinadores" element={< Patrocinadores />} />
                    <Route path="solidario/objetivos" element={< Objetivos />} />
                    <Route path="equipos" element={< EquiposPublic />} />
                    <Route path="equipos/infoequipos" element={< InfoEquipos />} />
                    <Route path="equipos/inscripcion" element={< Inscripcion />} />
                    <Route path="torneo/horario" element={< Horarios />} />
                    <Route path="torneo/fase-final" element={< FaseFinal />} />
                    <Route path="torneo/reglamento" element={< Reglamento />} />
                    <Route path="torneo/clasificacion" element={< Clasificacion />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default AppEnrutador;
