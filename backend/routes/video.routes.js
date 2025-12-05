// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createVideo } from "../controllers/video.controller";

const router = express.Router();

// ---------------------------------------------
//  @route   POST /api/register
//  @desc    Create a new video
// ---------------------------------------------
router.post("/create-video", createVideo);


export default router;