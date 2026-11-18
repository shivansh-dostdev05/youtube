import type { Video } from "../types/video";
import { useNavigate } from "react-router-dom";
import SaveVideoButton from "../components/SaveVideoButton";

interface VideoCardProps {
  video: Video;
  isSaved: boolean;
}

export default function VideoCard({ video, isSaved }: VideoCardProps) {
  const navigate = useNavigate();

  const formatViews = (views?: string) => {
    const count = Number(views);

    if (count >= 1_000_000) {
      return (count / 1_000_000).toFixed(1) + "M views";
    } else if (count >= 1_000) {
      return (count / 1_000).toFixed(1) + "K views";
    }

    return count + " views";
  };

  return (
    <div className="cursor-pointer">
      <div onClick={() => navigate(`/watch/${video.id}`)}>
        <div className="aspect-video overflow-hidden rounded-xl">
          <img
            src={
              video.snippet.thumbnails.medium?.url ??
              video.snippet.thumbnails.high?.url ??
              video.snippet.thumbnails.default?.url ??
              ""
            }
            alt={video.snippet.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 flex gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-400" />

          <div>
            <h3 className="font-bold text-sm line-clamp-2">{video.snippet.title}</h3>

            <p className="text-gray-600 text-sm">{video.snippet.channelTitle}</p>

            <p className="text-gray-600 text-sm">{formatViews(video.statistics?.viewCount)}</p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SaveVideoButton video={video} isSaved={isSaved} />
      </div>
    </div>
  );
}
