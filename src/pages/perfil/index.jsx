import { useEffect } from "react";
import { useSession } from "next-auth/react";

import style from "../../styles/Perfil.module.css";
import input from "../../styles/Inputs.module.css";
import boton from "../../styles/Botones.module.css";
import alerta from "../../styles/Alertas.module.css";   

import { solicitarUsuario } from "src/funciones/obtenerDatos";
import { devolverErroresHtml, limpiarHtml, validarFormulario } from "src/funciones/validaciones";

export default function Perfil() {
    const { data: session } = useSession();

    async function handleSubmit(e) {
        e.preventDefault();
        const nuevosErrores = validarFormulario(e);

        if(nuevosErrores[0]) {
            mostrarAlerta(nuevosErrores);
            return;
        }

        const data = Object.fromEntries( new FormData(e.target) );
        data.nombre = data.nombre[0].toUpperCase() + data.nombre.substring(1);
        data.apellido = data.apellido[0].toUpperCase() + data.apellido.substring(1);
        data.id = session?.user;

        const res = await fetch("http://localhost:3000/api/guardarPerfil" , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            mostrarGuardado();
        }
        else {
            mostrarAlerta(["Hubo un error al guardar los datos, por favor verifique los datos"], true);
        }
    }

    function mostrarGuardado() {
        const divAlerta = document.querySelector("#errores");
        const btnEnviar = document.querySelector("#enviar");

        btnEnviar.classList.add("desactivado");

        const textoError = document.createElement("p");
        textoError.classList.add(`${alerta.alertaCorrecto}`);
        textoError.textContent = `!! Cambios guardados correctamente !!`;
        divAlerta.appendChild(textoError);

        setTimeout(() => {
            limpiarHtml(divAlerta);
        }, 3500);
    }

    function mostrarAlerta(arregloErrores, verificar = false) {
        const divAlerta = document.querySelector("#errores");
        const btnEnviar = document.querySelector("#enviar");

        if (verificar) {
            const textoError = document.createElement("p");
            textoError.classList.add(`${alerta.alertaError}`);
            textoError.textContent = `${arregloErrores[0]}`;
            divAlerta.appendChild(textoError);

            setTimeout(() => {
                limpiarHtml(divAlerta);
            }, 3500);
        } else {
            const erroresHtml = devolverErroresHtml(arregloErrores);
    
            erroresHtml.map( p => {
                divAlerta.appendChild(p);
            })
            btnEnviar.disabled = true;
        
            setTimeout(() => {
                limpiarHtml(divAlerta);
                btnEnviar.disabled = false;
            }, 3500);
        }
    }   

    useEffect(() => {
        const nombreInput = document.querySelector("#nombre");
        const apellidoInput = document.querySelector("#apellido");
        const emailInput = document.querySelector("#email");
        const celularInput = document.querySelector("#celular");
        const direccionInput = document.querySelector("#direccion");
        const pisoInput = document.querySelector("#piso");

        const btnEnviar = document.querySelector("#enviar");

        if(session?.user) {
            solicitarUsuario(session?.user)
                .then(data => {
                    nombreInput.value = data[0].nombre;
                    apellidoInput.value = data[0].apellido;
                    emailInput.value = data[0].email;
                    celularInput.value = data[0].celular;
                    direccionInput.value = data[0].direccion;
                    pisoInput.value = data[0].piso;
                })
    
            btnEnviar.classList.add("desactivado");
        }
    })  

    function activarBtn() {
        const btnEnviar = document.querySelector("#enviar");
        btnEnviar.classList.remove("desactivado");
    }

    return(
        <>
            <main className="contenedor alinear-medio">
                <form id="formulario" noValidate onSubmit={handleSubmit} className={`contenedor alinear-medio column border ${style.formulario}`}>
                    <div className={style.formDetalles}>
                        <div>
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="nombre" placeholder="Nombre" name="nombre" type="text" className={input.inputTexto}/>
                                <span>Nombre</span>
                            </div>
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="apellido" placeholder="Apellido" name="apellido" type="text" className={input.inputTexto}/>
                                <span>Apellido</span>
                            </div>
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="email" placeholder="Email" name="email" type="email" className={input.inputTexto}/>
                                <span>Email</span>
                            </div>
                        </div>
                        <div>
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="celular" placeholder="Celular" name="celular" type="number" className={input.inputTexto}/>
                                <span>Celular</span>
                            </div>
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="direccion" placeholder="Dirección" name="direccion" type="text" className={input.inputTexto}/>
                                <span>Dirección</span>
                            </div>  
                            <div className={input.inputBox}>
                                <input onChange={activarBtn} id="piso" placeholder="Piso" name="piso" type="text" className={input.inputTexto}/>
                                <span>Piso</span>
                            </div>
                        </div>
                    </div>
                    <div id="errores" className={alerta.divAlerta}></div>
                    <div className="contenedor alinear-medio column">
                        <p className={style.parrafo}>!!! Estos datos se cargaran automaticamente al pedir un turno !!!</p>

                        <input id="enviar" type="submit" value="Guardar" className={boton.verde}/>
                    </div>
                </form>
            </main>
        </>
    )
}