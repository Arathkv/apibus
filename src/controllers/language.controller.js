import { getConnection } from "../database/database.js";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password FROM users");
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
        const result = await connection.query("SELECT id, name, email, password FROM users WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name === undefined || email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all fields."})
            return;
        }
        
        const timestamp = new Date().toISOString();

        const language = {
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
            created_at: '2023-11-19 10:21:20',
            updated_at: '2023-11-19 10:31:20'
        };
        const connection = await getConnection();
        await connection.query("INSERT INTO users SET ?", language);
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