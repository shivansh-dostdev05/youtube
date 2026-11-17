import { useEffect, useState } from "react";
import { getTrendingVideos } from "../services/videoService";
import { getMyVideos } from "../services/myVideoService";
import type { Video } from "../types/video";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingResult, savedResult] = await Promise.allSettled([
          getTrendingVideos(),
          getMyVideos(),
        ]);

        if (trendingResult.status === "fulfilled") {
          setVideos(trendingResult.value);
        } else {
          throw trendingResult.reason;
        }

        if (savedResult.status === "fulfilled") {
          setSavedVideoIds(
            savedResult.value.map((video) => video.videoId)
          );
        } else {
          console.error("Could not fetch saved videos:", savedResult.reason);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch trending videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar isOpen={sidebarOpen} />

      <main
        className={`pt-20 px-5 transition-all ${
          sidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <h1>Trending Videos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isSaved={savedVideoIds.includes(video.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}