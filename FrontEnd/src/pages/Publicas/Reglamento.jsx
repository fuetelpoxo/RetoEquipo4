import React from 'react';
import Futbol from '/futbol.jpg';

function Reglamento() {
    return (
        <>
            <div className="container-fluid my-5 ">
                <div className="row">
                    {/* Sidebar de navegación */}
                    <div className="col-md-3" style={{ position: "sticky", top: 0, height: "100vh", marginTop: '30px' }}>
                        <h5 className="ms-2" style={{ fontSize: "25px" }}>Ménu</h5> {/* Mover h5 a la derecha */}
                        <aside>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento active" aria-current="page" href="#reglas-juego">Reglas de juego</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#sistema-competicion">Sistema de competición</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#criterios-clasificacion">Criterios de clasificación</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#jugadores-suplentes">Número de jugadores y suplentes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#tecnicos">Número de técnicos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#equipaciones">Equipaciones</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#terreno-juego">Terreno de juego</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#puntualidad">Puntualidad</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#salida-juego">Salida del terreno de juego</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#sanciones">Sanciones</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#arbitros">Árbitros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-reglamento" href="#balones">Balones</a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    {/* Contenido principal */}
                    <div className="col-md-9" style={{ marginTop: '30px' }}>
                        <h1 className="text-center mb-4 fade-in">Reglamento del Torneo </h1>
                        {/* Poner imagen al centro */}
                        <div className="text-center">
                            <img src={Futbol} className="card-img my-4 py-3" style={{ maxWidth: "40%", borderRadius: "10px" }} alt="..." />
                        </div>
                        {/* Reglas de juego */}
                        <div id="reglas-juego" className="card mb-4" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.726)" }}>
                            <div className="card-header">
                                <h3>Reglas de Juego</h3>
                            </div>
                            <div className="card-body">
                                <p>El Torneo de Fútbol se rige por las normas de la FIFA y de la RFEF, con una única salvedad: cuando un equipo cometa CUATRO o más faltas acumuladas a lo largo de un mismo periodo, se concederá un libre directo por faltas acumuladas por cada falta cometida a partir de la CUARTA y empezando por ella.</p>
                            </div>
                        </div>
                        {/* Sistema de competición */}
                        <div id="sistema-competicion" className="card mb-4">
                            <div className="card-header">
                                <h3>Sistema de Competición</h3>
                            </div>
                            <div className="card-body">
                                <h5>1ª Fase (Liga)</h5>
                                <p>Los equipos se dividen en dos grupos (Grupo A y Grupo B) de 5 equipos cada uno. Se enfrentarán en una liga a una sola vuelta, con 5 jornadas, descansando un equipo por jornada. Al final de esta fase, el primer y segundo equipo de cada grupo avanzan a la 2ª fase.</p>
                                <h5>Puntuación de los partidos</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Partido ganado: 3 puntos.</li>
                                    <li className="list-group-item">Partido empatado: 1 punto.</li>
                                    <li className="list-group-item">Partido perdido: 0 puntos.</li>
                                </ul>
                                <h5>Duración de los partidos</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">1 tiempo de 10 minutos a tiempo corrido.</li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <h5>2ªFase (Eliminatorias y final)</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Eliminatoria 1: El primer clasificado del Grupo A se enfrentará al segundo clasificado del Grupo B.</li>
                                    <li className="list-group-item"> Eliminatoria 2: El primer clasificado del Grupo B se enfrentará al segundo clasificado del Grupo A.</li>
                                </ul>
                            </div>
                        </div>
                        {/* Criterios de clasificación */}
                        <div id="criterios-clasificacion" className="card mb-4">
                            <div className="card-header">
                                <h3>Criterios de clasificación</h3>
                            </div>
                            <div className="card-body">
                                <h5>1ª Fase (Liga)</h5>
                                <h6>En caso de empate a puntos entre equipos:</h6>
                                <ul className="list-group">
                                    <li className="list-group-item">1. Resultado particular del enfrentamiento.</li>
                                    <li className="list-group-item">2. Golaverage general (diferencia de goles).</li>
                                    <li className="list-group-item">3. Fair play (menor coeficiente en sanciones).</li>
                                    <li className="list-group-item">4. Mayor número de goles a favor.</li>
                                </ul>
                                <h6>Empate a puntos entre más de 2 equipos:</h6>
                                <ul className="list-group">
                                    <li className="list-group-item">1. Puntos obtenidos en enfrentamientos particulares.</li>
                                    <li className="list-group-item">2. Golaverage particular.</li>
                                    <li className="list-group-item">3. Golaverage general.</li>
                                    <li className="list-group-item">4. Fair play.</li>
                                    <li className="list-group-item">5. Mayor número de goles a favor.</li>
                                </ul>
                                <div className="card-boy">
                                    <h5>2ª Fase (Eliminatorias y  final)</h5>
                                    <p>Los partidos de la 2ª Fase que finalicen con empate, se decidirán directamente por el lanzamiento de penaltis según las normas de la FIFA. No habrá por tanto prórroga</p>
                                </div>
                            </div>
                        </div>
                        {/* Número de Jugadores y Suplentes */}
                        <div id="jugadores-suplentes" className="card mb-4">
                            <div className="card-header">
                                <h3>Número de Jugadores y Suplentes</h3>
                            </div>
                            <div className="card-body">
                                <p>Cada equipo podrá inscribir hasta 10 jugadores. Las sustituciones se realizarán en cualquier momento, con los jugadores saliendo e ingresando en la zona de sustituciones.</p>
                            </div>
                        </div>
                        {/* Número de técnicos */}
                        <div id="tecnicos" className="card mb-4">
                            <div className="card-header">
                                <h3>Número de Técnicos</h3>
                            </div>
                            <div className="card-body">
                                <p>Cada equipo tendrá un máximo de 2 entrenadores. El primer entrenador debe ser un profesor del IES Miguel Herrero, y todos los técnicos deberán portar su acreditación visible.</p>
                            </div>
                        </div>
                        {/* Equipaciones */}
                        <div id="equipaciones" className="card mb-4">
                            <div className="card-header">
                                <h3>Equipaciones</h3>
                            </div>
                            <div className="card-body">
                                <p>Es obligatorio que todos los miembros de cada equipo tengan en todo momento la camiseta y el pantalón oficial del Torneo</p>
                            </div>
                        </div>
                        {/* Terreno de juego */}
                        <div id="terreno-juego" className="card mb-4">
                            <div className="card-header">
                                <h3>Terreno de juego</h3>
                            </div>

                            <div className="card-body">
                                <p>Todos los partidos se disputarán en el pabellón de La Habana Vieja</p>
                            </div>
                        </div>
                        {/* Puntualidad */}
                        <div id="puntualidad" className="card mb-4">
                            <div className="card-header">
                                <h3>Puntualidad</h3>
                            </div>
                            <div className="card-body">
                                <p>Los horarios de los partidos se llevarán con estricta rigurosidad. Los equipos deben estar preparados para saltar al terreno de juego, al menos con 15 minutos de antelación</p>
                                <p>Si, cuando vaya a comenzar un partido uno de los dos equipos no se hubiera presentado y la organización entendiera que no hay una causa que justificara dicha incomparecencia, el partido podrá darse por perdido al equipo infractor por un resultado de 3-0. La decisión siempre recaerá sobre el Comité de Competición.</p>
                            </div>
                        </div>
                        {/* Salida de juego */}
                        <div id="salida-juego" className="card mb-4">
                            <div className="card-header">
                                <h3>Salida de Juego</h3>
                            </div>
                            <div className="card-body">
                                <p>En la segunda fase, además de los 15 minutos de antelación, los equipos deberán situarse en la zona indicada por la organización, 5 minutos antes del comienzo de cada partido, preparados para salir desfilando junto al árbitro del partido. Una vez que estén los dos equipos colocados, aplaudirán a la grada. Después de ello y tras la señal del árbitro, saldrán en dos filas detrás de éste y antes de realizar el sorteo de campo, el equipo que aparezca en segundo lugar en los calendarios pasará a saludar primero al árbitro, y luego, a los jugadores del otro equipo.</p>
                            </div>
                        </div>

                        <div id="sanciones" className="card mb-4">
                            <div className="card-header">
                                <h3>Sanciones</h3>
                            </div>
                            <div className="card-body">
                                <h5>Amonestaciones</h5>
                                <p>El jugador que a lo largo del torneo acumule dos tarjetas amarillas, será suspendido para el siguiente encuentro. Estas tarjetas son acumulables durante todo el torneo y no se anularán en la siguiente fase, excepto para la final. Únicamente llegando a la final, no tiene en cuenta la acumulación de tarjetas amarillas.</p>
                                <h5>Expulsiones</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">1 punto a cada tarjeta amarilla</li>
                                    <li className="list-group-item">2 puntos a una doble tarjeta amarilla</li>
                                    <li className="list-group-item">3 puntos por cada tarjeta roja directa</li>
                                </ul>
                                <p>Si un equipo demostrara actitud violenta durante la competición (protestas incorrectas a las decisiones arbitrales, enfrentamiento con los responsables de los equipos y especialmente con los miembros de la organización, etc.) podrá ser automáticamente expulsado de la misma</p>
                            </div>

                            <div className="card-body">

                                <h5>Número mínimo de jugadores/as</h5>
                                <p>El número mínimo de jugadores por equipo para comenzar un partido es de 5 jugadores.</p>
                                <p>Si durante la disputa del partido, un equipo se quedase de forma permanente (sin contar las exclusiones temporales) con menos de 5 jugadores, se dará el partido por finalizado con el resultado de 3-0 a favor del equipo adversario</p>
                            </div>
                        </div>
                        <div id="arbitros" className="card mb-4">
                            <div className="card-header">
                                <h3>Árbitros</h3>
                            </div>
                            <div className="card-body">
                                <p>Todos los partidos serán dirigidos por los árbitros colegiados. El árbitro y el Coordinador del Torneo Deportivo, serán la máxima autoridad en el terreno de juego. Ambos tendrán la potestad de detener o suspender un partido en caso de ver actitudes antideportivas en uno o los dos equipos, o comportamientos inadecuados en el público que puedan interferir en el buen desarrollo del partido y del torneo. Tanto el resultado final del encuentro, como la resolución disciplinaria de los hechos será labor del Comité de Competición.</p>
                            </div>
                        </div>
                        <div id="balones" className="card mb-4">
                            <div className="card-header">
                                <h3>Balones</h3>
                            </div>
                            <div className="card-body">
                                <p>Todos los partidos se jugarán con balones de talla 4, con una circunferencia de 62 cm y un peso de entre 400 y 440 gr. La organización dejará 1 balón a cada equipo para el calentamiento previo al partido. Los equipos pueden traer sus propios balones para realizar ejercicios de calentamiento. No se permite calentar con balones en la zona de pabellón, debiendo hacerlo en el exterior del mismo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Reglamento;
