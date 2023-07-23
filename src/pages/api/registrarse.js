import { pool } from "../../db/db.js";
import bcrypt from "bcryptjs";

const reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

async function hashear(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error)
        throw new Error("Error al encriptar la contraseña");
    }
}

async function getUsers(email) {
    const result = await pool.query("SELECT email FROM usuarios WHERE email = ?", [email]);
    if(result[0][0]){
        return true
    } else {
        return false
    }
}

const registrarse = async (req, res) => {
    const { email, passwordText, repassword, nombre, apellido, celular, direccion, piso } = req.body;
    const isValid = reLargo.test(email);

    const existe = await getUsers(email);
    if (existe) return res.status(200).json("Ya existe");

    if (!isValid || passwordText === "" || repassword !== passwordText || nombre === "" || apellido === "" || celular === "" || direccion === "") {
        return res.status(200).json("error");
    } else {
        try { 
            const password = await hashear(passwordText);
            
            const [respuesta] = await pool.query("INSERT INTO usuarios SET ?", {email, password, nombre, apellido, direccion, piso, celular});
    
            res.json({
                id: respuesta.insertId,
                email,
                password,
                nombre,
                apellido,
                direccion,
                piso,
                celular
            });
    
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default registrarse;