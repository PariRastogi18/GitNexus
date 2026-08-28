import { Router } from "express";
import { getMe, login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js";
import { authenticateRefreshToken } from "../middlewares/authenticateRefreshToken.js";
import { authenticateAccessToken } from "../middlewares/authenticateAccessToken.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", authenticateAccessToken, getMe);
router.get("/logout", authenticateRefreshToken, logout);
router.get("/refreshAccessToken", authenticateRefreshToken, refreshAccessToken);

export default router;
