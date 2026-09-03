import { Router } from "express";
import {
  deleteUserProfile,
  getAllProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/allUsers", getAllProfile);
userRouter.get("/userProfile", getUserProfile);
userRouter.put("/updateProfile", updateUserProfile);
userRouter.delete("/deleteUserProfile", deleteUserProfile);

export default userRouter;
