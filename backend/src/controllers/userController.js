import cloudinary from "../config/cloudinary.js";
import userModel from "../models/userModel.js";
import httpStatus from "http-status";

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
  const { id } = req.params;
  try {
    const editableFields = [
      "name",
      "username",
      "bio",
      "email",
      "location",
      "website",
    ];
    const updatedFields = {};

    for (const field of editableFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updatedFields[field] = req.body[field];
      }
    }

    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "gitNexus/profile-picture" },
            (error, uploadResult) => {
              if (error) reject(error);
              else resolve(uploadResult);
            },
          )
          .end(req.file.buffer);
      });

      updatedFields.profilePicture = result.secure_url;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "At least one field is required to update",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true })
      .select("-password");

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
