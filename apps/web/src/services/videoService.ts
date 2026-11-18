import api from "./api";
import type {Video,TrendingVideoResponse} from "../types/video.ts";

export const getTrendingVideos = async (): Promise<Video[]> => {
  try {
    const response = await api.get<TrendingVideoResponse>("/videos/trending");
    return response.data;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
};

export const getVideoDetails = async (videoId: string): Promise<Video> => {
  try {
    const response = await api.get<Video>(`/video/${videoId}`);

    console.log("Video details:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};
