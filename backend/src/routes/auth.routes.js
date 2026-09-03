import { Router } from "express";
import { getMe, login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js";
import { authenticateRefreshToken } from "../middlewares/authenticateRefreshToken.js";
import { authenticateAccessToken } from "../middlewares/authenticateAccessToken.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getMe", authenticateAccessToken, getMe);
authRouter.get("/logout", authenticateRefreshToken, logout);
authRouter.get("/refreshAccessToken", authenticateRefreshToken, refreshAccessToken);

export default authRouter;
