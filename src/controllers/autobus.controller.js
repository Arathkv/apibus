import { getConnection } from "../database/database.js";

const getAutobuses = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, descripcion, capacidad FROM autobuses");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getAutobus = async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, descripcion, capacidad FROM autobuses WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};




export const methods = {
    getAutobuses, 
    getAutobus


};