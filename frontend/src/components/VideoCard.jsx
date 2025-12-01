import React from "react";
import { RxDotFilled } from "react-icons/rx";

const VideoCard = ({ video }) => {
    const formatViews = (num) => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B views";
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
        return num + " views";
    };

    return (
        <div
            className="
                cursor-pointer 
                w-full max-w-sm 
                p-2 
                rounded-xl 
                transition-all 
                duration-200 
                hover:bg-gray-200 dark:hover:bg-[#272727]
            "
        >
            {/* Thumbnail */}
            <div className="relative">
            <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="
                    w-full 
                    h-48 
                    object-cover 
                    rounded-xl 
                    transition-all 
                    duration-200 
                    hover:rounded-lg
                "
            />

            {/* Duration Badge */}
            {video.duration && (
            <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                {video.duration}
            </span>
            )}
            </div>

            {/* Text Section */}
            <div className="mt-3">
                {/* Title */}
                <h3 className="text-sm font-semibold line-clamp-2 leading-tight">
                    {video.title}
                </h3>

                {/* Channel Name */}
                <p className="text-xs text-gray-500 mt-1">
                    {video.channelName}
                </p>

                {/* Views + Upload Time */}
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
