import { useEffect, useState } from "react";

import style from "../../styles/Tablas.module.css";
import modal from "../../styles/Modal.module.css";
import boton from "../../styles/Botones.module.css";

export default function Pendientes({ data }) {
    const [modalActivo, setModalActivo] = useState(false);
    const [turnosPendiente, setTurnosPendientes] = useState([]);
    const [idTurno, setIdTurno] = useState(null);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;

    useEffect(() => {
        setTurnosPendientes(data);
    }, [setTurnosPendientes, data])

    function abrirModal(id) {
        setIdTurno(id);
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

        const resObtenerMail = await fetch("http://localhost:3000/api/obtenerEmailDeTurnos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: idTurno
        });
        const direccionMail = await resObtenerMail.json();

        const data = {
            motivo: motivoFormateado,
            direccionMail: direccionMail[0],
            asunto: "Turno cancelado"
        }
        // ENVIAR MAIL DE CANCELACION
        const consultaEnviarMail = await fetch("http://localhost:3000/api/enviarMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })
        const resEnviarMail = await consultaEnviarMail.json();

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
                fetch("http://localhost:3000/api/obtenerTurnosPendientes")
                .then(res => res.json())
                .then(data => setTurnosPendientes(data))
            }
        })

        setModalActivo(false);
        btnCancelar.disabled = false;
        btnCancelar.classList.remove("desactivado");
        loader.classList.remove("visible");
    }
    function cerrarModal(e) {
        e.preventDefault();
        setModalActivo(false);
    }

    async function cambiarEstado(id) {
        const res = await fetch("http://localhost:3000/api/aceptarTurno", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body: id
        })

        if(res.status === 200) {
            fetch("http://localhost:3000/api/obtenerTurnosPendientes")
                .then(res => res.json())
                .then(data => setTurnosPendientes(data))
        }
    }

    return (
        <>
            <main className="contenedor column alinear-medio">
                <h1>Pendientes</h1>

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
                            </tr>
                        </thead>
                    
                        <tbody className={style.tableBody}>
                            {
                                turnosPendiente.map((turno) => {
                                    const fecha = new Date(turno.fecha);
                                    const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;

                                    const hora = turno.hora.split(":");
                                    const horaFormateada = `${hora[0]}:${hora[1]}`;

                                    return <tr key={turno.idturnos}>
                                        <td>{`${turno.nombre} ${turno.apellido}`}</td>
                                        <td>{fechaFormateada}</td>
                                        <td>{horaFormateada}</td>
                                        <td>{turno.direccion}</td>
                                        <td>{turno.piso}</td>
                                        <td>
                                            <button onClick={()=> cambiarEstado(turno.idturnos)} className={`${style.accionBtn} ${style.aceptar} ${style.accionSecPend}`}>Aceptar</button>
                                            <button onClick={()=> abrirModal(turno.idturnos)} className={`${style.accionBtn} ${style.rechazar} ${style.accionSecPend}`}>Rechazar</button>
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
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/obtenerTurnosPendientes");
    const data = await res.json();
    return { props: { data } };
}