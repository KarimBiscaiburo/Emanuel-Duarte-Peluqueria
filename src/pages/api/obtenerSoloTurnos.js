import { pool } from "src/db/db";

const obtenerSoloTurnos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM turnos ORDER BY fecha DESC");
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export default obtenerSoloTurnos;