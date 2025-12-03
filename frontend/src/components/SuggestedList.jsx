import React from "react";
import SuggestedCard from "./SuggestedCard";

/**
 SuggestedList
**/
const SuggestedList = ({ videos = [], currentId, limit = 6, onCardClick }) => {
  // Exclude current video and take first `limit` items
  const suggestions = videos
    .filter((v) => String(v.id) !== String(currentId))
    .slice(0, limit);

  return (
    <div className="flex flex-col gap-2">
      {suggestions.map((v) => (
        <SuggestedCard key={v.id} video={v} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default SuggestedList;
