import { Router } from "express";
import {
  deleteUserProfile,
  getAllProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const userRouter = Router();

userRouter.get("/allUsers", getAllProfile);
userRouter.get("/userProfile/:id", getUserProfile);
userRouter.put("/updateProfile/:id",upload.single("profilePicture"), updateUserProfile);
userRouter.delete("/deleteUserProfile/:id", deleteUserProfile);

export default userRouter;
