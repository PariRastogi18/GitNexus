import issuesModel from "../models/issueModel.js";
import httpStatus from "http-status";
export async function createIssue(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Title and description are required!",
      });
    }

    const issue = await issuesModel.create({
      title,
      description,
      repository: id,
    });

    return res.status(httpStatus.CREATED).json({
      message: "Issue created successfully!",
      issueName: issue.title,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function updateIssueById(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedFields = {};

    if (title !== undefined) {
      updatedFields.title = title;
    }

    if (description !== undefined) {
      updatedFields.description = description;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "At least one updated fielded required!",
      });
    }

    const issue = await issuesModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!issue) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Issue not found",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Issue updated successfully!",
      issue,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export async function deleteIssueById(req, res) {
  try {
    const { id } = req.params;

    const issue = await issuesModel.findByIdAndDelete(id);

    if (!issue) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Issue not found",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Issue deleted successfully!",
      issueName: issue.title,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function getAllIssue(req, res) {
  try {
    const { id } = req.params;
    const issues = await issuesModel.find({ repository: id });

    if (issues.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Issues not available!",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "All issues fetched successfully!",
      issues,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function getIssueById(req, res) {
  try {
    const { id } = req.params;

    const issue = await issuesModel.findById(id).populate("repository");

    if (!issue) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Issue not found!",
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Issue fetched successfully!",
      issue,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
