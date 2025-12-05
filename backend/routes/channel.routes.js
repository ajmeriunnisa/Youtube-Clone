// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createChannel } from "../controllers/channel.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

/**
 * CREATE CHANNEL (Protected)
 */
router.post("/", authMiddleware, createChannel);


export default router;