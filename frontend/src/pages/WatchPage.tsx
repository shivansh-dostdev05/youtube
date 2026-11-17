import {useEffect, useState} from "react";
import {getVideoDetails} from "../services/videoService";
import type { Video } from "../types/video.ts";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import { useParams } from "react-router-dom";


export default function WatchPage() {
    const {videoId} = useParams();

    console.log("WatchPage rendered");
    console.log("Video ID:", videoId);

    const [video, setVideo] = useState<Video | null>(null);
    const[sideBarOpen, setSidebarOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                if(!videoId) return;
                console.log("Fetching video ID:", videoId);

                const data = await getVideoDetails(videoId);
                console.log("Fetched video details:", data);
                setVideo(data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch video details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    if (loading) {
        return <div>Loading Video...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!video) {
        return <div>No video found.</div>;
    }

    return (
        <>
        <Navbar onMenuClick={() => setSidebarOpen(!sideBarOpen)} />
        <Sidebar isOpen={sideBarOpen}/>
        <main className={`min-h-screen pt-20 px-5 transition-all ${sideBarOpen ? "ml-60" : "ml-0"}`}>
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
            
            <h1 className="mt-5 text-lg font-bold">{video.snippet.title}</h1>
            <p className="text-gray-600 text-sm">{video.snippet.channelTitle}</p>
            <p className="text-gray-600 text-sm">{video.statistics?.viewCount} views</p>
            <p className="mt-3">{video.snippet.description}</p>
        </main>
        </>
    );
}