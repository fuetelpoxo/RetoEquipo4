import React from "react";
import Recaudacion from '/recaudacion.png';
import JugadorTorneo from '/jugadorTorneo.png';
import Donacion from '/donacion.png';

function TorneoSolidario() {
    return (
        <>
            <div className="contenedorPrincipal container border mt-4 p-4" style={{ borderColor: 'red' }}>
                <h2 className="tituloInicial text-center fw-bold text-danger">Torneo Solidario</h2>
                <div className="text-center">
                    <img src={JugadorTorneo} className="w-30" alt="Jugador Torneo" />
                </div>
                <div className="card mb-4 mt-2 border-danger">
                    <div className="titulos card-header bg-danger text-white">
                        <h4>Objetivos</h4>
                    </div>
                    <div className="card-body">
                        <p>
                            Cada equipo, patrocinado por al menos una empresa (que pondrá un mínimo de 100€ para Cruz Roja),
                            recaudará dinero y alimentos de primera necesidad. Cruz Roja aportará unas cajas donde depositar
                            los alimentos, que serán llevados a sus instalaciones. Informaremos sobre lo recaudado e indicaremos
                            cómo realizar donaciones a la iniciativa creada.
                        </p>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <div>
                            <h5 className="fw-bold d-inline text-danger">Recaudación</h5>
                            <img src={Recaudacion} className="w-5 ms-2" alt="Recaudación" />
                        </div>
                        <div className="border border-danger p-3 bg-light">
                            <p>
                                Se “disputará” el Torneo Solidario, de manera paralela a la celebración del Torneo Deportivo.
                                Los mismos equipos que participan en el Torneo Deportivo tratarán de convertirse en el equipo
                                campeón del Torneo Solidario. Para conseguirlo, deberán ser capaces de recaudar la
                                mayor cantidad de alimentos posibles. Pero no solamente a través de las donaciones de los componentes del equipo,
                                si no que sus compañeros de clase, sus amistades y sus familiares podrán también colaborar con ellos para alzarse
                                con el trofeo al equipo campeón del Torneo Solidario. Este trofeo será entregado por las autoridades invitadas a presenciar el evento.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="fw-bold d-inline text-danger">Donaciones</h5>
                        <img src={Donacion} className="w-5 ms-2" alt="Donaciones" />
                        <div className="border border-danger p-3 bg-light">
                            <p>
                                ¿Te gustaría contribuir? Fácil, acércate a nuestro pabellón deportivo y trae alimentos no perecederos y
                                ayúdanos a llenar las cestas de donación. Durante el evento, estaremos recogiendo alimentos
                                para apoyar a las familias necesitadas de nuestra comunidad.
                                Tu generosidad hará posible que aquellos que enfrentan dificultades
                                tengan acceso a alimentos nutritivos y básicos.
                                ¡Cada kilo suma! Si prefieres apoyarnos económicamente,
                                ¡no te preocupes! Nuestros compañeros del IES Peñacastillo
                                han preparado alimentos y bebidas saludables que estarán disponibles durante la celebración del Torneo Deportivo.
                                Por cada compra que realices, estarás contribuyendo directamente a nuestra causa. Desde deliciosas barritas energéticas
                                hasta bebidas refrescantes, cada adquisición ayudará a alcanzar el objetivo de desarrollo sostenible hambre cero.
                                ¡Compra con conciencia y ayuda a alimentar a quienes más lo necesitan!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="card mb-4">
                        <div className="tituloPatrocinador card-header bg-danger text-white">
                            <h4>Patrocinadores</h4>
                        </div>
                        <div className="row g-3 p-3">
                            {["Patrocinador 1", "Patrocinador 2", "Patrocinador 3", "Patrocinador 4"].map((patrocinador, index) => (
                                <div key={index} className="contImg border p-3 col-md-3 text-center">
                                    <img src="https://via.placeholder.com/150" className="img-thumbnail border-danger" alt={patrocinador} />
                                    <p className="mt-2 text-danger fw-bold">{patrocinador}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TorneoSolidario;