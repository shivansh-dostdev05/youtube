import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getTrendingVideos } from "../services/videoService";
import { getMyVideos } from "../services/myVideoService";

import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useInfiniteQuery({
    queryKey: ["trendingVideos"],

    queryFn: ({ pageParam }) => getTrendingVideos(pageParam),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
  });

  const videos = data?.pages.flatMap((page) => page.videos) ?? [];

  const { data: savedVideos = [] } = useQuery({
    queryKey: ["myVideos"],
    queryFn: getMyVideos,
  });

  const savedVideoIds = savedVideos.map((video) => video.videoId);

  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "300px",
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

      <main className={`pt-20 px-5 transition-all ${sidebarOpen ? "ml-60" : "ml-0"}`}>
        <h1>Trending Videos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} isSaved={savedVideoIds.includes(video.id)} />
          ))}
        </div>

        <div ref={observerTarget} className="h-10" />

        {isFetchingNextPage && <p className="text-center py-4">Loading more videos...</p>}

        {!hasNextPage && videos.length > 0 && (
          <p className="text-center py-4">No more videos to load.</p>
        )}
      </main>
    </>
  );
}
