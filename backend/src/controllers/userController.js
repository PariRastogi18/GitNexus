import userModel from "../models/userModel.js";
import httpStatus from "http-status";

export async function getAllProfile(req, res) {
  try {
    const users = await userModel.find({});
    return res.json(users);
  } catch (error) {
    return res.send(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function getUserProfile(req, res) {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id);
    return res.json(users);
  } catch (error) {
    return res.send(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function updateUserProfile(req, res) {
  res.send("All repository fetch successfully!");
}

export async function deleteUserProfile(req, res) {
  res.send("Delete user profile successfully!");
}
