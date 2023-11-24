import express from "express";
import morgan from "morgan";

// Routes
import languageRoutes from "./routes/language.routes";
import rutaRoutes from "./routes/ruta.routes";
import reservaRoutes from "./routes/reserva.routes";

const cors = require("cors");

const app = express();

//settings

app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());


app.use(cors());

// Routes
app.use("/api/languages", languageRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/reservas", reservaRoutes);

export default app;