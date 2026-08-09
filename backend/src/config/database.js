import mongoose, { mongo } from "mongoose";
import { config } from "./config.js";

export async function connectDB() {
  await mongoose.connect(config.MONGO_URL);
  console.log("Database connected successfully");
}
