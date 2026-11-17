
import { useEffect, useState } from "react";
import type { SavedVideo } from "../services/myVideoService.ts";
import {
  getMyVideos,
  removeMyVideo,
} from "../services/myVideoService.ts";


export default function YourVideos() {
  const [videos, setVideos] = useState<SavedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    try {
      setError("");
      const data = await getMyVideos();
      setVideos(data);
    } catch (err: any) {
      console.error("Failed to fetch videos:", err);

      setError(
        err.response?.status === 401
          ? "Please sign in to view your videos."
          : "Failed to load your videos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleRemove = async (videoId: string) => {
    try {
      await removeMyVideo(videoId);

      setVideos((prevVideos) =>
        prevVideos.filter(
          (video) => video.videoId !== videoId
        )
      );
    } catch (error) {
      console.error("Failed to remove video:", error);
      alert("Could not remove video.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading your videos...</div>;
  }

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Your Videos
      </h1>

      {videos.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">
            No saved videos yet
          </h2>

          <p className="mt-2 text-gray-500">
            Save videos to find them here later.
          </p>
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
                <h2 className="line-clamp-2 font-semibold">
                  {video.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {video.channelTitle}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
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
