import userModel from "../models/userModel.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

export async function getAllProfile(req, res) {
  try {
    const users = await userModel.find({});
    return res.json(users);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const updatedFields = {};

    if (email) {
      updatedFields.email = email;
    }

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "At least one field is required to update",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function deleteUserProfile(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
