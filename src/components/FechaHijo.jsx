import style from "../styles/Fecha.module.css";
import useStore from "src/store/store";

function FechaHijo ({index, texto, fechaActivo, setFechaActivo, setHoraTurnos}) {
    const changeFecha = useStore( (state) => state.changeFecha);
    const formato = { day: '2-digit', month: '2-digit'};
    const clase = fechaActivo === index ? `${style.textoFecha} ${style.fechaActivo}` : style.textoFecha;

    function cambiarFecha(e, index) {
        if (fechaActivo === index) {
            return
        } else {
            setFechaActivo(index);
        }

        const anio = new Date().getFullYear();
        const fecha = e.target.textContent;
        const a = fecha.split("/");
        const fechaNueva = `${anio}-${a[1]}-${a[0]}`;
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
        const month = String(fecha.getUTCMonth() + 1);
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

    return(
        <p onClick={(e) => cambiarFecha(e, index)} key={texto} className={clase}>{`${texto.toLocaleDateString('es-ES', formato)}`}</p>
    )
}

export default FechaHijo;