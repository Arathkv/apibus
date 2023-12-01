import { getConnection } from "./../database/database.js";

const getReservas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, cliente_id, ruta_id, fecha_inicio, fecha_fin, costo_total, status, nopersonas, autobus_id FROM reservas");
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
        const result = await connection.query("SELECT id, cliente_id, ruta_id, fecha_inicio, fecha_fin, costo_total, status, nopersonas, autobus_id FROM reservas WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};




const addReserva = async (req, res) => {
    try {
        const { cliente_id, ruta_id, fecha_inicio, fecha_fin, costo_total, nopersonas, autobus_id  } = req.body;

        if (cliente_id === undefined || ruta_id === undefined || fecha_inicio === undefined  || fecha_fin === undefined || costo_total === undefined || nopersonas === undefined || autobus_id === undefined) {
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
        

        const reserve = {
            cliente_id, 
            ruta_id,
            fecha_inicio,
            fecha_fin,
            costo_total, 
            status:'RESERVADO',
            created_at: timestamp,
            updated_at: timestamp,
            nopersonas,
            autobus_id,
            ruta_libre:null
        };
        
        const connection = await getConnection();
        await connection.query("INSERT INTO reservas SET ?", reserve);
        res.json({message: "Reserva Agregada"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};




export const methods = {
    getReservas, 
    addReserva,
    getReserva

};