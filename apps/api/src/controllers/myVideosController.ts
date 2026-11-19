import type { Context } from "hono";
import type { SessionEnv } from "@hono/session";

import { saveVideoSchema } from "@youtube-clone/shared";

import { saveVideo, getSavedVideos, deleteSavedVideo } from "../services/myVideosService.js";

type GoogleUser = {
  id?: string;
  sub?: string;
};

const getUserId = async (c: Context<SessionEnv>): Promise<string | null> => {
  const session = await c.var.session.get();
  const user = session?.user as GoogleUser | undefined;

  return user?.id ?? user?.sub ?? null;
};

export const createMyVideo = async (c: Context<SessionEnv>) => {
  try {
    const userId = await getUserId(c);

    if (!userId) {
      return c.json({ message: "User not found" }, 401);
    }

    const body = await c.req.json().catch(() => null);
    const result = saveVideoSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        {
          message: "Invalid video information",
          errors: result.error.flatten(),
        },
        400,
      );
    }

    const newVideo = await saveVideo({
      userId,
      ...result.data,
    });

    if (!newVideo) {
      return c.json({ message: "Video already exists in Your Videos" }, 409);
    }

    return c.json(
      {
        message: "Video saved successfully",
        video: newVideo,
      },
      201,
    );
  } catch (error) {
    console.error("Save Video Error:", error);

    return c.json(
      {
        message: "Failed to save video",
        error: error instanceof Error ? error.message : error,
      },
      500,
    );
  }
};

export const getMyVideos = async (c: Context<SessionEnv>) => {
  try {
    const userId = await getUserId(c);

    if (!userId) {
      return c.json({ message: "User not found" }, 401);
    }

    const videos = await getSavedVideos(userId);

    return c.json(videos, 200);
  } catch (error) {
    console.error("Get videos error:", error);

    return c.json({ message: "Failed to fetch videos" }, 500);
  }
};

export const removeMyVideo = async (c: Context<SessionEnv>) => {
  try {
    const userId = await getUserId(c);

    if (!userId) {
      return c.json({ message: "User not found" }, 401);
    }

    const videoId = c.req.param("videoId");

    if (typeof videoId !== "string" || !videoId.trim()) {
      return c.json({ message: "Invalid video ID" }, 400);
    }

    const deletedVideo = await deleteSavedVideo(userId, videoId);

    if (!deletedVideo) {
      return c.json({ message: "Video not found" }, 404);
    }

    return c.json({ message: "Video removed successfully" }, 200);
  } catch (error) {
    console.error("Delete video error:", error);

    return c.json({ message: "Failed to delete video" }, 500);
  }
};
