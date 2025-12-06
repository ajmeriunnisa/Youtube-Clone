import React from "react";
import { RxDotFilled } from "react-icons/rx";

const SuggestedCard = ({ video, onClick }) => {
  return (
    <div className="flex gap-3 items-start cursor-pointer hover:bg-gray-100 p-2 rounded-md transition" onClick={() => onClick && onClick(video._id || video.id)}>
      <img src={video.thumbnailUrl || video.thumbnail} alt={video.title} className="w-36 h-20 object-cover rounded-md shrink-0" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{video.channelName}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{video.views}</span>
          <RxDotFilled className="mx-1 text-gray-400" />
          <span>{video.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;
