import axios from "axios";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchTrendingVideos = async () => {
  const response = await axios.get(`${YOUTUBE_URL}/videos`, {
    params: {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 20,
      key: YOUTUBE_API_KEY,
    },
  });

  return response.data.items;
};

export const fetchVideoById = async (videoId: string) => {
  const response = await axios.get(`${YOUTUBE_URL}/videos`, {
    params: {
      part: "snippet, contentDetails, statistics",
      id: videoId,
      key: YOUTUBE_API_KEY,
    },
  });

  return response.data.items[0];
};
