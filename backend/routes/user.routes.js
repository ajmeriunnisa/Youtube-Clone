// ---------------------------------------------
// USER ROUTES
// ---------------------------------------------

import express from "express";
import {registerUser,loginUser} from "../controllers/user.controller.js";

const router = express.Router();

// ---------------------------------------------
//  @route   POST /api/users/register
//  @desc    Register a new user
// ---------------------------------------------
router.post("/register", registerUser);

// ---------------------------------------------
//  @route   POST /api/users/login
//  @desc    Login user and return token
// ---------------------------------------------
router.post("/login", loginUser);

export default router;
