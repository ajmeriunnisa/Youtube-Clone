import React from "react";
import { useParams } from "react-router-dom";
import videos from "../utils/videos"; 
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";


const VideoPlayer = () => {
  //  Get video ID from URL
  const { id } = useParams();

  //  Find the video from data
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return <div className="p-4">Video not found</div>;
  }

  return (
    <div className="flex gap-6 p-4">
      {/* LEFT SECTION — VIDEO PLAYER + DETAILS */}
      <div className="w-[70%]">

        {/* VIDEO PLAYER */}
        <video
          controls
          src={video.videoUrl}
          className="w-full rounded-lg"
        />

        {/*  VIDEO TITLE */}
        <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

        {/* CHANNEL + LIKE/DISLIKE SECTION */}
        <div className="flex justify-between items-center mt-4">
          {/* Channel Info */}
          <div>
            <p className="font-bold text-gray-800">{video.channel}</p>
            <p className="text-sm text-gray-500">{video.views} • {video.uploadDate}</p>
          </div>

          {/* Action buttons section (Static buttons) */}
          <div className="flex items-center gap-3">

            {/* LIKE BUTTON */}
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                <AiOutlineLike className="text-xl text-gray-700" />
                <span className="text-sm">{video.likes}</span>
            </button>

            {/* DISLIKE BUTTON */}
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                <AiOutlineDislike className="text-xl text-gray-700" />
                <span className="text-sm">{video.dislikes}</span>
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full">Share</button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>

        {/*  COMMENTS SECTION — empty for now, will add later */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Comments</h2>
          <p className="text-gray-500"></p>
        </div>

      </div>

      {/* RIGHT SECTION — Suggested Videos */}
      <div className="w-[30%]">
        <h2 className="text-lg font-bold mb-3">Suggested Videos</h2>

        {/* Placeholder for suggestions */}
        <p className="text-gray-500">Suggested videos will be added next.</p>
      </div>

    </div>
  );
};

export default VideoPlayer;
