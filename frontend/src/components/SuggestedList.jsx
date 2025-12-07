// Suggested videos list (excludes current video)
import React from "react";
import SuggestedCard from "./SuggestedCard";

const SuggestedList = ({ videos = [], currentId, limit = 6, onCardClick }) => {
  // Filter out current video and limit results
  const suggestions = videos
    .filter((v) => String(v._id || v.id) !== String(currentId))
    .slice(0, limit);

  return (
    <div className="flex flex-col gap-2">
      {suggestions.map((v) => (
        <SuggestedCard 
          key={v._id || v.id} 
          video={v} 
          onClick={onCardClick} 
        />
      ))}
    </div>
  );
};

export default SuggestedList;
