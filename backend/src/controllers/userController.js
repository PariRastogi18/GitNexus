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
  try {
    const { id } = req.params;
    const { name, username, bio, email, location, website, profilePicture } = req.body;
    const updatedFields = {};

    if (email) {
      updatedFields.email = email;
    }
    if (name) {
      updatedFields.name = name;
    }
    if (username) {
      updatedFields.username = username;
    }
    if (bio) {
      updatedFields.bio = bio;
    }
    if (location) {
      updatedFields.location = location;
    }
    if (website) {
      updatedFields.website = website;
    }
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
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
