import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import useStore from "../../../store/store.js";

import style from "../../../styles/Registrarse.module.css";
import inputs from "../../../styles/Inputs.module.css";
import boton from "../../../styles/Botones.module.css";
import alerta from "../../../styles/Alertas.module.css";

import { devolverErroresHtml, limpiarHtml, validarFormulario } from "src/funciones/validaciones";
import { signIn } from "next-auth/react";

export default function Registrarse () {
    const router = useRouter();
    const changeIsAuthenticated = useStore( (state) => state.changeIsAuthenticated);
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

        const data = Object.fromEntries(
            new FormData(e.target)
        )

        const res = await fetch("http://localhost:3000/api/registrarse" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())    
        .then(data => data);

        if(res === "error") {
            mostrarResultadoError();
        } else {
            const resultadoSignIn = await signIn("credentials", {
                email: data.email,
                password: data.passwordText,
                redirect: false
            })
            changeIsAuthenticated();
            changeIdUsuario(res);
            if(resultadoSignIn?.ok) return router.push("/");
        }
    }

    function mostrarResultadoError() {
        const divAlerta = document.querySelector("#alerta");
        const btnEnviar = document.querySelector("#enviar");

        const textoError = document.createElement("p");
        textoError.classList.add(`${alerta.alertaError}`);
        textoError.textContent = `!! Los datos ingresados son incorrectos o el email ya existe !!`;
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
                <title>Emanuel Duarte - Registrarse</title>
            </Head>
            <main className="contenedor column alinear-medio">
                <h1>Registrarse</h1>

                <form noValidate onSubmit={handleSubmit} className={`contenedor alinear-medio column ${style.formulario}`}>
                    <div className={style.inputBox}>
                        <input name="email" placeholder="Email" type="email" className={inputs.inputTexto}/>
                        <span>Email</span>
                    </div>
                    <div className={style.inputBox}>
                        <input name="passwordText" placeholder="Contraseña" type={typeInput} className={inputs.inputTexto}/>
                        <span>Contraseña</span>
                        <div onClick={mostrarPassword} className={isVisibleClass}></div>
                    </div>
                    <div className={style.inputBox}>
                        <input name="repassword" placeholder="Repetir Contraseña" type={typeInput} className={inputs.inputTexto}/>
                        <span>Repetir Contraseña</span>
                        <div onClick={mostrarPassword} className={isVisibleClass}></div>
                    </div>
                    <div className={style.inputBox}>
                        <input name="nombre" placeholder="Nombre" type="text" className={inputs.inputTexto}/>
                        <span>Nombre</span>
                    </div>
                    <div className={style.inputBox}>
                        <input name="apellido" placeholder="Apellido" type="text" className={inputs.inputTexto}/>
                        <span>Apellido</span>
                    </div>
                    <div className={style.inputBox}>
                        <input name="celular" placeholder="Celular" type="number" className={inputs.inputTexto}/>
                        <span>Celular</span>
                    </div>
                    <div className={style.inputBox}>
                        <input name="direccion" placeholder="Dirección" type="text" className={inputs.inputTexto}/>
                        <span>Dirección</span>
                    </div>
                    <div className={style.inputBox}>
                        <input name="piso" placeholder="Piso" type="text" className={inputs.inputTexto}/>
                        <span>Piso</span>
                    </div>

                    <div className="contenedor alinear-costados">
                        <Link href="/iniciar-sesion" className={boton.rojo}>Volver</Link>
                        <input id="enviar" type="submit" className={boton.verde} value="Confirmar"/>
                    </div>
                    <div id="alerta" className="w-60"></div>
                </form>
            </main>
        </>
    )
}