import React from "react";
import useVideos from "../hooks/useVideos"; // custom hook to fetch sample videos
import VideoCard from "../components/VideoCard";

const Home = () => {
    // Getting all videos from our custom hook
    const videos = useVideos();

    return (
        <div className="px-4 mt-4">

            {/* ------------------ Video Grid Section ------------------ */}
            <div
                className="
          grid 
          gap-6 
          mt-6 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5
        "
            >
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Home;
