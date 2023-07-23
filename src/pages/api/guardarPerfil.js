import { pool } from "@/db/db";

const guardarPerfil = async (req, res) => {
    const { nombre, apellido, email, celular, direccion, piso, id } = req.body;

    try {
        const [result] = await pool.query("UPDATE usuarios SET ? WHERE idusuarios = ?", [{ nombre, apellido, email, celular, direccion, piso }, id]);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default guardarPerfil;