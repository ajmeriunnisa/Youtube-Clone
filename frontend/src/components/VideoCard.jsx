import React from "react";

// VideoCard component to display single video details
const VideoCard = ({ video }) => {
    // Format views to K/M notation
    const formatViews = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
        return num + " views";
    };

    return (
        <div className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
            {/* Video Thumbnail */}
            <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg"
            />

            {/* Video Information */}
            <div className="mt-2 px-1">
                {/* Video Title */}
                <h3 className="text-sm font-semibold line-clamp-2">
                    {video.title}
                </h3>

                {/* Channel Name */}
                <p className="text-xs text-gray-500 mt-1">{video.channelName}</p>

                {/* Views */}
                <p className="text-xs text-gray-500">{formatViews(video.views)}</p>
            </div>
        </div>
    );
};

export default VideoCard;
