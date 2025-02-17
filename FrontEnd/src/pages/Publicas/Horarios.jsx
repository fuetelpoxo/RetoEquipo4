import React, { useEffect, useState } from 'react';

function Horarios() {
    const [partidos, setPartidos] = useState({
        finales: [],
        semifinales: [],
        tabla1: [],
        tabla2: [],
        otroGrupo: []
    });

    useEffect(() => {
        const obtenerPartidos = async () => {
            try {
                const response = await fetch('URL_DE_TU_API'); // Reemplaza 'URL_DE_TU_API' con la URL correcta
                if (!response.ok) {
                    throw new Error('Error en la carga de partidos');
                }
                const data = await response.json(); // Convertimos la respuesta a JSON
                setPartidos(data); // Asignamos los datos a los estados
            } catch (error) {
                console.error('Error al obtener los partidos:', error);
            }
        };

        obtenerPartidos();
    }, []);

    const renderCard = (partidos, titulo) => (
        <div className="col-md-12 mb-5">
            <div className="border">
                <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">{titulo}</h2>
                <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                    {/* Cabecera de los campos */}
                    <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                        <div className="col text-center">Partido</div>
                        <div className="col text-center">Fecha</div>
                        <div className="col text-center">Hora</div>
                        <div className="col text-center">Equipo 1</div>
                        <div className="col text-center">Equipo 2</div>
                    </div>
                    {/* Partidos ordenados */}
                    {partidos.length === 0 ? (
                        <div className="row text-center">
                            <div className="col-12">Cargando partidos...</div>
                        </div>
                    ) : (
                        partidos.map((partido, index) => (
                            <div key={index} className="row mb-3" style={{ gap: '10px', marginTop: '20px' }}>
                                <div className="col text-center d-flex flex-column align-items-center">
                                    <span>{partido.partido}</span>
                                </div>
                                <div className="col text-center d-flex flex-column align-items-center">
                                    <span>{partido.fecha}</span>
                                </div>
                                <div className="col text-center d-flex flex-column align-items-center">
                                    <span>{partido.hora}</span>
                                </div>
                                <div className="col text-center d-flex flex-column align-items-center">
                                    <span>{partido.equipo1}</span>
                                </div>
                                <div className="col text-center d-flex flex-column align-items-center">
                                    <span>{partido.equipo2}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="container mt-5">
                {renderCard(partidos.finales, 'Horarios de las Finales')}
                {renderCard(partidos.semifinales, 'Horarios de las Semifinales')}
                {renderCard(partidos.tabla1, 'Tabla 1')}
                {renderCard(partidos.tabla2, 'Tabla 2')}
            </div>
        </>
    );
}

export default Horarios;
