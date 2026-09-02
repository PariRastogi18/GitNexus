import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Email is required"],
    },
    repositories: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: "Repository",
      },
    ],
    followedUser: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    StarRepos: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: "Repository",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
