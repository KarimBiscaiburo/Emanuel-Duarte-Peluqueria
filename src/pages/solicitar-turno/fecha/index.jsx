import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import HorarioHijo from "../../../components/HorarioHijo";
import useStore from "@/store/store";
import { useRouter } from "next/router";

import style from "../../../styles/Fecha.module.css";
import boton from "../../../styles/Botones.module.css";
import modal from "../../../styles/Modal.module.css";



export default function Fecha ({ data }) {
    const router = useRouter();
    const store = useStore( (state) => state);
    const usuarios_idusuarios = useStore( (state) => state.idUsuario);
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

    const [horaTurnos, setHoraTurnos] = useState([]);
    const [indexActivo, setIndexActivo] = useState(null);
    const [modalActivo, setModalActivo] = useState(false);

    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const formatoFecha = { day: '2-digit', month: '2-digit'};
    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    
    const { consultaReservas, consultaTurnos } = data;

    useEffect( () => {
        const fechaActual = new Date();
        const hoy = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
        changeFecha(hoy);

        //Toma los horarios de los turnos reservados y los guarda en un arreglo
        const horas = [];
        for(let i = 0; consultaReservas[i]; i++) {
            const arregloHoras = consultaReservas[i].hora.split(":", 2)
            const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
            horas.push(stringHora);
        }
        for(let i = 0; consultaTurnos[i]; i++) {
            const arregloHoras = consultaTurnos[i].hora.split(":", 2)
            const stringHora = `${arregloHoras[0]}:${arregloHoras[1]}`;
            horas.push(stringHora);
        }
        setHoraTurnos(horas)
    }, [setHoraTurnos, consultaReservas, consultaTurnos, changeFecha])
    
    const fechaActual = new Date();
    const fechasSemana = [];

    for (let i = 0; fechasSemana.length !== 7 ; i++) {
        const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + i);
        if (fecha.getDay() !== 0) {
            fechasSemana.push(fecha);
        }
    }

    console.log(store)

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
        setModalActivo(false);
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }
    async function enviarTurno() {
        const datos = {
            usuarios_idusuarios,
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

        const res = await fetch("http://localhost:3000/api/guardarTurno", {
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

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>
            
            <main className="contenedor column alinear-medio">
                <h1>Seleccione una fecha y hora</h1>
                <section className={style.section}>
                    <div id="contenedorFechas" className={style.contenedorFechas}>
                        {
                            fechasSemana.map( i => {
                                return <p key={i} className={style.textoFecha}>{`${i.toLocaleDateString('es-ES', formatoFecha)}`}</p>
                            })
                        }
                        <button onClick={abrirModal} className={style.textoFecha}>+</button>
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
                                    />
                                })
                            }
                        </div>
                    </article>
                </section>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/datos" className={boton.rojo}>Volver</Link>
                    <button onClick={enviarTurno} className={boton.verde}>Confirmar</button>
                </div>
            </main>

            <section className={claseModal}>
                <form className={modal.modalContainer}>
                    <label htmlFor="fecha">Ingrese una fecha</label>
                    <input type="date" name="fecha" id="fecha" />
                    <div>
                        <button onClick={cerrarModal} className={boton.rojoModal}>Cerrar</button>
                        <input onClick={enviarModal} className={boton.verdeModal} type="submit" placeholder="Enviar"/>
                    </div>  
                </form>
            </section>
        </> 
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/obtenerTurnos");
    const data = await res.json();
    return { props: { data } };
}
