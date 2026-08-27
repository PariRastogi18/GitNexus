import userModel from "../models/userModel.js";
import { loginSchema, signUpSchema } from "../validators/auth.validate.js";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import sessionModel from "../models/sessionModel.js";
import crypto from "crypto";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 100,
  sameSite: "none",
});

export async function signup(req, res) {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues,
    });
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

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      { id: user._id, sessionId: session._id },
      config.JWT_SECRETE,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("refreshToken", refreshToken, getCookieOptions);

    return res.status(httpStatus.OK).json({
      user: {
        username: user.username,
        email: user.email,
      },
      message: "User sign up successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

export async function login(req, res) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "User validation failed",
      errors: result.error.issues,
    });
  }

  try {
    const { email, password } = result.data;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Email or password is not valid",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Email or password is not valid",
      });
    }

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRETE,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
      },
      config.JWT_SECRETE,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("refreshToken", refreshToken, getCookieOptions);

    return res.status(httpStatus.OK).json({
      user: {
        username: user.username,
        email: user.email,
      },
      message: "User login successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}
