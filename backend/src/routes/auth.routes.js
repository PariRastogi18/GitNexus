import { Router } from "express";
import { home } from "../controllers/auth.controller.js";

const router = Router();

router.get("/home", home);

export default router;