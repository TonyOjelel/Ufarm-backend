import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 *
 * @description protect endpoints with jwt
 * @param {object} req the request
 * @param {object} res the response
 * @param {next} next move to the middleware
 * @returns {object} token string
 */

export const Authenticate = (req, res, next) => {
  const token = req.headers["Bearer"] || req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      status: 403,
      error: "You must login to access this resource",
    });
  }
  const newToken = token.slice(7);
  return jwt.verify(newToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: "Token is invalid",
      });
    }
    req.decoded = decoded;
    return next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  const user = req.decoded;
  if (user.role != "admin") {
    return res.status(401).send({
      success: 401,
      Message: "User not Authorized, Only Admin can perform this action ",
    });
  }
  next();
};