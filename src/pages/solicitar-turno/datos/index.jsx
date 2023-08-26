import Head from "next/head";
import Link from "next/link";
import useStore from "src/store/store";
import { solicitarUsuario } from "src/funciones/obtenerDatos";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import input from "../../../styles/Inputs.module.css";
import boton from "../../../styles/Botones.module.css";
import style from "../../../styles/Datos.module.css";

export default function Datos () {
    const router = useRouter();

    const { data: session } = useSession();
    const direccion = useStore( (state) => state.direccion);
    const piso = useStore( (state) => state.piso);
    const celular = useStore( (state) => state.celular);

    const changeDireccion = useStore( (state) => state.changeDireccion);
    const changePiso = useStore( (state) => state.changePiso);
    const changeCelular = useStore( (state) => state.changeCelular);

    useEffect(() => {
        const inputDireccion = document.querySelector("#direccion");
        const inputPiso = document.querySelector("#piso");
        const inputCelular = document.querySelector("#celular");

        if(session?.user) {
            if (direccion || celular || piso) {
                inputDireccion.value = direccion;
                inputPiso.value = piso;
                inputCelular.value = celular;
            } else {
                solicitarUsuario(session?.user)
                    .then(data => {
                        inputDireccion.value = data[0].direccion
                        inputPiso.value = data[0].piso
                        inputCelular.value = data[0].celular
                    })
            }
        }
    })

    function guardarDatos() {
        const inputDireccion = document.querySelector("#direccion").value;
        const inputPiso = document.querySelector("#piso").value;
        const inputCelular = document.querySelector("#celular").value;

        changeDireccion(inputDireccion);
        changePiso(inputPiso);
        changeCelular(inputCelular);
        router.push("/solicitar-turno/fecha");
    }

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>

            <main>
                <div className={`contenedor alinear-medio`}>
                    <form className={"contenedor alinear-medio gp-15 column"}>
                        <div className={style.centrar}>
                            <div className={input.inputBox}>
                                <input id="direccion" placeholder="Direccion" name="direccion" type="text" className={input.inputTexto}/>
                                <span>Dirección</span>
                            </div>
                            <div className={input.inputBox}>
                                <input id="piso" placeholder="Piso" name="piso" type="text" className={input.inputTexto}/>
                                <span>Piso</span>
                            </div>
                            <div className={input.inputBox}>
                                <input id="celular" placeholder="Celular" name="celular" type="number" className={input.inputTexto}/>
                                <span>Celular</span>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/quien" className={boton.rojo}>Volver</Link>
                    <button onClick={guardarDatos} className={boton.verde}>Siguiente</button>
                </div>
            </main>
        </> 
    )
}