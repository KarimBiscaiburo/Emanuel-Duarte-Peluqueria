import { pool } from "src/db/db";

const guardarReprogramar = async (req, res) => {
    const {id, hora} = req.body;
    const estado = "Pendiente";
   
    try {
        const [result] = await pool.query("UPDATE turnos SET ? WHERE idturnos = ?", [{hora, estado}, id]);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error)
    }
}

export default guardarReprogramar;