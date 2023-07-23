import { useState } from "react";

import style from "../../styles/Tablas.module.css";
import modal from "../../styles/Modal.module.css";
import boton from "../../styles/Botones.module.css";

export default function Pendientes() {
    const [modalActivo, setModalActivo] = useState(false);

    const claseModal = modalActivo ? `${modal.modal} ${modal.modalActivo}` : `${modal.modal}`;

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
                            <tr>
                                <td>Martin Perez</td>
                                <td>8/6</td>
                                <td>15:30</td>
                                <td>Guemes 3027</td>
                                <td>Octavo A</td>
                                <td>
                                    <button className={`${style.accionBtn} ${style.aceptar} ${style.accionSecPend}`}>Aceptar</button>
                                    <button onClick={abrirModal} className={`${style.accionBtn} ${style.rechazar} ${style.accionSecPend}`}>Rechazar</button>
                                </td>
                            </tr> 
                            <tr>
                                <td>Martin Perez</td>
                                <td>8/6</td>
                                <td>15:30</td>
                                <td>Guemes 3027</td>
                                <td>Octavo A</td>
                                <td>
                                    <button className={`${style.accionBtn} ${style.aceptar} ${style.accionSecPend}`}>Aceptar</button>
                                    <button onClick={abrirModal} className={`${style.accionBtn} ${style.rechazar} ${style.accionSecPend}`}>Rechazar</button>
                                </td>
                            </tr> 
                            <tr>
                                <td>Martin Perez</td>
                                <td>8/6</td>
                                <td>15:30</td>
                                <td>Guemes 3027</td>
                                <td>Octavo A</td>
                                <td>
                                    <button className={`${style.accionBtn} ${style.aceptar} ${style.accionSecPend}`}>Aceptar</button>
                                    <button onClick={abrirModal} className={`${style.accionBtn} ${style.rechazar} ${style.accionSecPend}`}>Rechazar</button>
                                </td>
                            </tr> 
                            
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
    );
}