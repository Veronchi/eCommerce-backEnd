import Jwt from "jsonwebtoken";

export default function (role) {
  return function (req, res, next) {
    try {
      if (req.method === "OPTIONS") {
        next();
      }
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = Jwt.verify(token, process.env.SECRET_KEY);

      if(decoded.role !== role) {
        throw res.status(403).json({ message: "No access" });
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
}
