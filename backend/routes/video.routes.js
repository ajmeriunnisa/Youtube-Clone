// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createVideo, getAllVideos, getVideoById, getVideosByCategory } from "../controllers/video.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();


/**
 * CREATE VIDEO (Protected)
 */
router.post("/", authMiddleware, createVideo);

/**
 * GET ALL VIDEOS (Public)
 */
router.get("/", getAllVideos);

/**
 * GET VIDEO BY ID (Public)
 */
router.get("/:id", getVideoById);

/**
 * GET VIDEOS BY CATEGORY (Public)
 */
router.get("/category/:category", getVideosByCategory);

export default router;