import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // token expiry

/**
 * REGISTER (SIGNUP)
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, avatar = "" } = req.body || {};

    // Basic validation
    if (!username || username.trim().length < 3 || username.trim().length > 30) {
      return res.status(400).json({ message: "Username must be 3 to 30 characters." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // Password rule
    const passwordPattern = /^(?=.*[A-Z])(?=.*@).{6,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, include at least one uppercase letter and one '@' character.",
      });
    }

    // Check if email already registered
    const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered. Please login." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user
    const created = await UserModel.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      avatar: avatar || "",
      channels: [],
    });

    // Return user data
    const userSafe = {
      _id: created._id,
      username: created.username,
      email: created.email,
      avatar: created.avatar,
    };

    return res.status(201).json({ message: "User registered successfully", user: userSafe });
  } catch (err) {
    console.error("auth.register error:", err);
    return res.status(500).json({ message: "Server error while registering user" });
  }
};


