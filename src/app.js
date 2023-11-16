import express from "express";
import morgan from "morgan";

// Routes
import languageRoutes from "./routes/language.routes";

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

export default app;