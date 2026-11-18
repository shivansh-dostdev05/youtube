import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import YourVideos from "./pages/YourVideos";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
        <Route path="/your-videos" element={<YourVideos />} />
      </Routes>
    </BrowserRouter>
  );
}
