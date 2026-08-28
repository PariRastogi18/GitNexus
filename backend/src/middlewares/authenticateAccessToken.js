import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Access token required",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(accessToken, config.JWT_SECRETE);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid or expired access token",
    });
  }
}
