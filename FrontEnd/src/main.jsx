import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppEnrutador from "./routers/AppEnrutador.jsx";
import { AuthProvider } from './context/UserContext.jsx'; // Importa el AuthProvider
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/reglamento.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Envuelve tu aplicación con AuthProvider */}
      <AppEnrutador />
    </AuthProvider>
  </StrictMode>,
);
