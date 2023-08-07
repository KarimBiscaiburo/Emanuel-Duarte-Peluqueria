import useStore from "@/store/store";
import { useState } from "react";

import style from "../styles/Fecha.module.css";

export default function Layout({ isActive, onClick, hora, turnosSolicitados, isReservado, setIsReservado }) {
  const changeHora = useStore( (state) => state.changeHora);
  const datoHora = useStore( (state) => state.hora);
  const  claseHijo = isActive ? `${style.horario} ${style.horarioActivo}` : style.horario;

  function revisarHorario(hora) {
    for (let i = 0; i < turnosSolicitados.length; i++) {
        if (turnosSolicitados[i] === hora) {
            return true;
        }
    }
    return false;
  }

  function guardarHorario(e, hora) {

    if(!isReservado) {
      changeHora(hora);
      e.target.classList.add("reservado");
      setIsReservado(true);
    } else {
      if(datoHora === hora) {
        changeHora(null);
        e.target.classList.remove("reservado");
        setIsReservado(false);
      }
    }
  }
  
  return (
    <>
      <div className={claseHijo} >

        <div className={style.horaDiv}>
          <p>{`${hora}:00 HRS`}</p>
          <div onClick={onClick}>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={style.horaDetalle}>

          {
              revisarHorario(`${hora}:00`) ? 
              <div className={`${style.detalleTurno} ${style.solicitado}`}>
                <p>{`${hora}:00 HRS`}</p> 
                <button disabled></button>
              </div>
              : 
              <div className={style.detalleTurno}>
                <p>{`${hora}:00 HRS`}</p> 
                <button onClick={(e) => guardarHorario(e ,`${hora}:00`)}></button>
              </div>
          }

          {
              revisarHorario(`${hora}:30`) ? 
              <div className={`${style.detalleTurno} ${style.solicitado}`}>
                <p>{`${hora}:30 HRS`}</p> 
                <button disabled></button>
              </div>
              : 
              <div className={style.detalleTurno}>
                <p>{`${hora}:30 HRS`}</p> 
                <button onClick={(e) => guardarHorario(e, `${hora}:30`)}></button>
              </div>
          }
        </div>
      </div>
    </>
  )
}