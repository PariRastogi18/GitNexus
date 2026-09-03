import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./auth.routes.js";
import repoRouter from "./repoRouter.js";
import issueRouter from "./issueRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);


mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

export default mainRouter;
