
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getVideoDetails } from "../services/videoService";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";

export default function WatchPage() {
  const { videoId } = useParams();

  const [sideBarOpen, setSidebarOpen] = useState(true);

  const {
    data: video,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoDetails(videoId!),
    enabled: !!videoId,
  });

  if (!videoId) {
    return <div>No video ID provided.</div>;
  }

  if (isPending) {
    return <div>Loading Video...</div>;
  }

  if (isError) {
    return <div>Failed to fetch video details.</div>;
  }

  if (!video) {
    return <div>No video found.</div>;
  }

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(!sideBarOpen)} />

      <Sidebar isOpen={sideBarOpen} />

      <main
        className={`min-h-screen pt-20 px-5 transition-all ${
          sideBarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <h1>{video.snippet.title}</h1>

        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <h1 className="mt-5 text-lg font-bold">
          {video.snippet.title}
        </h1>

        <p className="text-gray-600 text-sm">
          {video.snippet.channelTitle}
        </p>

        <p className="text-gray-600 text-sm">
          {video.statistics?.viewCount} views
        </p>

        <p className="mt-3">{video.snippet.description}</p>
      </main>
    </>
  );
}
