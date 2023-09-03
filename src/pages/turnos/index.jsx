import Link from "next/link";
import { useEffect, useState } from "react";

import style from "../../styles/Tablas.module.css";
import modal from "../../styles/Modal.module.css";
import boton from "../../styles/Botones.module.css";

export default function Turnos({ data }) {
    const [modalActivo, setModalActivo] = useState(false);
    const [turnos, setTurnos] = useState([]);
    const [idTurno, setIdTurno] = useState(null);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;
    useEffect(() => {
        setTurnos(data);
    }, [setTurnos, data])

    function abrirModal(id) {
        setIdTurno(id)
        setModalActivo(true);
    }
    function enviarModal(e) {
        e.preventDefault();

        fetch("http://localhost:3000/api/eliminarTurno", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
            body: idTurno
        })
        .then( res => res.json() )
        .then( data => {
            if( data.affectedRows === 1) {
                fetch("http://localhost:3000/api/obtenerSoloTurnos")
                .then(res => res.json())
                .then(data => setTurnos(data))
            }
        })

        setModalActivo(false);
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }

    return(
        <>
            <main className="contenedor column alinear-medio">
                <h1>Turnos</h1>

                <div className={`${style.tableContainer} ${style.computadora}`}>

                    <table className={style.table}>
                        <thead className={style.tableHead}>
                            <tr>
                                <th>Nombre/Apellido</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Dirección</th>
                                <th>Piso</th>
                                <th>Celular</th>
                                <th>Descripción</th>
                                <th>Acción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                    
                        <tbody className={style.tableBody}>
                            {
                                turnos.map((turno) => {
                                    const fecha = new Date(turno.fecha);
                                    const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;

                                    const hora = turno.hora.split(":");
                                    const horaFormateada = `${hora[0]}:${hora[1]}`;

                                    const claseEstado = turno.estado.toUpperCase() === "Pendiente".toUpperCase() ? `${style.estado} ${style.pendiente}` : `${style.estado} ${style.confirmado}`;

                                    return <tr key={turno.idturnos}>
                                        <td>{`${turno.nombre} ${turno.apellido}`}</td>
                                        <td>{fechaFormateada}</td>
                                        <td>{horaFormateada}</td>
                                        <td>{turno.direccion}</td>
                                        <td>{turno.piso}</td>
                                        <td>{turno.celular}</td>
                                        <td>{turno.descripcion}</td>
                                        <td>
                                            <Link href="/reprogramar?url=turnos" className={`${style.accion} ${style.reprogramar}`}>Reprogramar</Link>
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
                        <input onClick={enviarModal} className={boton.verdeModal} type="submit" placeholder="Enviar"/>
                    </div>  
                </form>
            </section>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/obtenerSoloTurnos");
    const data = await res.json();
    return { props: { data } };
}