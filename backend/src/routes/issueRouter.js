import { Router } from "express";
import {
  createIssue,
  deleteIssueById,
  getAllIssue,
  getIssueById,
  updateIssueById,
} from "../controllers/issueController.js";

const issueRouter = Router();

issueRouter.post("/issue/create", createIssue);
issueRouter.get("/issue/:id", getIssueById);
issueRouter.get("/issue/all", getAllIssue);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
issueRouter.put("/issue/update/:id", updateIssueById);

export default issueRouter;
