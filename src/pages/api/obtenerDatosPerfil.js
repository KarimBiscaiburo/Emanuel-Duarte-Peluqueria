import { pool } from "@/db/db";

const obtenerDatosPerfil = async (req, res) => {
    const idUsuario = req.body;
    try {
        const [result] = await pool.query("SELECT * FROM usuarios WHERE idusuarios = ?", [idUsuario]);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json(error)
    }
}

export default obtenerDatosPerfil;