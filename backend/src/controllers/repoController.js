import httpStatus from "http-status";
import repoModel from "../models/repoModel.js";
import mongoose from "mongoose";

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
    const allRepo = await repoModel.find({}).populate("owner");
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
    const { id } = req.params;
    const { repoName, content, description, visibility, issues } = req.body;
    const updatedFields = {};
    if (repoName !== undefined) {
      updatedFields.repoName = repoName;
    }
    if (content !== undefined) {
      updatedFields.content = content;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }
    if (visibility !== undefined) {
      updatedFields.visibility = visibility;
    }
    if (issues !== undefined) {
      updatedFields.issues = issues;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "At least one updated field required!",
      });
    }

    const repoInfo = await repoModel
      .findByIdAndUpdate({ _id: id }, updatedFields, {
        new: true,
        runValidators: true,
      })
      .populate("owner");

    if (!repoInfo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Repository not found!",
      });
    }

    return res
      .status(httpStatus.OK)
      .json({ repoInfo, message: "Repository updated successfully!" });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function deleteRepositoryById(req, res) {
  try {
    const { id } = req.params;
    const repoInfo = await repoModel.findByIdAndDelete({ _id: id });
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
    const { name } = req.params;

    const repoInfo = await repoModel
      .findOne({ repoName: name })
      .populate("owner");

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

    const repoInfo = await repoModel.findById(id).populate("owner");

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
    const repoInfo = await repoModel.findById(id);

    if (!repoInfo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Repository not found!",
      });
    }

    repoInfo.visibility = !repoInfo.visibility;
    await repoInfo.save();

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

    const repoInfo = await repoModel.find({ owner: userId });

    if (repoInfo.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json({
        message: "Repositories not available!",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "All user repositories fetched successfully!",
      userRepos: repoInfo,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
