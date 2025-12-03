import React from "react";
import useVideos from "../hooks/useVideos";
import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { searchQuery, selectedCategory } = useOutletContext();
  const videos = useVideos();

  // Filter by category
  const byCategory =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  // Filter by search
  const finalList =
    (searchQuery || "").trim() === ""
      ? byCategory
      : byCategory.filter((video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

  return (
    <div className="px-4 mt-4">
      <div className="grid gap-3 mt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {finalList.map((video) => (
          <VideoCard key={video.videoId || video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
