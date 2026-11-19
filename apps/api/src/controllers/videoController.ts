import type { Context } from "hono";
import { trendingVideoResponseSchema, youtubeVideoSchema } from "@youtube-clone/shared";

import { fetchTrendingVideos, fetchVideoById } from "../services/youtubeService.js";

export const getTrendingVideos = async (c: Context) => {
  try {
    const pageToken = c.req.query("pageToken");

    const videos = await fetchTrendingVideos(pageToken);

    const validation = trendingVideoResponseSchema.safeParse(videos);

    if (!validation.success) {
      console.error("Invalid trending videos response:", validation.error.issues);

      return c.json({ error: "Invalid response from YouTube API" }, 502);
    }

    return c.json(validation.data, 200);
  } catch (error) {
    console.error(error);

    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const getVideoById = async (c: Context) => {
  const videoId = c.req.param("videoId");

  if (!videoId || !videoId.trim()) {
    return c.json({ error: "Invalid video ID" }, 400);
  }

  try {
    const video = await fetchVideoById(videoId);

    if (!video) {
      return c.json({ error: "Video not found" }, 404);
    }

    const validation = youtubeVideoSchema.safeParse(video);

    if (!validation.success) {
      console.error("Invalid video response:", validation.error.issues);

      return c.json({ error: "Invalid response from YouTube API" }, 502);
    }

    return c.json(validation.data, 200);
  } catch (error) {
    console.error(error);

    return c.json({ error: "Internal Server Error" }, 500);
  }
};
