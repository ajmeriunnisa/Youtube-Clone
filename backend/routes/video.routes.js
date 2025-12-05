// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createVideo, deleteVideo, getAllVideos, getVideoById, getVideosByCategory, updateVideo } from "../controllers/video.controller";
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

/**
 * UPDATE VIDEO (Protected)
 */
router.put("/:id", authMiddleware, updateVideo);

/**
 * DELETE VIDEO (Protected)
 */
router.delete("/:id", authMiddleware, deleteVideo);

export default router;