import { Hono } from "hono";
import type { SessionEnv } from "@hono/session";

import { requireAuth } from "../middleware/requireAuth.js";

import { createMyVideo, getMyVideos, removeMyVideo } from "../controllers/myVideosController.js";

const router = new Hono<SessionEnv>();

router.post("/", requireAuth, createMyVideo);

router.get("/", requireAuth, getMyVideos);

router.delete("/:videoId", requireAuth, removeMyVideo);

export default router;
