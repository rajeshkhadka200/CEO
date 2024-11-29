import { Router } from "express";
import { getDraw } from "../controllers/DrawController.js";
const router = Router();

router.post("/getdraw", getDraw);

export default router;
