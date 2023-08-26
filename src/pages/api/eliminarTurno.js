import { pool } from "src/db/db";

const eliminarTurno = async (req, res) => {
    const id= req.body
    try {
        const [result] = await pool.query("DELETE FROM turnos WHERE idturnos = ?", [id])

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default eliminarTurno;