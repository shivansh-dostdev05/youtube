import "dotenv/config";

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { SessionEnv } from "@hono/session";

import connectDB from "./config/db.js";

import { sessionMiddleware } from "./middleware/session.js";

import myVideosRouter from "./routes/myVideos.js";
import honoAuthRoutes from "./routes/honoAuthRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = new Hono<SessionEnv>();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization","Cache-Control"]
  }),
);


app.use("*", sessionMiddleware);


app.get("/api/health", (c) => {
  return c.json({ message: "API is running" });
});


app.route("/auth", honoAuthRoutes);
app.route("/api/my-videos", myVideosRouter);
app.route("/api/videos", videoRoutes);

try {
  await connectDB();
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Server startup failed:", error);
  process.exit(1);
}

export default {
  port: 5000,
  fetch: app.fetch,
};
