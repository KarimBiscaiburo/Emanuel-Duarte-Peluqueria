import useStore from "src/store/store";

import style from "../styles/Fecha.module.css";

export default function Layout({ isActive, onClick, hora, turnosSolicitados, reservar = false, setModalReservaActivo = null }) {
  const changeHora = useStore( (state) => state.changeHora);
  const datoHora = useStore( (state) => state.hora);
  const datoFecha = useStore( (state) => state.fecha);
  const claseHijo = isActive ? `${style.horario} ${style.horarioActivo}` : style.horario;

  function revisarHorario(hora) {
    for (let i = 0; i < turnosSolicitados.length; i++) {
        if (turnosSolicitados[i] === hora) {
            return true;
        }
    }
    return false;
  }
  
  function guardarHorario(hora) {
    changeHora(hora);
    //esto solo se ejecuta cuando admin va a reservar un usuario (evita que se ejecute en otras ventanas)
    if (reservar) {
      mostrarModalReserva(hora);
    }
  }
  function mostrarModalReserva(hora) {
    setModalReservaActivo(true);
    const pFecha = document.querySelector("#fechaModal");
    const pHora = document.querySelector("#horaModal");

    const fechaArreglo = datoFecha.split("-");
    const fechaFormateada = `${fechaArreglo[2]}/${fechaArreglo[1]}/${fechaArreglo[0]}`;
    
    pFecha.textContent = fechaFormateada;
    pHora.textContent = `${hora} HRS`;
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
                <button onClick={() => guardarHorario(`${hora}:00`)}></button>
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
                <button onClick={() => guardarHorario(`${hora}:30`)}></button>
              </div>
          }
        </div>
      </div>
    </>
  )
}