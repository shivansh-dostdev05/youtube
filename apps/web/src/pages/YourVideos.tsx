import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import type { SavedVideo } from "../services/myVideoService.ts";
import { getMyVideos, removeMyVideo } from "../services/myVideoService.ts";


export default function YourVideos() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: videos = [],
    isPending,
    isError,
    error,
  } = useQuery<SavedVideo[]>({
    queryKey: ["myVideos"],
    queryFn: getMyVideos,
  });

  const handleRemove = async (videoId: string) => {
    try {
      await removeMyVideo(videoId);

      await queryClient.invalidateQueries({
        queryKey: ["myVideos"],
      });
    } catch (error) {
      console.error("Failed to remove video:", error);
      alert("Could not remove video.");
    }
  };

  if (isPending) {
    return <div className="p-6">Loading your videos...</div>;
  }

  if (isError) {
    const message =
      axios.isAxiosError(error) && error.response?.status === 401
        ? "Please sign in to view your videos."
        : "Failed to load your videos.";

    return <div className="p-6">{message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Your Videos</h1>

      {videos.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">No saved videos yet</h2>

          <p className="mt-2 text-gray-500">Save videos to find them here later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="aspect-video w-full object-cover"
              />

              <div className="p-4">
                <h2 className="line-clamp-2 font-semibold">{video.title}</h2>

                <p className="mt-2 text-sm text-gray-500">{video.channelTitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/watch/${video.videoId}`)}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm text-white"
                  >
                    Watch
                  </button>

                  <button
                    onClick={() => handleRemove(video.videoId)}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
