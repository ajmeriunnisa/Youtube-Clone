// ---------------------------------------------
// VIDEO ROUTES
// ---------------------------------------------

import express from "express";
import { createChannel } from "../controllers/channel.controller";

const router = express.Router();

/**
 * CREATE CHANNEL
 */
router.post("/", createChannel);


export default router;