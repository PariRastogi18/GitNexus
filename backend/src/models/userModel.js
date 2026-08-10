import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Email is required"],
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;