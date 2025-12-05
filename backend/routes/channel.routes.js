// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createChannel, deleteChannel, getAllChannels, getChannel, updateChannel } from "../controllers/channel.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

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

/**
 * UPDATE CHANNEL (Protected)
 */
router.put("/:id", authMiddleware, updateChannel);

/**
 * DELETE CHANNEL (Protected)
 */
router.delete("/:id", authMiddleware, deleteChannel);

export default router;