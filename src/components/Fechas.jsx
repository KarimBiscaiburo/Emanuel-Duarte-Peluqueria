import HorarioHijo from "../components/HorarioHijo";
import useStore from "@/store/store";
import { useState } from "react";

import style from "../styles/Fecha.module.css";

export default function Fechas () {
    const changeFecha = useStore( (state) => state.changeFecha);
    const [indexActivo, setIndexActivo] = useState(null);

    const turnos = ["12:30", "13:30", "15:00"];
    const horario = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const formatoFecha = { day: '2-digit', month: '2-digit'};

    const fechaActual = new Date();
    const fechasSemana = [];

    for (let i = 0; i < 8; i++) {
        const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + i);

        if(i === 0) changeFecha(fecha)

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

    return(
        <>
            <main className="contenedor column alinear-medio">
                <h1>Seleccione una nueva fecha</h1>
                <section className={style.section}>
                    <div className={style.contenedorFechas}>
                        {
                            fechasSemana.map( i => {
                                return <p key={i} className={style.textoFecha}>{`${i.toLocaleDateString('es-ES', formatoFecha)}`}</p>
                            })
                        }
                        <button id="calendario" className={style.textoFecha}>+</button>
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