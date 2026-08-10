import userModel from "../models/userModel";
import { signUpSchema } from "../validators/auth.validate";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import sessionModel from "../models/sessionModel";
import crypto from "crypto"

export async function signup(req, res) {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return result.error.issues;
  }

  try {
    const { username, email, password } = result.data;

    const isRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isRegistered) {
      return res.status(httpStatus.CONFLICT).json({
        message: "Username and email already exists",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRETE,
      { expiresIn: "7d" },
    );

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    res.cookie({
        
    })
  } catch (error) {}
}
