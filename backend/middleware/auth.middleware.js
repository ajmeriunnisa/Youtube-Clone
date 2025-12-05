import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

const authMiddleware = async (req, res, next) => {
  try {
    // TOKEN FROM HEADER
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided. Authorization denied." });
    }

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    } 

    // VERIFY TOKEN
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // FIND USER
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // ATTACH USER TO REQUEST
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({ message: "Unauthorized access." });
  }
};

export default authMiddleware;
