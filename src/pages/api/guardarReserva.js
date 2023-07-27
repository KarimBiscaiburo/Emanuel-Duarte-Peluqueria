import { pool } from "@/db/db";

const guardarRerserva = async (req, res) => {
    const { fecha, hora } = req.body;

    //La fecha tiene que ser aaaa/mm/dd
    //La hora tiene que ser hh/mm

    try {
        const [result] = await pool.query("INSERT INTO reservas SET ?", {fecha, hora});

        res.json({
            id: result.insertId,
            fecha,
            hora
        });

    } catch (error) {
        return res.status(200).json(error);
    }
}

export default guardarRerserva;