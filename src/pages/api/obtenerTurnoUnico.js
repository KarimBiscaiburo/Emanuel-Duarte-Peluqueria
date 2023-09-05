import { pool } from "src/db/db";

const obtenerTurnoUnico = async (req, res) => {
    const id = req.body;

    try {
        const [result] = await pool.query("SELECT * FROM turnos WHERE idturnos = ?", id);
        res.json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
    
}

export default obtenerTurnoUnico;