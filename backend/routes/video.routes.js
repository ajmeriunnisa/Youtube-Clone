// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { addComment, createVideo, deleteComment, deleteVideo, dislikeVideo, getAllVideos, getVideoById, getVideosByCategory, likeVideo, updateComment, updateVideo } from "../controllers/video.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

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

/**
 * ADD COMMENT (Protected)
 */
router.post("/:id/comments", authMiddleware, addComment);

/**
 * UPDATE COMMENT (Protected)
 */
router.put("/:videoId/comments/:commentId", authMiddleware, updateComment);

/**
 * DELETE COMMENT (Protected)
 */
router.delete("/:videoId/comments/:commentId", authMiddleware, deleteComment);

/**
 * LIKE VIDEO (Protected)
 */
router.post("/:id/like", authMiddleware, likeVideo);

/**
 * DISLIKE VIDEO (Protected)
 */
router.post("/:id/dislike", authMiddleware, dislikeVideo);

export default router;