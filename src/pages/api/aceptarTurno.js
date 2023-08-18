import { pool } from "@/db/db";

const aceptarTurno = async (req, res) => {
    const idturnos = req.body;
    try {
        const [result] = pool.query("UPDATE turnos SET estado = 'Confirmado' WHERE idturnos = ?", [idturnos]);
        return res.status(200).json(result);
    } catch (error) {
        return res.json(error)
    }
}

export default aceptarTurno;