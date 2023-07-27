import { pool } from "@/db/db";

const guardarTurno = async (req, res) => {
    const {usuarios_idusuarios, fecha, hora, descripcion, nombre, apellido, celular, direccion, piso, servicio} = req.body
    const estado = "pendiente";

    try {
        const [result] = await pool.query("INSERT INTO turnos SET ?", {usuarios_idusuarios, fecha, hora, descripcion, estado, nombre, apellido, celular, direccion, piso, servicio});

        res.json({
            id: result.insertId,
            usuarios_idusuarios,
            fecha,
            hora,
            descripcion,
            estado,
            nombre,
            apellido,
            celular,
            direccion,
            piso,
            servicio
        });

    } catch (error) {
        return res.status(200).json(error)
    }
}

export default guardarTurno;