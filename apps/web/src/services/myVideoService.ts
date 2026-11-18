import api from "./api";

export interface SavedVideo {
  _id: string;
  userId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const getMyVideos = async (): Promise<SavedVideo[]> => {
  const response = await api.get("/my-videos", {
    withCredentials: true,
  });

  return response.data;
};

export const saveMyVideo = async (video: {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description?: string;
  publishedAt?: string;
}) => {
  const response = await api.post("/my-videos", video, {
    withCredentials: true,
  });

  return response.data;
};

export const removeMyVideo = async (videoId: string) => {
  const response = await api.delete(`/my-videos/${encodeURIComponent(videoId)}`, {
    withCredentials: true,
  });

  return response.data;
};
