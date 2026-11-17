
import { Router } from "express";

import {getTrendingVideos, getVideoById} from "../controllers/videoController.js";

const router = Router();


router.get("/trending", getTrendingVideos);


router.get("/:videoId", getVideoById);

export default router;
