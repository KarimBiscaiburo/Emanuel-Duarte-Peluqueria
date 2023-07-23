import { pool } from "../../db/db.js";
import bcrypt from "bcryptjs";

function verificarCorreo(email) {
    return new Promise((resolve, reject) => {
      const consultaUsuario = pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
      const consultaAdmin = pool.query("SELECT * FROM admin");
  
      Promise.all([consultaUsuario, consultaAdmin])
        .then(([result1, result2]) => {
          resolve({
            consultaUsuario: result1,
            consultaAdmin: result2
          });
        })
        .catch(error => {
          reject(new Error("Error al ejecutar las consultas: " + error.message));
        });
    });
}

function comprobarPassword(passwordHash, passwordText) {
    return bcrypt.compare(passwordText, passwordHash);
}

const iniciarSesion = async  (req, res) => {
    const { email, passwordText } = req.body;

    verificarCorreo(email)
        .then(resultados => {
            if(resultados.consultaUsuario[0][0] || resultados.consultaAdmin[0][0]) {
                if(resultados.consultaUsuario[0][0]){
                    comprobarPassword(resultados.consultaUsuario[0][0].password, passwordText)
                        .then( isValid => {
                            if (isValid) {
                                res.status(200).json(resultados.consultaUsuario[0][0].idusuarios);
                            } else {
                                res.status(200).json(isValid);
                            }
                        })
                    
                } else {
                    comprobarPassword(resultados.consultaAdmin[0][0].password, passwordText)
                        .then( isValid => {
                            if (isValid) {
                                res.status(200).json("admin");
                            } else {
                                res.status(200).json(isValid);
                            }
                        })
                }
            } else {
                res.status(200).json("El correo no existe");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export default iniciarSesion;