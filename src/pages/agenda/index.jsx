import { useState } from "react";
import HorarioHijo from "../../components/HorarioHijo";

import style from "../../styles/Fecha.module.css";

export default function Agenda() {
    const [indexActivo, setIndexActivo] = useState(null);

    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const turnos = ["12:30", "13:30", "15:00"];

    const formatoFecha = { day: '2-digit', month: '2-digit'};

    const fechaActual = new Date();
    const fechasSemana = [];
    fechasSemana.push(fechaActual);

    for (let i = 1; i <= 6; i++) {
        let fechaSiguiente = new Date(fechaActual);
        fechaSiguiente.setDate(fechaActual.getDate() + i);
        fechasSemana.push(fechaSiguiente);
    }

    function handleClick(index) {
        if (indexActivo === index) {
            setIndexActivo(null);
        } else {
            setIndexActivo(index);
        }
    };
    

    return(
        <>
            <main className="contenedor column alinear-medio">
                <h1>Agenda</h1>
                <section className={style.section}>
                    <div className={style.contenedorFechas}>
                        {
                            fechasSemana.map( i => {
                                return <p key={i} className={style.textoFecha}>{`${i.toLocaleDateString('es-ES', formatoFecha)}`}</p>
                            })
                        }
                        <button className={style.textoFecha}>+</button>
                    </div>
                    <article className={style.contenedorHorarios}>
                        <div className={style.horarios}>
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

            </main>
        </>
    )
}