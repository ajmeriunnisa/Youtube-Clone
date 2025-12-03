import React, { useEffect } from "react";
import useVideos from "../hooks/useVideos"; // custom hook to fetch sample videos
import VideoCard from "../components/VideoCard";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
    const { searchQuery , selectedCategory } = useOutletContext();
    // Getting all videos from our custom hook
    const videos = useVideos();

    // 1) filter by category (if not "All")
    const byCategory =
        selectedCategory === "All"
        ? videos
        : videos.filter((video) => video.category === selectedCategory);

    // 2) filter by search (if searchQuery is non-empty)
    const finalList = (searchQuery || "").trim() === ""
        ? byCategory
        : byCategory.filter((video) =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

        const navigate = useNavigate();

        useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");

        if (loggedIn !== "true") {
            navigate("/login");
        }
        }, []);

    return (
        <div className="px-4 mt-4">

            {/* ------------------ Video Grid Section ------------------ */}
            <div
                className="
          grid 
          gap-3
          mt-6 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-3
        "
            >
                {finalList.map((video) => (
                    <VideoCard key={video.videoId || video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Home;
