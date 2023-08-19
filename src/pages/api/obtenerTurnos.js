import { pool } from "src/db/db";

function buscarReservasTurnos() {
    return new Promise ( (resolve, reject) => {
        const consultaReservas = pool.query("SELECT * FROM reservas");
        const consultaTurnos = pool.query("SELECT * FROM turnos");

        Promise.all([consultaReservas, consultaTurnos])
            .then( ([result1, result2]) => {
                resolve({
                    consultaReservas: result1[0],
                    consultaTurnos: result2[0]
                })
            })
            .catch(error => {
                reject(new Error("Error al ejecutar las consultas: " + error.message));
            });
    })
}

const obtenerTurnos = async (req, res) => {
    try {
        buscarReservasTurnos()
            .then( resultados => {
                res.json(resultados)
            })

    } catch (error) {
        return res.status(200).json(error);
    }
}

export default obtenerTurnos;