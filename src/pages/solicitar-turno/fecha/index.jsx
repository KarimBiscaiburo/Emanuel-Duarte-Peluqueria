"use client"
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import HorarioHijo from "../../../components/HorarioHijo";
import useStore from "src/store/store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import style from "../../../styles/Fecha.module.css";
import boton from "../../../styles/Botones.module.css";
import modal from "../../../styles/Modal.module.css";
import FechaHijo from "src/components/FechaHijo";

export default function Fecha ({ data }) {
    const router = useRouter();
    const servicio = useStore( (state) => state.servicio);
    const descripcion = useStore( (state) => state.descripcion);
    const nombre = useStore( (state) => state.nombre);
    const apellido = useStore( (state) => state.apellido);
    const direccion = useStore( (state) => state.direccion);
    const piso = useStore( (state) => state.piso);
    const celular = useStore( (state) => state.celular);
    const fecha = useStore( (state) => state.fecha);
    const hora = useStore( (state) => state.hora);
    const changeFecha = useStore( (state) => state.changeFecha);
    const { data: session } = useSession();

    const [horaTurnos, setHoraTurnos] = useState([]);
    const [indexActivo, setIndexActivo] = useState(null);
    const [fechaActivo, setFechaActivo] = useState(0);
    const [modalActivo, setModalActivo] = useState(false);
    const [modalGuardarHora, setModalGuardarHora] = useState(false);

    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    const claseModalGuardarHora = modalGuardarHora ? `${modal.modalGuardarHora} ${modal.modalGuardarHoraActivo}` : `${modal.modalGuardarHora}`;
    const claseCalendario = fechaActivo === 20 ? `${style.textoFecha} ${style.fechaActivo}` : style.textoFecha
    
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
    
        //Toma los horarios de los turnos reservados y los guarda en un arreglo
        const horas = [];
        for(let i = 0; consultaReservas[i]; i++) {
            const fechaFormateada = convertirFecha(consultaReservas[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha == stringFecha) {
                
                const arregloHoras = consultaReservas[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        for(let i = 0; consultaTurnos[i]; i++) {
            const fechaFormateada = convertirFecha(consultaTurnos[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha === stringFecha) {
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
        setFechaActivo(20)

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
            return
        }
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }
    async function enviarTurno() {
        const errores = []
        const datos = {
            usuarios_idusuarios: session.user,
            fecha,
            hora,
            descripcion,
            nombre,
            apellido,
            celular,
            direccion,
            piso,
            servicio
        }
        if(fecha === null || hora === null || nombre === null || apellido === null || celular === null || direccion === null || servicio === null) {
            if(fecha === null) { errores.push("No se ha seleccionado una fecha")}
            if(hora === null) { errores.push("No se ha seleccionado una hora")}
            if(nombre === null) { errores.push("No se ha ingresado un nombre")}
            if(apellido === null) { errores.push("No se ha ingresado un apellido")}
            if(celular === null) { errores.push("No se ha ingresado un celular")}
            if(direccion === null) { errores.push("No se ha definido una dirección")}
            if(servicio === null) { errores.push("No se ha seleccionado un servicio")}
            mostrarDatosFaltantes(errores);
            return;
        }
        fetch("http://localhost:3000/api/guardarTurno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(datos)
        })
        .then(res => res.json()) 
        .then(data => console.log(data));

        router.push("/?turno=enviado");
    }
    function mostrarDatosFaltantes(errores) {
        const btn = document.querySelector("#enviarTurno");
        const contenido = document.querySelector("#contenido");
        const div = document.createElement("DIV");
        errores.forEach(error => {
            const texto = document.createElement("P");
            texto.classList.add(`${style.textoDatosFaltantes}`);
            texto.textContent = error;
            div.appendChild(texto);
        });
        contenido.appendChild(div);
        btn.disabled = true;

        setTimeout(() => {
            div.remove();
            btn.disabled = false;
        }, 5000);
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
        const a = fecha.split("-");
        const fechaNueva = `${a[0]}-${a[1]}-${a[2]}`;
        changeFecha(fechaNueva);
        actualizarHorarios(fechaNueva);
    }
    async function actualizarHorarios(fecha) {
        const data = await buscarDatos();
        const { consultaReservas, consultaTurnos } = data;
        const horas = [];

        for(let i = 0; consultaReservas[i]; i++) {
            const fechaFormateada = convertirFecha(consultaReservas[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha == fecha) {
                const arregloHoras = consultaReservas[i].hora.split(":", 2)
                const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
                horas.push(stringHora);
            }
        }
        for(let i = 0; consultaTurnos[i]; i++) {
            const fechaFormateada = convertirFecha(consultaTurnos[i].fecha)
            const nuevaFecha = formatearFecha(fechaFormateada);
            if(nuevaFecha === fecha) {
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
        const day = String(fecha.getUTCDate()).padStart(2, '0');
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
                <h1>Seleccione una fecha y hora</h1>
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
                                        guardarHora={true}
                                        setModalGuardarHora={setModalGuardarHora}
                                    />
                                })
                            }
                        </div>
                    </article>
                </section>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/datos" className={boton.rojo}>Volver</Link>
                    <button id="enviarTurno" onClick={enviarTurno} className={boton.verde}>Confirmar</button>
                </div>
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

            <div className={claseModalGuardarHora}>
                <p id="parrafoModalGuardarHora"></p>
            </div>

            {/* UN MODAL LATERAL CHIQUITO PARA QUE CUANDO SELECCIONE UNA FECHA SE DESPLIEGUE (AL HORARIO HIJO LE PASA UN TRUE COMO ALGUN PROP PARA QUE EN HORARIOHIJO HAGA COMO EN AGENDA, ES DECIR, QUE CUANDO HAGA CLICK SE ACTIVE EL MODAL DE ESTA SECCION) */}
        </> 
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/obtenerTurnos");
    const data = await res.json();
    return { props: { data } };
}
