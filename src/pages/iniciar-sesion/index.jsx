import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { signIn } from "next-auth/react";
import useStore from "../../store/store.js";

import style from "../../styles/Iniciar-sesion.module.css";
import input from "../../styles/Inputs.module.css";
import boton from "../../styles/Botones.module.css";
import alerta from "../../styles/Alertas.module.css";

import { devolverErroresHtml, limpiarHtml, validarFormulario } from "@/funciones/validaciones";

export default function IniciarSesion () {
    const router = useRouter();
    const changeIsAuthenticated = useStore( (state) => state.changeIsAuthenticated);
    const changeIsAdmin = useStore( (state) => state.changeIsAdmin);
    const changeIdUsuario = useStore( (state) => state.changeIdUsuario);

    const [isVisible, setIsVisible] = useState(false);
    const isVisibleClass = isVisible ? `${style.mostrarPassword} ${style.passwordVisible}` : `${style.mostrarPassword}`;
    const typeInput = isVisible ? "text" : "password";

    function mostrarPassword() {
        setIsVisible(!isVisible);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const nuevosErrores = validarFormulario(e);

        if(nuevosErrores[0]) {
            mostrarAlerta(nuevosErrores);
            return;
        }
        const data = Object.fromEntries( new FormData(e.target) );
        
        const res = await fetch("http://localhost:3000/api/iniciarSesion" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())    
        .then(data => data);

        if(res === "El correo no existe" || !res) {
            mostrarResultadoError();
            return;
        }

        //const autorizar = await signIn
        

        if(res === "admin") {
            changeIsAuthenticated();
            changeIsAdmin();
            router.push("/");
        } else {
            changeIdUsuario(res);
            changeIsAuthenticated();
            router.push("/");
        }
    }

    function mostrarResultadoError() {
        const divAlerta = document.querySelector("#alerta");
        const btnEnviar = document.querySelector("#enviar");

        const textoError = document.createElement("p");
        textoError.classList.add(`${alerta.alertaError}`);
        textoError.textContent = `!! El mail o la contraseña son incorrectos !!`;
        divAlerta.appendChild(textoError);

        btnEnviar.disabled = true;
    
        setTimeout(() => {
            limpiarHtml(divAlerta)
            btnEnviar.disabled = false;
        }, 3500);
    }

    function mostrarAlerta(arregloErrores) {
        const divAlerta = document.querySelector("#alerta");
        const btnEnviar = document.querySelector("#enviar");

        const erroresHtml = devolverErroresHtml(arregloErrores);
    
        erroresHtml.map( p => {
            divAlerta.appendChild(p);
        })
        btnEnviar.disabled = true;
    
        setTimeout(() => {
            limpiarHtml(divAlerta)
            btnEnviar.disabled = false;
        }, 3500);
    }

    return (
        <>
            <Head>
                <title>Emanuel Duarte - Iniciar Sesión</title>
            </Head>

            <main className={`contenedor alinear-medio column ${style.principal}`}>
                <div className="contenedor alinear-medio">
                    <h1>Iniciar Sesión</h1>
                </div>

                <div className={`contenedor alinear-medio column ${style.iniciarSesion}`}>
                    <form noValidate onSubmit={handleSubmit} className={`contenedor alinear-medio column ${style.formulario}`}>
                        <div className={input.inputBox}>
                            <input placeholder="Email"  name="email" type="email" className={input.inputTexto}/>
                            <span>Email</span>
                        </div>
                        <div className={input.inputBox}>
                            <input placeholder="Contraseña"  name="passwordText" type={typeInput} className={input.inputTexto}/>
                            <span>Contraseña</span>
                            <div onClick={mostrarPassword} className={isVisibleClass}></div>
                        </div>
                        <input 
                            id="enviar"
                            type="submit" 
                            value="Iniciar Sesión" 
                            className={boton.verde}
                        />
                        <div id="alerta" className="w-70"></div>
                    </form>
                    <Link href="/iniciar-sesion/registrarse" className={style.registrarse}>Registrarse</Link>
                </div>

                {/* <Link href="/iniciar-sesion/recuperar" className={style.recuperar}>¿ Olvidaste tu contraseña ?</Link> */}

                <div className="contenedor alinear-izquierda">
                    <Link href="/" className={boton.rojo}>Volver</Link>
                </div>
            </main>
        </>
    )
}

