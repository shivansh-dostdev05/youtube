import api from "./api";
import type { YouTubeVideo as Video, TrendingVideoResponse } from "@youtube-clone/shared";

export const getTrendingVideos = async (pageToken?: string): Promise<TrendingVideoResponse> => {
  try {
    const response = await api.get<TrendingVideoResponse>("/videos/trending", {
      params: {
        pageToken,
      },
    });
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
