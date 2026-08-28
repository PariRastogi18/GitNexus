import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const { PORT } = config;

app.use("/api/auth", authRouter);

connectDB();
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
