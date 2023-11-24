import { getConnection } from "./../database/database.js";

const getReservas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, cliente_id, ruta_id, fecha_inicio, fecha_fin, costo_total, nopersonas FROM reservas");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getReserva = async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, cliente_id, ruta_id, fecha_inicio, fecha_fin, costo_total, nopersonas FROM reservas WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export const methods = {
    getReservas, 

    getReserva

};