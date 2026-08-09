import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
    },
    password: {
        type: String,
        required: [true, "Email is required"],
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;