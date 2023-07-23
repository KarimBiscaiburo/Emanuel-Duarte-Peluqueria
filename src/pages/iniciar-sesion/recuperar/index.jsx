import Head from "next/head";
import Link from "next/link";

import inputs from "../../../styles/Inputs.module.css";
import boton from "../../../styles/Botones.module.css";

export default function Recuperar () {

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Recuperar</title>
            </Head>

            <main className="contenedor alinear-medio column">
                <h1>Ingrese el email de su cuenta</h1>

                <form className="contenedor alinear-medio column">
                    <input type="email" placeholder="Email" className={inputs.inputTexto}/>

                    <div className="contenedor alinear-derecha">
                        <button className={boton.verde}>Verificar</button>
                    </div>

                    <div className="contenedor alinear-medio column gp-10">
                        <input type="password" placeholder="Contraseña" className={inputs.inputTexto}/>
                        <input type="password" placeholder="Repetir Contraseña" className={inputs.inputTexto}/>
                    </div>

                    <div className="contenedor alinear-costados">
                        <Link href="/iniciar-sesion" className={boton.rojo}>Volver</Link>
                        <input type="submit" value="Guardar" className={boton.verde}/>
                    </div>
                </form>

                

            </main>
        </>
    )
}