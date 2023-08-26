import Head from "next/head";
import Link from "next/link";
import useStore from "../../../store/store.js";
import { useRouter } from "next/router.js";

import style from "../../../styles/Descripcion.module.css";
import input from "../../../styles/Inputs.module.css";
import boton from "../../../styles/Botones.module.css";

export default function Descripcion () {
    const router = useRouter();
    const changeDescripcion = useStore( (state) => state.changeDescripcion);

    function guardarDescripcion() {
        const descripcion = document.querySelector("#descripcion").value;
        const descripcionFormateada = descripcion.trim();
        changeDescripcion(descripcionFormateada)
        router.push("/solicitar-turno/quien");
    }

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>

            <main>
                <div className="contenedor alinear-medio">
                    <h1>Descripción</h1>
                </div>

                <div className={`contenedor alinear-medio ${style.descripcion}`}>
                    <form className="contenedor column alinear-medio gp-15">
                        <label htmlFor="descripcion" className={input.labelTexto}>No es obligatorio</label>
                        <textarea 
                            name="descripcion"
                            maxLength="400"
                            id="descripcion" 
                            className={style.descTexto} 
                            placeholder="Algun comentario que quiera agregar sobre el corte, color o cualquier cosa que considere relevante tener en cuenta a la hora de recibir el servicio"
                        ></textarea>
                    </form>
                </div>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/servicio" className={boton.rojo}>Volver</Link>
                    <button onClick={guardarDescripcion} className={boton.verde}>Siguiente</button>
                </div>
            </main>
        </> 
    )
}