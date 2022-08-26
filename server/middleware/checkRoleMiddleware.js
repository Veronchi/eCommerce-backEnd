import Jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";

export default function (role) {
  return function (req, res, next) {
    try {
      if (req.method === "OPTIONS") {
        next();
      }
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw ApiError.forbidden("Unauthorized");
      }

      const decoded = Jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        throw ApiError.forbidden("No access");
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
}
