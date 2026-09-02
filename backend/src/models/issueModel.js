import mongoose from "mongoose";
import { Schema } from "mongoose";

const issuesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  repository: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
});

const issuesModel = mongoose.model("Issue", issuesSchema);
export default issuesModel;
