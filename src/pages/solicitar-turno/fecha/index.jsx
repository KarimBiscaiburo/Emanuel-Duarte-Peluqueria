import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import HorarioHijo from "../../../components/HorarioHijo";
import useStore from "@/store/store";
import { useRouter } from "next/router";

import style from "../../../styles/Fecha.module.css";
import boton from "../../../styles/Botones.module.css";
import modal from "../../../styles/Modal.module.css";



export default function Fecha () {
    const router = useRouter();
    const store = useStore( (state) => state);
    const changeFecha = useStore( (state) => state.changeFecha);
    console.log(store)

    const [indexActivo, setIndexActivo] = useState(null);
    const [modalActivo, setModalActivo] = useState(false);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const turnos = ["12:30", "13:30", "15:00"];

    const formatoFecha = { day: '2-digit', month: '2-digit'};

    const fechaActual = new Date();
    const fechasSemana = [];

    for (let i = 0; i < 8; i++) {
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
    };

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

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>
            
            <main className="contenedor column alinear-medio">
                <h1>Seleccione una fecha</h1>
                <section className={style.section}>
                    <div className={style.contenedorFechas}>
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
                                        turnosSolicitados={turnos}
                                    />
                                })
                            }
                        </div>
                    </article>
                </section>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/datos" className={boton.rojo}>Volver</Link>
                    <Link href="/" className={boton.verde}>Confirmar</Link>
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
