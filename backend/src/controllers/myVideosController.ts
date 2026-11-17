
import { Request, Response } from "express";

import {
  saveVideo,
  getSavedVideos,
  deleteSavedVideo,
} from "../services/myVideosService.js";


const getUserId = (req: Request): string | null => {
  const user = req.user as { id?: string } | undefined;
  return user?.id ?? null;
};


export const createMyVideo = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }

    const {
      videoId,
      title,
      thumbnail,
      channelTitle,
      description,
      publishedAt,
    } = req.body;

    if (!videoId || !title || !thumbnail || !channelTitle) {
      return res.status(400).json({
        message: "Required video information is missing",
      });
    }

    const newVideo = await saveVideo({
      userId,
      videoId,
      title,
      thumbnail,
      channelTitle,
      description: description || "",
      publishedAt: publishedAt || "",
    });

    if (!newVideo) {
      return res.status(409).json({
        message: "Video already exists in Your Videos",
      });
    }

    return res.status(201).json({
      message: "Video saved successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("SAVE VIDEO ERROR:", error);

    return res.status(500).json({
      message: "Failed to save video",
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const getMyVideos = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }

    const videos = await getSavedVideos(userId);

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Get videos error:", error);

    return res.status(500).json({
      message: "Failed to fetch videos",
    });
  }
};


export const removeMyVideo = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }

    const { videoId } = req.params;

    const deletedVideo = await deleteSavedVideo(userId, videoId);

    if (!deletedVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json({
      message: "Video removed successfully",
    });
  } catch (error) {
    console.error("Delete video error:", error);

    return res.status(500).json({
      message: "Failed to delete video",
    });
  }
};
