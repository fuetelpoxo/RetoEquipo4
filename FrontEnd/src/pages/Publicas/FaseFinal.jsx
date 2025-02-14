import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EquiposService from '../../core/EquiposService';

function FaseFinal() {
    const location = useLocation();
    const [equipos, setEquipos] = useState(null);

    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await EquiposService.obtenerEquipos();

            const ordenarEquipos = (equipos) => {
                return equipos.sort((a, b) => {
                    if (b.puntos !== a.puntos) return b.puntos - a.puntos;
                    const diferenciaGolesA = a.golesFavor - a.golesContra;
                    const diferenciaGolesB = b.golesFavor - b.golesContra;
                    if (diferenciaGolesB !== diferenciaGolesA) return diferenciaGolesB - diferenciaGolesA;
                    if (a.tarjetasAmarillas !== b.tarjetasAmarillas) return a.tarjetasAmarillas - b.tarjetasAmarillas;
                    return b.golesFavor - a.golesFavor;
                });
            };

            const tabla1Ordenada = ordenarEquipos([...data.tabla1]);
            const tabla2Ordenada = ordenarEquipos([...data.tabla2]);

            setEquipos({
                equipo1: tabla1Ordenada[0], // 1º Tabla 1
                equipo2: tabla1Ordenada[1], // 2º Tabla 1
                equipo3: tabla2Ordenada[1], // 2º Tabla 2
                equipo4: tabla2Ordenada[0], // 1º Tabla 2
                resultadoSemi1: "TBC",
                resultadoSemi2: "TBC",
                resultadoFinal: "TBC",
                ganadorSemi1: null,
                ganadorSemi2: null
            });
        };

        obtenerEquipos();
    }, []);

    if (!equipos) return <p>Cargando equipos...</p>;

    const renderEquipo = (equipo) => (equipo ? equipo.nombre : "TBC");

    const renderResultado = (resultado) => {
        return resultado ? resultado : "0 a 0 de momento";
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '90px' }}>
            <div className="w-100">
                <h1 className="text-center mb-4 text-danger">Fase Final</h1>

                <div className="d-flex justify-content-center">
                    {/* Semifinal 1 */}
                    <div className="col-md-4 text-center mb-4 d-flex flex-column align-items-stretch">
                        <div className="card mb-3 border-dark flex-grow-1">
                            <h3 className="text-white bg-danger p-2 rounded">Semifinal 1</h3>
                            <div className="card-body bg-dark text-white">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.equipo1)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderResultado(equipos.resultadoSemi1)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.equipo3)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                        <h2 className="text-white">vs</h2>
                    </div>

                    {/* Semifinal 2 */}
                    <div className="col-md-4 text-center mb-4 d-flex flex-column align-items-stretch">
                        <div className="card mb-3 border-dark flex-grow-1">
                            <h3 className="text-white bg-danger p-2 rounded">Semifinal 2</h3>
                            <div className="card-body bg-dark text-white">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.equipo2)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderResultado(equipos.resultadoSemi2)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.equipo4)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final */}
                <div className="d-flex justify-content-center mt-5">
                    <div className="col-md-6 text-center d-flex flex-column align-items-stretch">
                        <h3 className="text-white bg-danger p-2 rounded">Final</h3>
                        <div className="card mb-3 border-dark flex-grow-1">
                            <div className="card-body bg-dark text-white">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.ganadorSemi1)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderResultado(equipos.resultadoFinal)}</h5>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{renderEquipo(equipos.ganadorSemi2)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaseFinal;
