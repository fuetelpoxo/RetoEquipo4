import React, { useState, useEffect } from 'react';
import { getJugadores } from '../../models/JugadorModel';
import { getEquipos } from '../../models/EquipoModel';
import { getDonaciones } from '../../models/DonacionModel';
import Loading from '../../components/Loading';

const RenderCard = React.memo(({ title, value, icon, unit }) => (
  <div className="col-md-6 col-lg-3">
    <div className="card bg-dark text-white h-100">
      <div className="card-body text-center">
        <h3 className="card-title">
          <i className={`fa ${icon} me-2`}></i>
          {title}
        </h3>
        <p className="card-text display-4">
          {typeof value === 'number' ? value.toFixed(2) : value}
        </p>
        {unit && <p className="text-muted">{unit}</p>}
      </div>
    </div>
  </div>
));

function AdminInicio() {
  const [resumen, setResumen] = useState({
    totalJugadores: 0,
    totalEquipos: 0,
    totalKilos: 0,
    totalImporte: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [jugadores, equipos, donaciones] = await Promise.all([
          getJugadores(),
          getEquipos(),
          getDonaciones()
        ]);

        // Asegurarse de que jugadores es un array antes de usar length
        const totalJugadores = Array.isArray(jugadores) ? jugadores.length : 0;
        const totalEquipos = Array.isArray(equipos) ? equipos.length : 0;

        // Calcular totales con comprobación de existencia
        setResumen({
          totalJugadores,
          totalEquipos,
          totalKilos: donaciones?.reduce((sum, d) => sum + (parseFloat(d.kilos) || 0), 0) || 0,
          totalImporte: donaciones?.reduce((sum, d) => sum + (parseFloat(d.importe) || 0), 0) || 0
        });
      } catch (err) {
        console.error("Error detallado:", err);
        setError("Error al cargar los datos del panel");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger m-3">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Panel de Administración</h1>
      <div className="row g-4">
        <RenderCard 
          title="Jugadores"
          value={resumen.totalJugadores}
          icon="fa-users"
        />
        <RenderCard 
          title="Equipos"
          value={resumen.totalEquipos}
          icon="fa-shield"
        />
        <RenderCard 
          title="Kilos Donados"
          value={resumen.totalKilos}
          icon="fa-balance-scale"
          unit="kg"
        />
        <RenderCard 
          title="Donaciones"
          value={resumen.totalImporte}
          icon="fa-money"
          unit="euros"
        />
      </div>
    </div>
  );
}

export default React.memo(AdminInicio);
