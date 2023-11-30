import { Router } from "express";
import { methods as autobusController } from "../controllers/autobus.controller";

const router = Router();

router.get("/", autobusController.getAutobuses);
router.get("/:id", autobusController.getAutobus);


export default router;