import Video from "../models/Video.js";

export const saveVideo = async (videoData: {
  userId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
}) => {
  const existingVideo = await Video.findOne({
    userId: videoData.userId,
    videoId: videoData.videoId,
  });

  if (existingVideo) {
    return null;
  }

  const newVideo = await Video.create(videoData);

  return newVideo;
};

export const getSavedVideos = async (userId: string) => {
  const videos = await Video.find({ userId }).sort({
    createdAt: -1,
  });

  return videos;
};

export const deleteSavedVideo = async (userId: string, videoId: string) => {
  const deletedVideo = await Video.findOneAndDelete({
    userId,
    videoId,
  });

  return deletedVideo;
};
