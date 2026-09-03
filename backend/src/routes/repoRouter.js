import { Router } from "express";
import {
  createRepository,
  deleteRepositoryById,
  fetchAllRepositories,
  fetchCurrentUserRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  toggleVisibility,
  updateRepositoryById,
} from "../controllers/repoController.js";

const repoRouter = Router();

repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", fetchAllRepositories);
repoRouter.put("/repo/update/:id", updateRepositoryById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);
repoRouter.get("/repo/name", fetchRepositoryByName);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/:userId", fetchCurrentUserRepository);
repoRouter.patch("/repo/toggle/:id", toggleVisibility);

export default repoRouter;
