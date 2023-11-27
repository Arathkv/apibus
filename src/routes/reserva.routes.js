import { Router } from "express";
import { methods as reservaController } from "./../controllers/reserva.controller";

const router = Router();

router.get("/", reservaController.getReservas);
router.get("/:id", reservaController.getReserva);
router.post("/", reservaController.addReserva);

export default router;
