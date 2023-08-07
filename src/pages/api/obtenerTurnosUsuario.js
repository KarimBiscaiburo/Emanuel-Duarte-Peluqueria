import { pool } from "@/db/db";

const obtenerTurnosUsuario = async (req, res) => {
    const idUsuario = req.body;

    try {
        const [result] = await pool.query("SELECT * FROM turnos WHERE usuarios_idusuarios = ? ORDER BY fecha DESC", [idUsuario]);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json(error);
    }
}

export default obtenerTurnosUsuario;