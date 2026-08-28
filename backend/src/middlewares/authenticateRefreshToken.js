import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function authenticateRefreshToken(req, res, next) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Refresh token not found",
    });
  }

  try {
    const decode = jwt.verify(refreshToken, config.JWT_SECRETE);
    req.user = decode;
    req.refreshToken = refreshToken;

    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid or expired refresh token",
    });
  }
}
