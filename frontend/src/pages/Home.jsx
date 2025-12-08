// Home page with video grid and category filtering
import React from "react";
import useVideos from "../hooks/useVideos";
import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";
import FilterBar from "../components/FilterBar";

const Home = () => {
  const { searchQuery, selectedCategory, setSelectedCategory } = useOutletContext();
  const { videos, loading, error } = useVideos(selectedCategory);

  // Filter videos by search query
  const filteredVideos =
    !searchQuery || searchQuery.trim() === ""
      ? videos
      : videos.filter((video) =>
        (video.title || "").toLowerCase().includes(searchQuery.toLowerCase().trim())
      );

  return (
    <div className="px-0">
      {/* Fixed filter bar below header */}
      <div className="fixed top-16 z-40 w-full bg-white border-b shadow-sm">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {/* Video grid content */}
      <div className="px-2 sm:px-6 pt-18 sm:pt-16">
        {loading && (
          <p className="text-center text-gray-500">Loading videos...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}
        {!loading && !error && filteredVideos.length === 0 && (
          <p className="text-center text-gray-500">
            No videos found.
          </p>
        )}

        {/* Responsive video grid */}
        <div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {!loading &&
            !error &&
            filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
