import mongoose from "mongoose";
import { Schema } from "mongoose";

const repoSchema = new Schema(
  {
    repoName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    content: [
      {
        type: String,
      },
    ],
    visibility: {
      type: Boolean,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issues: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  },
  {
    timestamps: true,
  },
);

const repoModel = mongoose.model("Repository", repoSchema);
export default repoModel;
