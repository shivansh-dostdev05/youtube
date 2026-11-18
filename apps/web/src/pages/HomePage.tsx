
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getTrendingVideos } from "../services/videoService";
import { getMyVideos } from "../services/myVideoService";

import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  
  const {
    data: videos = [],
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trendingVideos"],
    queryFn: getTrendingVideos,
  });

  
  const { data: savedVideos = [] } = useQuery({
    queryKey: ["myVideos"],
    queryFn: getMyVideos,
  });

  const savedVideoIds = savedVideos.map((video) => video.videoId);

  if (isTrendingPending) {
    return <div>Loading Videos...</div>;
  }

  if (isTrendingError) {
    return <div>Failed to fetch trending videos.</div>;
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
