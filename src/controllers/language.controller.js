import { getConnection } from "../database/database.js";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, apellido, email, password FROM usuarios");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, apellido, email, password FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        if (nombre === undefined || apellido === undefined || email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all fields."})
        }
        
        const language = {nombre, apellido, email, password};
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", language);
        res.json({message: "Language added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, apellido, email, password } = req.body;

        if (id === undefined || nombre === undefined || apellido === undefined || email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all fields."})
        }

        const language = { id, nombre, apellido, email, password};
        const connection = await getConnection();
        const result = await connection.query("UPDATE usuarios SET ?  WHERE id = ?", [language, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const deleteLanguage = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages, 
    addLanguage,
    getLanguage,
    updateLanguage,
    deleteLanguage
};