
import { Router } from "express";

import requireAuth from "../middleware/isAuthenticated.js";

import {
  createMyVideo,
  getMyVideos,
  removeMyVideo,
} from "../controllers/myVideosController.js";

const router = Router();


router.post("/", requireAuth, createMyVideo);


router.get("/", requireAuth, getMyVideos);


router.delete("/:videoId", requireAuth, removeMyVideo);

export default router;
