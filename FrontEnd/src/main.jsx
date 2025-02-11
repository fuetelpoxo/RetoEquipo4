import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppEnrutador from "./routers/AppEnrutadorPublic.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEnrutador />
  </StrictMode>,
)
