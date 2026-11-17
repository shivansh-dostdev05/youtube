
import { Request, Response } from "express";

import {
  fetchTrendingVideos,
  fetchVideoById,
} from "../services/youtubeService.js";


export const getTrendingVideos = async (
  req: Request,
  res: Response
) => {
  try {
    const videos = await fetchTrendingVideos();

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


export const getVideoById = async (req: Request, res: Response) => {
  const { videoId } = req.params;

  try {
    const video = await fetchVideoById(videoId);

    res.status(200).json(video);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
