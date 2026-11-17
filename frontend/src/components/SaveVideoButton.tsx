
import { useEffect, useState } from "react";
import { saveMyVideo } from "../services/myVideoService";

interface YouTubeVideo {
  id: string | { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
    channelTitle: string;
    description?: string;
    publishedAt?: string;
  };
}

interface Props {
  video: YouTubeVideo;
  isSaved: boolean;
}

export default function SaveVideoButton({ video, isSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = async () => {
    const videoId =
      typeof video.id === "string"
        ? video.id
        : video.id.videoId;

    if (!videoId || saved || loading) return;

    try {
      setLoading(true);

      await saveMyVideo({
        videoId,
        title: video.snippet.title,
        thumbnail:
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.medium?.url ||
          video.snippet.thumbnails.default?.url ||
          "",
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description || "",
        publishedAt: video.snippet.publishedAt || "",
      });

      setSaved(true);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setSaved(true);
      } else if (error.response?.status === 401) {
        alert("Please sign in to save videos.");
      } else {
        console.error("Failed to save video:", error);
        alert("Could not save video. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className="rounded-full border border-gray-500 px-3 py-2 text-sm hover:bg-gray-200 hover:text-black disabled:opacity-50"
    >
      {loading
        ? "Saving..."
        : saved
          ? "✓ Saved"
          : "+ Save video"}
    </button>
  );
}
