// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createChannel, getAllChannels, getChannel } from "../controllers/channel.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

/**
 * CREATE CHANNEL (Protected)
 */
router.post("/", authMiddleware, createChannel);

/**
 * GET ALL CHANNELS (Public)
 */
router.get("/", getAllChannels);

/**
 * GET SINGLE CHANNEL (Public)
 */
router.get("/:id", getChannel);


export default router;