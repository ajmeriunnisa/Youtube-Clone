import React from "react";
import useVideos from "../hooks/useVideos";
import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { searchQuery, selectedCategory } = useOutletContext();
  const { videos, loading, error } = useVideos();

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
      {loading && <p className="text-center text-gray-500">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && finalList.length === 0 && (
        <p className="text-center text-gray-500">No videos found.</p>
      )}

      <div className="grid gap-3 mt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {!loading &&
          !error &&
          finalList.map((video) => (
            <VideoCard key={video._id || video.videoId} video={video} />
          ))}
      </div>
    </div>
  );
};

export default Home;
