import { pool } from "src/db/db";

const obtenerTurnosPendientes = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM turnos WHERE LOWER(estado) = 'pendiente' ORDER BY fecha DESC");
        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json(error);
    }
}


export default obtenerTurnosPendientes;