import httpStatus from "http-status";
import repoModel from "../models/repoModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export async function createRepository(req, res) {
  try {
    const { owner, repoName, content, description, visibility, issues } =
      req.body;
    if (!repoName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Repository is name required!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Valid user id is required!",
      });
    }

    const repoInfo = await repoModel.create({
      repoName,
      description,
      content,
      visibility,
      issues,
      owner,
    });

    return res.status(httpStatus.CREATED).json({
      message: "Repository created successfully!",
      repoId: repoInfo._id,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function fetchAllRepositories(req, res) {
  try {
    const allRepo = await repoModel.find({});
    if (allRepo.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json({
        message: "Repositories not exists",
      });
    }

    return res.json(allRepo);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function updateRepositoryById(req, res) {
  try {
    const { repoId, repoName, content, description, visibility, issues } =
      req.body;
    const updatedFields = {};
    if (repoName) {
      updatedFields.repoName = repoName;
    }
    if (content) {
      updatedFields.content = content;
    }
    if (description) {
      updatedFields.description = description;
    }
    if (visibility) {
      updatedFields.visibility = visibility;
    }
    if (issues) {
      updatedFields.issues = issues;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "At least one updated field required!",
      });
    }

    const repoInfo = await repoModel.findByIdAndUpdate(repoId, updatedFields, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function deleteRepositoryById(req, res) {
  try {
    const { id } = req.params;
    const repoInfo = await repoModel.findByIdAndDelete(id);
    return res.status(httpStatus.OK).json({
      message: "Repository deleted successfully!",
      repoName: repoInfo.repoName,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function fetchRepositoryByName(req, res) {
  try {
    const { repoName } = req.params;

    const repoInfo = await repoModel.findOne(repoName);

    if (!repoInfo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Repository not found!",
      });
    }

    return res.json(repoInfo);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function fetchRepositoryById(req, res) {
  try {
    const { id } = req.params;

    const repoInfo = await repoModel.findOne(id);

    if (!repoInfo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Repository not found!",
      });
    }

    return res.json(repoInfo);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function toggleVisibility(req, res) {
  try {
    const { id } = req.params;
    const { visibility } = req.body;
    const isVis = visibility === true ? false : true;
    const repoInfo = await repoModel.findOneAndUpdate(
      id,
      {
        visibility: isVis,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!repoInfo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Repository not found!",
      });
    }

    return res
      .status(httpStatus.OK)
      .json({ message: "Visibility toggled successfully", repoInfo });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function fetchCurrentUserRepository(req, res) {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found!",
      });
    }

    if (user.repositories.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json({
        message: "Repositories not available!",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "All user repositories fetched successfully!",
      userRepos: user.repositories,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
