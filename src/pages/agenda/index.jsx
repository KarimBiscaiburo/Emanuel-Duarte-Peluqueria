import Head from "next/head";
import { useEffect, useState } from "react";
import HorarioHijo from "../../components/HorarioHijo";
import useStore from "src/store/store";

import style from "../../styles/Fecha.module.css";
import boton from "../../styles/Botones.module.css";
import modal from "../../styles/Modal.module.css";
import FechaHijo from "src/components/FechaHijo";

export default function Agenda ({ data }) {
    const store = useStore( (state) => state);
    const fecha = useStore( (state) => state.fecha);
    const hora = useStore( (state) => state.hora);
    const changeFecha = useStore( (state) => state.changeFecha);

    const [horaTurnos, setHoraTurnos] = useState([]);
    const [indexActivo, setIndexActivo] = useState(null);
    const [fechaActivo, setFechaActivo] = useState(0);
    const [modalActivo, setModalActivo] = useState(false);
    const [modalReservaActivo, setModalReservaActivo] = useState(false);

    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    const modalReserva = modalReservaActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    const claseCalendario = fechaActivo === 20 ? `${style.textoFecha} ${style.fechaActivo}` : style.textoFecha;
    
    const { consultaReservas, consultaTurnos } = data;

    useEffect( () => {
        const fechaActual = new Date();
        const hoy = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
        let stringFecha;
        if(hoy.getDay() === 0) {
            stringFecha = `${hoy.getFullYear()}-${String(hoy.getUTCMonth() + 1).padStart(2, '0')}-${hoy.getDate() + 1}`;
            changeFecha(`${hoy.getFullYear()}-${String(hoy.getUTCMonth() + 1).padStart(2, '0')}-${hoy.getDate() + 1}`);
        } else {
            stringFecha = `${hoy.getFullYear()}-${String(hoy.getUTCMonth() + 1).padStart(2, '0')}-${hoy.getDate()}`;
            changeFecha(`${hoy.getFullYear()}-${String(hoy.getUTCMonth() + 1).padStart(2, '0')}-${hoy.getDate()}`);
        }
        const fechaConvertida = convertirFecha(stringFecha);
        const fechaComparar = formatearFecha(fechaConvertida);
    
        //Toma los horarios de los turnos reservados y los guarda en un arreglo
        const horas = [];
        for(let i = 0; consultaReservas[i]; i++) {
            const fechaFormateada = convertirFecha(consultaReservas[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha == fechaComparar) {
                
                const arregloHoras = consultaReservas[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        for(let i = 0; consultaTurnos[i]; i++) {
            const fechaFormateada = convertirFecha(consultaTurnos[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha === fechaComparar) {
                const arregloHoras = consultaTurnos[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        function formatearFecha(fecha) {
            const year = fecha.getUTCFullYear();
            const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
            const day = String(fecha.getUTCDate());
            return `${year}-${month}-${day}`;
        }
        function convertirFecha(cadenaFecha) {
            return new Date(cadenaFecha);
        }
        setHoraTurnos(horas);
    }, [setHoraTurnos, consultaReservas, consultaTurnos, changeFecha]);
    
    const fechaActual = new Date();
    const fechasSemana = [];

    for (let i = 0; fechasSemana.length !== 7 ; i++) {
        const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + i);
        if (fecha.getDay() !== 0) {
            fechasSemana.push(fecha);
        }
    }
    function handleClick(index) {
        if (indexActivo === index) {
            setIndexActivo(null);
        } else {
            setIndexActivo(index);
        }
    }
    function abrirModal() {
        setModalActivo(true);
    }
    function enviarModal(e) {
        e.preventDefault();
        setFechaActivo(20); 

        const fechaValor = document.querySelector("#fecha").value;
        const fechaElegida = new Date(fechaValor);
        const hoy = new Date();

        if (fechaElegida.getDay() === 6) {
            mostrarErrorModal("Fecha invalida");
            return;
        }

        if (fechaElegida >= hoy) {
            cambiarHorarios(fechaValor); 
            setModalActivo(false);
        } else {
            mostrarErrorModal("Fecha invalida");
            return;
        }
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }
    function cerrarReservaModal() {
        setModalReservaActivo(false);
        console.log(store)
        /* SOLUCIONAR: 
            CUANDO RECHAZO UNA ACEPTACION DE RESERVA COMO QUE SE ROMPE Y NO DEJA VOLVERA APRETAR OTROS HORARIOS
            CUANDO SE GUARDA UNA RESERVA NO ACTUALIZA BIEN LOS NUEVOS DATOS (EL PROBLEMA ES EL TIPO DE STRING EN LAS FECHAS)
        */
    }
    function aceptarReserva() {
        console.log(store)
        setModalReservaActivo(false);
        const data = {
            fecha,
            hora
        }
        fetch("http://localhost:3000/api/guardarReserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( () => {
                actualizarHorarios(fecha);
            })
    }
    function mostrarErrorModal(msj) {
        const formularioModal = document.querySelector("#formularioModal");
        const parrafo = document.createElement("P");
        parrafo.textContent = msj;
        parrafo.classList.add(`${style.modalError}`);

        formularioModal.appendChild(parrafo);
        setTimeout(() => {
            parrafo.remove();
        }, 3000);
    }
    function cambiarHorarios(fecha){
        const fechaFormateada = convertirFecha(fecha)
        const nuevaFecha = formatearFecha(fechaFormateada);
        // const a = fecha.split("/");
        // const fechaNueva = `${a[0]}-${a[1]}-${a[2]}`;
        changeFecha(nuevaFecha);
        actualizarHorarios(nuevaFecha);
    }
    async function actualizarHorarios(fecha) {
        const data = await buscarDatos();
        const { consultaReservas, consultaTurnos } = data;
        const horas = [];
        const fechaConvertida = convertirFecha(fecha);
        const fechaComparar = formatearFecha(fechaConvertida);

        for(let i = 0; consultaReservas[i]; i++) {
            const fechaFormateada = convertirFecha(consultaReservas[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha == fechaComparar) {
                const arregloHoras = consultaReservas[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        for(let i = 0; consultaTurnos[i]; i++) {
            const fechaFormateada = convertirFecha(consultaTurnos[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha === fechaComparar) {
                const arregloHoras = consultaTurnos[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        setHoraTurnos(horas);
    }
    function formatearFecha(fecha) {
        const year = fecha.getUTCFullYear();
        const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
        const day = String(fecha.getUTCDate());
        return `${year}-${month}-${day}`;
    }
    function convertirFecha(cadenaFecha) {
        return new Date(cadenaFecha);
    }
    async function buscarDatos() {
        const res = await fetch("http://localhost:3000/api/obtenerTurnos");
        const data = await res.json();
        return data;
    }

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>
            
            <main id="contenido" className="contenedor column alinear-medio">
                <h1>Agenda</h1>
                <section className={style.section}>
                    <div id="contenedorFechas" className={style.contenedorFechas}>
                        {
                            fechasSemana.map( (i, index) => {
                                return <FechaHijo
                                    key={i}
                                    index={index}
                                    texto={i}
                                    fechaActivo={fechaActivo}
                                    setFechaActivo={setFechaActivo}
                                    setHoraTurnos={setHoraTurnos}
                                />
                            })
                        }
                        <button id="calendario" onClick={abrirModal} className={claseCalendario}>+</button>
                    </div>
                    <article className={style.contenedorHorarios}>
                        <div id="horarios" className={style.horarios}>
                            { 
                                horario.map((hora, index) => {
                                    return <HorarioHijo
                                        key={index}
                                        isActive={indexActivo === index}
                                        onClick={() => handleClick(index)}
                                        hora={hora}
                                        turnosSolicitados={horaTurnos}
                                        reservar={true}
                                        setModalReservaActivo={setModalReservaActivo}
                                    />
                                })
                            }
                        </div>
                    </article>
                </section>
            </main>

            <section className={claseModal}>
                <form id="formularioModal" className={modal.modalContainer}>
                    <label htmlFor="fecha">Ingrese una fecha</label>
                    <input type="date" name="fecha" id="fecha" />
                    <div>
                        <button onClick={cerrarModal} className={boton.rojoModal}>Cerrar</button>
                        <input onClick={enviarModal} className={boton.verdeModal} type="submit" placeholder="Enviar"/>
                    </div>  
                </form>
            </section>

            <section className={modalReserva}>
                <div className={modal.modalContainer}>
                    <p className={style.reservaTitulo}>Quieres reservar esta fecha y hora?</p>
                    <div className={style.modalReservaParrafos}>
                        <p id="fechaModal"></p>
                        <p id="horaModal"></p>
                    </div>
                    <div className={style.modalReservaBotones}>
                        <button className={boton.rojo} onClick={cerrarReservaModal}>Rechazar</button>
                        <button className={boton.verde} onClick={aceptarReserva}>Aceptar</button>
                    </div>
                </div>
            </section>

        </> 
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/obtenerTurnos");
    const data = await res.json();
    return { props: { data } };
}
