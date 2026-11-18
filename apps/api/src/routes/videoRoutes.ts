
import { Hono } from "hono";

import {
  getTrendingVideos,
  getVideoById,
} from "../controllers/videoController.js";

const router = new Hono();

router.get("/trending", getTrendingVideos);

router.get("/:videoId", getVideoById);

export default router;
