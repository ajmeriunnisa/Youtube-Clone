// User authentication controller (register/login)
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // token expiry

/**
 * REGISTER USER
 * Creates new user with password validation and hashing
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, avatar = "" } = req.body || {};

    // ------------------------------
    // VALIDATIONS
    // ------------------------------

    if (!username || username.trim().length < 3 || username.trim().length > 30) {
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters.",
      });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Custom password rules (before hashing)
    const hasUpper = /[A-Z]/.test(password);
    const hasAt = /@/.test(password);

    if (!hasUpper) {
      return res
        .status(400)
        .json({ message: "Password must include at least one uppercase letter." });
    }

    if (!hasAt) {
      return res
        .status(400)
        .json({ message: "Password must include the '@' symbol." });
    }

    // ------------------------------
    // CHECK EXISTING USER
    // ------------------------------
    const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Email already registered. Please login." });
    }

    // ------------------------------
    // HASH PASSWORD
    // ------------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ------------------------------
    // CREATE USER
    // ------------------------------
    const user = await UserModel.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      avatar: avatar || "",
      channels: [],
    });

    // Return safe user data (no password)
    const userSafe = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    return res.status(201).json({
      message: "User registered successfully.",
      user: userSafe,
    });
  } catch (err) {
    console.error("user.register error:", err);
    return res.status(500).json({
      message: "Server error while registering user.",
    });
  }
};

/**
 * LOGIN USER
 * Authenticates user and returns JWT token
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare password with hashed one
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // JWT Payload
    const payload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Safe user details (no password)
    const userSafe = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    return res.json({
      message: "Login successful.",
      token,
      user: userSafe,
    });
  } catch (err) {
    console.error("user.login error:", err);
    return res.status(500).json({
      message: "Server error while logging in.",
    });
  }
};
