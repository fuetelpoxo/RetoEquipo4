import React from 'react';
import futbolImg from '/public/reglamento/futbol.jpg';
import reglasImg from '/public/reglamento/reglas.png';
import competicionImg from '/public/reglamento/competicion.png';
import clasificacionImg from '/public/reglamento/clasificacion.png';
import copaImg from '/public/reglamento/copa.png';
import tecnicoImg from '/public/reglamento/tecnico.png';
import equipacionesImg from '/public/reglamento/equipaciones.png';
import terrenoImg from '/public/reglamento/terreno.png';
import relojImg from '/public/reglamento/reloj.png';
import salidaImg from '/public/reglamento/salida.png';
import sancionesImg from '/public/reglamento/sanciones.png';
import silbatoImg from '/public/reglamento/silbato.png';
import pelotaImg from '/public/reglamento/pelota.png';
import './Reglamento.css';
function Reglamento() {
    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mb-4 fade-in">Reglamento del Torneo </h1>
                    <div className="text-center">
                        <img src={futbolImg} className="card-img my-4 py-3"
                            style={{ maxWidth: '30%', borderRadius: '10px' }} alt="Futbol" />
                    </div>
                    <div className="container text-center">
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="accordion" id="accordion1">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse1">
                                                <img src={reglasImg} alt="Reglas" className="me-2" />
                                                Reglas de Juego
                                            </button>
                                        </h2>
                                        <div id="collapse1" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion1">
                                            <div className="accordion-body">
                                                Cuando un equipo cometa CUATRO o más faltas acumuladas a lo largo de un
                                                mismo periodo, se concederá un libre directo por faltas acumuladas por cada
                                                falta cometida a partir de la CUARTA y empezando por ella.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion2">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse2">
                                                <img src={competicionImg} alt="Competición" className="me-2" />
                                                Sistema de Competición
                                            </button>
                                        </h2>
                                        <div id="collapse2" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion2">
                                            <div className="accordion-body">
                                                <div className="section-title">1ª Fase (Liga)</div>
                                                <p>
                                                    Los equipos participantes se dividirán en 2 grupos (Grupo A y Grupo B)
                                                    de 5 equipos que se enfrentarán en una liga a una sola vuelta.
                                                </p>
                                                <p>
                                                    La 1ª fase se desarrollará en 5 jornadas, descansando un equipo por
                                                    jornada. Al término de la 1ª fase, el primer y segundo equipo de cada
                                                    grupo se clasificará para la 2ª fase, quedando el resto de equipos
                                                    eliminados.
                                                </p>
                                                <div className="sub-section">
                                                    <strong>Puntuación de los partidos:</strong>
                                                    <p>
                                                        Partido ganado: 3 puntos<br />
                                                        Partido empatado: 1 punto<br />
                                                        Partido perdido: 0 puntos
                                                    </p>
                                                </div>
                                                <div className="sub-section">
                                                    <strong>Duración de los partidos:</strong>
                                                    <p>1 tiempo x 10 minutos a tiempo corrido.</p>
                                                </div>

                                                <p>
                                                    2ª Fase (Eliminatorias y final)
                                                    Las semifinales se emparejarán directamente con los equipos clasificados
                                                    en la primera fase, de la siguiente forma:

                                                    Eliminatoria 1: El primer clasificado del Grupo A se enfrentará al
                                                    segundo clasificado del Grupo B.

                                                    Eliminatoria 2: El primer clasificado del Grupo B se enfrentará al
                                                    segundo clasificado del Grupo A.

                                                    Los vencedores de ambas eliminatorias se enfrentarán en la gran final.

                                                    Duración de los partidos

                                                    2 tiempo x 10 minutos a tiempo corrido.

                                                    Duración de los descansos

                                                    3 min sobre el terreno de juego, no en vestuarios.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion3">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse3">
                                                <img src={clasificacionImg} alt="Clasificación" className="me-2" />
                                                Criterios de Clasificación
                                            </button>
                                        </h2>
                                        <div id="collapse3" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion3">
                                            <div className="accordion-body">
                                                <b>1ª Fase (Liga)</b>
                                                En caso de empate a puntos entre dos o más equipos en la clasificación
                                                final, los criterios que se seguirán para resolver el empate serán los
                                                siguientes:<br />
                                                Empate a puntos entre 2 equipos<br />
                                                1º Resultado particular del enfrentamiento.<br />
                                                2º Golaverage general o diferencia de goles a favor y en contra, teniendo en
                                                cuenta todos los partidos disputados en la 1ª fase.<br />
                                                3º Fair play o menor coeficiente en las sanciones disciplinarias. (Punto
                                                11).<br />
                                                4º Mayor número de goles a favor, teniendo en cuenta todos los partidos de
                                                la 1ª fase<br />
                                                Empate a puntos entre más de 2 equipos<br />

                                                1º Puntos obtenidos en los enfrentamientos particulares.<br />

                                                2º Golaverage particular o diferencia de goles a favor y en contra, teniendo
                                                en cuenta los enfrentamientos particulares entre los equipos implicados.<br />

                                                3º Golaverage general o diferencia de goles a favor y en contra, teniendo en
                                                cuenta todos los partidos disputados en la 1ª fase.<br />

                                                4º Fair play o menor coeficiente en las sanciones disciplinarias. (Punto
                                                11).<br />

                                                5º Mayor número de goles a favor, teniendo en cuenta todos los partidos de
                                                la 1ª fase<br />

                                                <b>2ª Fase (Eliminatorias y final)</b>
                                                Los partidos de la 2ª Fase que finalicen con empate, se decidirán
                                                directamente por el lanzamiento de penaltis según las normas de la FIFA. No
                                                habrá por tanto prórroga.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="accordion" id="accordion4">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse4">
                                                <img src={copaImg} alt="Copa" className="me-2" />
                                                Jugadores y Suplentes
                                            </button>
                                        </h2>
                                        <div id="collapse4" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion4">
                                            <div className="accordion-body">
                                                <p>
                                                    Cada equipo podrá inscribir en el acta del partido a un máximo de 10
                                                    jugadores.<br />
                                                    <b>Zona de sustituciones</b>
                                                    Las zonas de sustituciones se situarán en la línea de banda a la altura
                                                    de los banquillos:<br />
                                                    Estarán ubicadas a 5m de la línea divisoria y con una longitud de 5m. <br />
                                                    Se demarcarán con dos líneas en cada extremo, de 80cm de largo —40cm hacia
                                                    el interior del terreno de juego y 40cm hacia el exterior— y 8cm de
                                                    ancho.<br />

                                                    La zona de sustituciones de un equipo estará ubicada en la mitad del
                                                    terreno de juego defendida por dicho equipo. Los equipos intercambiarán
                                                    la zona de sustitución en la segunda parte del partido.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion5">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse5">

                                                <img src={tecnicoImg} alt="Técnico" className="me-2" />
                                                Número de Técnicos
                                            </button>
                                        </h2>
                                        <div id="collapse5" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion5">
                                            <div className="accordion-body">
                                                <p>
                                                    Cada equipo tendrá, en el banquillo, a un máximo de 2 entrenadores que
                                                    deberán llevar siempre visible la acreditación que les será entregada
                                                    antes del primer partido.<br />

                                                    El primer entrenador será necesariamente un profesor del IES AGL, que
                                                    velará por el buen desarrollo del torneo. El segundo entrenador será
                                                    designado por el primero.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion6">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse6">

                                                <img src={equipacionesImg} alt="Equipaciones" className="me-2" />
                                                Equipaciones
                                            </button>
                                        </h2>
                                        <div id="collapse6" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion6">
                                            <div className="accordion-body">
                                                <p>
                                                    Es obligatorio que todos los miembros de cada equipo tengan en todo
                                                    momento la camiseta y el pantalón oficial del Torneo IES Augusto Cup
                                                    2024 durante los partidos y calentamientos previos a los partidos.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="accordion" id="accordion7">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse7">
                                                <img src={terrenoImg} alt="Terreno" className="me-2" />
                                                Terreno de Juego
                                            </button>
                                        </h2>
                                        <div id="collapse7" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion7">
                                            <div className="accordion-body">
                                                <p>
                                                    Todos los partidos se disputarán en el pabellón Municipal de la Habana
                                                    Vieja
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion8">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse8">
                                                <img src={relojImg} alt="Reloj" className="me-2" />
                                                Puntualidad
                                            </button>
                                        </h2>
                                        <div id="collapse8" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion8">
                                            <div className="accordion-body">
                                                <p>
                                                    Los horarios de los partidos se llevarán con estricta rigurosidad. Los
                                                    equipos deben estar preparados para saltar al terreno de juego, al menos
                                                    con 15 minutos de antelación.<br />

                                                    Si, cuando vaya a comenzar un partido uno de los dos equipos no se
                                                    hubiera presentado y la organización entendiera que no hay una causa que
                                                    justificara dicha incomparecencia, el partido podrá darse por perdido al
                                                    equipo infractor por un resultado de 3-0. La decisión siempre recaerá
                                                    sobre el Comité de Competición.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion9">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse9">
                                                <img src={salidaImg} alt="Salida" className="me-2" />
                                                Salida de Juego
                                            </button>
                                        </h2>
                                        <div id="collapse9" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion9">
                                            <div className="accordion-body">
                                                <p>
                                                    En la segunda fase, además de los 15 minutos de anteleción, los equipos
                                                    deberán situarse en la zona indicada por la organización, 5 minutos
                                                    antes del comienzo de cada partido, preparados para salir desfilando
                                                    junto al árbitro del partido. Una vez que estén los dos equipos
                                                    colocados, aplaudirán a la grada. Después de ello y tras la señal del
                                                    árbitro, saldrán en dos filas detrás de éste y antes de realizar el
                                                    sorteo de campo, el equipo que aparezca en segundo lugar en los
                                                    calendarios pasará a saludar primero al árbitro, y luego, a los
                                                    jugadores del otro equipo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="accordion" id="accordion10">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse10">

                                                <img src={sancionesImg} alt="Sanciones" className="me-2" />
                                                Sanciones
                                            </button>
                                        </h2>
                                        <div id="collapse10" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion10">
                                            <div className="accordion-body">
                                                <p>
                                                    <b>Amonestaciones</b>
                                                    <p>
                                                        El jugador que a lo largo del torneo acumule dos tarjetas amarillas,
                                                        será suspendido para el siguiente encuentro. Estas tarjetas son
                                                        acumulables durante todo el torneo y no se anularán en la siguiente
                                                        fase, excepto para la final. Únicamente llegando a la final, no tiene en
                                                        cuenta la acumulación de tarjetas amarillas.
                                                    </p>

                                                    <b>Expulsiones</b>
                                                    <p>
                                                        La expulsión de un jugador será castigada siempre, incluso en cualquiera
                                                        de las finales. En caso de empate y como uno de los criterios
                                                        clasificatorios, la acumulación de tarjetas tendrá un valor negativo a
                                                        la hora de clasificarse (Fair Play), teniendo un valor de:
                                                    </p>

                                                    <ul>
                                                        <li>1 punto a cada tarjeta amarilla</li>
                                                        <li>2 puntos a una doble tarjeta amarilla</li>
                                                        <li>3 punto por cada tarjeta roja directa</li>
                                                    </ul>

                                                    <p>
                                                        Si un equipo demostrara actitud violenta durante la competición
                                                        (protestas incorrectas a las decisiones arbitrales, enfrentamiento con
                                                        los responsables de los equipos y especialmente con los miembros de la
                                                        organización, etc.) podrá ser automáticamente expulsado de la misma.
                                                    </p>

                                                    <p>
                                                        El entrenador y el capitán de cada equipo serán responsables de la
                                                        actitud y comportamiento de sus jugadores hacia los árbitros,
                                                        compañeros, adversarios, público, organización y materiales de las
                                                        instalaciones deportivas (vestuarios, banquillos, terrenos de juego...).
                                                    </p>

                                                    <p>
                                                        La organización inspeccionará los vestuarios antes y después de cada
                                                        partido con cada delegado de equipo para certificar que dichos
                                                        vestuarios se utilizan de una manera correcta. A su vez éste, firmará
                                                        que en caso de producirse cualquier deterioro bien sea en banquillos,
                                                        vestuarios o terreno de juego, el delegado, el equipo y la persona que
                                                        produzca dichos deterioros o destrozos se hará responsable de ellos.
                                                    </p>

                                                    <b>Número mínimo de jugadores/as</b>
                                                    <p>
                                                        El número mínimo de jugadores por equipo para comenzar un partido es de
                                                        5 jugadores.
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion11">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse11">
                                                <img src={silbatoImg} alt="Silbato" className="me-2" />
                                                Árbitros
                                            </button>
                                        </h2>
                                        <div id="collapse11" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion11">
                                            <div className="accordion-body">
                                                <p>
                                                    Todos los partidos serán dirigidos por los árbitros colegiados.
                                                    El árbitro y el Coordinador del Torneo Deportivo, serán la máxima
                                                    autoridad en el terreno de juego.
                                                    Ambos tendrán la potestad de detener o suspender un partido en caso de
                                                    ver actitudes antideportivas en uno o los dos equipos,
                                                    o comportamientos inadecuados en el público que puedan interferir en el
                                                    buen desarrollo del partido y del torneo.
                                                    Tanto el resultado final del encuentro, como la resolución disciplinaria
                                                    de los hechos será labor del Comité de Competición.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="accordion" id="accordion12">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse12">
                                                <img src={pelotaImg} alt="Pelota" className="me-2" />
                                                Balones
                                            </button>
                                        </h2>
                                        <div id="collapse12" className="accordion-collapse collapse"
                                            data-bs-parent="#accordion12">
                                            <div className="accordion-body">
                                                <p>
                                                    Todos los partidos se jugarán con balones de talla 4, con una
                                                    circuferencia de 62 cm y un peso de entre 400 y 440 gr.

                                                    La organización dejará 1 balón a cada equipo para el calentamiento
                                                    previo al partido.<br />

                                                    Los equipos pueden traer sus propios balones para realizar ejercicios de
                                                    calentamiento.

                                                    No se permite calentar con balones en la zona de pabellón, debiendo
                                                    hacerlo en el exterior del mismo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reglamento;