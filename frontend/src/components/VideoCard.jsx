import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Please sign in to watch the video!");
      navigate("/login");
    } else {
      navigate(`/video/${video._id || video.id}`);
    }
  };

  const formatViews = (num) => {
    if (!num && num !== 0) return "0 views";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B views";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-full max-w-lg p-3 rounded-xl transition-all duration-200 hover:bg-gray-200">
      <div className="relative">
        <img src={video.thumbnailUrl || video.thumbnail} alt={video.title} className="w-full h-60 object-cover rounded-xl transition-all duration-200 hover:rounded-none" />
        {video.duration && <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm">{video.duration}</span>}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight">{video.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{video.channelName}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>{formatViews(video.views)}</span>
          <RxDotFilled className="text-gray-400 text-lg mx-0.5" />
          <span>{video.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
