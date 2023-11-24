import { Router } from "express";
import { methods as rutaController } from "./../controllers/ruta.controller";

const router = Router();

router.get("/", rutaController.getRutas);
router.get("/:id", rutaController.getRuta);


export default router;