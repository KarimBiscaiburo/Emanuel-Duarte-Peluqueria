import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "src/store/store";

import style from "../../styles/Tablas.module.css";
import modal from "../../styles/Modal.module.css";
import boton from "../../styles/Botones.module.css";

export default function Historial() {
    const idUsuario = useStore( (state) => state.idUsuario);
    const [modalActivo, setModalActivo] = useState(false);
    const [historialTurnos, setHistorialTurnos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/obtenerTurnosUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: idUsuario,
        })
        .then( res => res.json() )
        .then( data => setHistorialTurnos(data) )
    
    }, [idUsuario, setHistorialTurnos]);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`

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
                                                <Link href="/reprogramar?url=historial" className={`${style.accion} ${style.reprogramar}`}>Reprogramar</Link>
                                                <button onClick={abrirModal} className={`${style.accionBtn} ${style.cancelar}`}>Cancelar</button>
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
                            <input onClick={enviarModal} className={boton.verdeModal} type="submit" placeholder="Enviar"/>
                        </div>  
                    </form>
                </section>
            </div>
        </>
    )
}

