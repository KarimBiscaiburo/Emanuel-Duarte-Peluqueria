import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import style from "../../styles/Tablas.module.css";
import modal from "../../styles/Modal.module.css";
import boton from "../../styles/Botones.module.css";

export default function Historial() {
    const { data: session } = useSession();
    const [modalActivo, setModalActivo] = useState(false);
    const [historialTurnos, setHistorialTurnos] = useState([]);
    const [key, setKey] = useState(null);

    useEffect(() => {
        if(session?.user) {
            fetch("http://localhost:3000/api/obtenerTurnosUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: session?.user,
            })
            .then( res => res.json() )
            .then( data => setHistorialTurnos(data) )
        }
    
    }, [session?.user, setHistorialTurnos]);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`

    function abrirModal(id) {
        setKey(id)
        setModalActivo(true);
    }
    async function enviarModal(e) {
        e.preventDefault();
        const btnCancelar = document.querySelector("#cancelarTurno");
        btnCancelar.disabled = true;
        btnCancelar.classList.add("desactivado");

        const motivo = document.querySelector("#motivo").value;
        const motivoFormateado = motivo.trim();

        const loader = document.querySelector("#loader");
        loader.classList.add("visible");

        const consultaTurnoUnico = await fetch("http://localhost:3000/api/obtenerTurnoUnico", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: key
        });
        const resConsulta = await consultaTurnoUnico.json();

        const resfecha = convertirFecha(resConsulta[0].fecha)
        const year = resfecha.getUTCFullYear();
        const month = String(resfecha.getUTCMonth() + 1).padStart(2, '0');
        const day = String(resfecha.getUTCDate()).padStart(2, '0');
        const fechaFormateada = `${day}/${month}/${year}`;

        const textoMail = `El turno de ${resConsulta[0].nombre} ${resConsulta[0].apellido} con fecha ${fechaFormateada} y hora ${resConsulta[0].hora} a sido cancelado debido a "${motivoFormateado}"`;

        const datosMensaje = {
            motivo: textoMail,
            direccionMail: {
                email: "emanuelduarte.estilista@gmail.com"
            },
            asunto: "Turno cancelado"
        }

        const consultaEnviarMail = await fetch("http://localhost:3000/api/enviarMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(datosMensaje)
        })
        const resEnviarMail = await consultaEnviarMail.json();
        
        if(resEnviarMail.accepted) {
            fetch("http://localhost:3000/api/eliminarTurno", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: key
            })
            .then( res => res.json() )
            .then( data => {
                if( data.affectedRows === 1) {
                    fetch("http://localhost:3000/api/obtenerTurnosUsuario", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json" 
                        },
                        body: session?.user,
                    })
                    .then( res => res.json() )
                    .then( data => setHistorialTurnos(data) )
                }
            })
        }

        setModalActivo(false);
        btnCancelar.disabled = false;
        btnCancelar.classList.remove("desactivado");
        loader.classList.remove("visible");
        
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }
    function convertirFecha(cadenaFecha) {
        return new Date(cadenaFecha);
    }

    if( session?.user ) {
        return(
            <>
                <div>
                    <main className="contenedor column alinear-medio">
                        <h1>Historial</h1>
    
                        <div className={style.tableContainer}>
                            <table className={style.table}>
                                <thead className={style.tableHead}>
                                    <tr>
                                        <th>Nombre/Apellido</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Dirección</th>
                                        <th>Piso</th>
                                        <th>Acción</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                            
                                <tbody className={style.tableBody}>
                                    {
                                        historialTurnos.map((turno) => {
                                            const fecha = new Date(turno.fecha);
                                            const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
    
                                            const hora = turno.hora.split(":");
                                            const horaFormateada = `${hora[0]}:${hora[1]}`;
    
                                            const claseEstado = turno.estado.toUpperCase() === "Pendiente".toUpperCase() ? `${style.estado} ${style.pendiente}` : turno.estado.toUpperCase() === "Confirmado".toUpperCase() ? `${style.estado} ${style.confirmado}` : turno.estado.toUpperCase() === "Cancelado".toUpperCase() ? `${style.estado} ${style.cancelado}` : `${style.estado} ${style.finalizado}`;
    
                                            return <tr key={turno.idturnos}>
                                                <td>{`${turno.nombre} ${turno.apellido}`}</td>
                                                <td>{fechaFormateada}</td>
                                                <td>{horaFormateada}</td>
                                                <td>{turno.direccion}</td>
                                                <td>{turno.piso}</td>
                                                <td>
                                                    <Link href={`/reprogramar?id=${turno.idturnos}`} className={`${style.accion} ${style.reprogramar}`}>Reprogramar</Link>
                                                    <button onClick={()=> abrirModal(turno.idturnos)} className={`${style.accionBtn} ${style.cancelar}`}>Cancelar</button>
                                                </td>
                                                <td>
                                                    <p className={claseEstado}>{turno.estado}</p>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </main>
    
                    <section className={claseModal}>
                        <form className={modal.modalContainer}>
                            <label htmlFor="motivo">Ingrese un motivo</label>
                            <textarea name="motivo" id="motivo"></textarea>
                            <div>
                                <button onClick={cerrarModal} className={boton.rojoModal}>Cerrar</button>
                                <input id="cancelarTurno" onClick={enviarModal} className={boton.verdeModal} type="submit" placeholder="Enviar"/>
                            </div>  
                            <svg id="loader" className="loader" viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                            </svg>
                        </form>
                    </section>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

