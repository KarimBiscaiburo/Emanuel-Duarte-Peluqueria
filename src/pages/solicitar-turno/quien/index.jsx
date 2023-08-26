'use client';

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "src/store/store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import style from "../../../styles/Quien.module.css";
import input from "../../../styles/Inputs.module.css";
import boton from "../../../styles/Botones.module.css";
import { solicitarUsuario } from "src/funciones/obtenerDatos";

export default function Quien () {
    const router = useRouter();
    const [cambio, setCambio] = useState(false);
    const [detallesAlguienActivo, setDetallesAlguien] = useState(false);

    const { data: session } = useSession();
    const changeNombre = useStore( (state) => state.changeNombre);
    const changeApellido = useStore( (state) => state.changeApellido);

    const handleCambio = () => setCambio(!cambio);

    function guardarQuien() {
        const inputParaMi = document.querySelector("#paraMi").checked;
        const inputParaAlguien = document.querySelector("#paraAlguien").checked;
        const inputNombre = document.querySelector("#nombre");
        const inputApellido = document.querySelector("#apellido");

        if(!inputParaMi && !inputParaAlguien) {
            return;
        }

        if(inputParaMi) {
            solicitarUsuario(session?.user)
                .then( data => {
                    changeNombre(data[0].nombre);
                    changeApellido(data[0].apellido);
                    router.push("/solicitar-turno/datos");
                })
        } else {
            changeNombre(inputNombre.value);
            changeApellido(inputApellido.value);
            router.push("/solicitar-turno/datos");
        }
    }
    
    useEffect(() => {
        const inputparaMi = document.querySelector("#paraMi");
        const inputParaAlguien = document.querySelector("#paraAlguien");

        if (inputparaMi.checked) { 
            if(detallesAlguienActivo) {
                setDetallesAlguien(!detallesAlguienActivo);
            }
        } else if (inputParaAlguien.checked) {
            if(!detallesAlguienActivo) {
                setDetallesAlguien(!detallesAlguienActivo);
            }
        }

    }, [cambio, detallesAlguienActivo]) 

    const claseDetallesAlguien = `contenedor alinear-medio column gp-15 ${style.detalles} ${detallesAlguienActivo ? style.activo : ""}`;
    const claseFormInputSegundo = `${style.formInput} ${detallesAlguienActivo ? style.formInputActivo : ""}`;

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Turno</title>
            </Head>
            
            <main>
                <div className="contenedor alinear-medio">
                    <h1>Para quien es ?</h1>
                </div>

                <div className={`contenedor alinear-medio ${style.quien}`}>
                    <form className={style.formulario}>
                        <div id="formInputPrimero" className={style.formInput}>
                            <div className={style.seleccionar}>
                                <label htmlFor="paraMi" className={input.labelTexto}>Para mi</label>
                                <input 
                                    id="paraMi" 
                                    type="radio" 
                                    name="grupo" 
                                    className={style.formCheck}
                                    onClick={handleCambio}
                                />
                            </div>
                        </div>
                        <div id="formInputSegundo" className={claseFormInputSegundo}>
                            <div className={style.seleccionar}>
                                <label htmlFor="paraAlguien" className={input.labelTexto}>Para alguien mas</label>
                                <input 
                                    id="paraAlguien" 
                                    type="radio" 
                                    name="grupo" 
                                    className={style.formCheck}
                                    onClick={handleCambio}
                                />
                            </div>
                            <div id="detallesAlguien" className={claseDetallesAlguien}>
                                <input 
                                    id="nombre"
                                    type="text" 
                                    placeholder="Nombre" 
                                    name="nombre" 
                                    className={input.inputTexto}
                                />
                                <input 
                                    id="apellido"
                                    type="text" 
                                    placeholder="Apellido" 
                                    name="apellido" 
                                    className={input.inputTexto}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="contenedor alinear-costados">
                    <Link href="/solicitar-turno/descripcion" className={boton.rojo}>Volver</Link>
                    <button onClick={guardarQuien} className={boton.verde}>Siguiente</button>
                </div>
            </main>
        </> 
    )
}