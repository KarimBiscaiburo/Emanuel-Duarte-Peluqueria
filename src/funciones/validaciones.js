import alerta from "../styles/Alertas.module.css";

const reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

function validarCampos(objeto) {
    let errores = [];
    let isValid;

    if(objeto.email){
        isValid = reLargo.test(objeto.email);
    } 

    for (let valor in objeto) {
        if (objeto[valor] === "") {
            errores.push(valor);
        }
        if(valor === "email" && objeto[valor] !== "" && !isValid) {
            errores.push("emailInvalido");
        }
    }
    return errores;
}

export function validarFormulario(e) {
    e.preventDefault();
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    const camposInvalidos = validarCampos(data);
    const nuevosErrores = camposInvalidos.filter( dato => dato !== "piso");
    return nuevosErrores;
}

export function devolverErroresHtml(arreglo) {
    const nuevosErrores = arreglo.map( err => {
        if(err === "emailInvalido") {
            const textoError = document.createElement("p");
            textoError.classList.add(`${alerta.alertaError}`);
            textoError.textContent = `!! El campo email es invalido !!`;
            return textoError;

        } else if (err === "repassword") {
            const textoError = document.createElement("p");
            textoError.classList.add(`${alerta.alertaError}`);
            textoError.textContent = `!! El campo repetir contraseña es invalido !!`;
            return textoError;

        } else if (err === "passwordText") {
            const textoError = document.createElement("p");
            textoError.classList.add(`${alerta.alertaError}`);
            textoError.textContent = `!! El campo contraseña es obligatorio !!`;
            return textoError;

        } else {
            const textoError = document.createElement("p");
            textoError.classList.add(`${alerta.alertaError}`);
            textoError.textContent = `!! El campo ${err} es obligatorio !!`;
            return textoError;
        }
    });

    return nuevosErrores;
}

export function limpiarHtml(div) {
    while( div.firstChild ) {
        div.removeChild(div.firstChild);
    }
}
