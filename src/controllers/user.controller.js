import { getConnection } from "../database/database.js";

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password FROM users");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUser = async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password FROM users WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name === undefined || email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all fields."})
            return;
        }
        
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const hora = String(fechaActual.getHours()).padStart(2, '0');
        const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
        const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

        const timestamp = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

        const usuario = {
            name, 
            email, 
            email_verified_at:null,
            password, 
            two_factor_secret:null,
            two_factor_recovery_codes:null,
            two_factor_confirmed_at:null,
            remember_token:null,
            current_team_id:null,
            profile_photo_path:null,
            created_at: timestamp,
            updated_at: timestamp
        };

        const connection = await getConnection();
        await connection.query("INSERT INTO users SET ?", usuario);
        res.json({message: "Usuario agregado"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const updateUser = async (req, res) => {
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


const deleteUser = async (req, res) => {
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
    getUsers, 
    addUser,
    getUser,
    updateUser,
    deleteUser
};