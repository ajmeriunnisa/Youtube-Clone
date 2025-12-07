// Horizontal scrollable filter bar (no arrows)
import React, { useRef } from "react";

const categories = ["All", "Music", "Gaming", "Software", "Entertainment", "Education", "Technology", "News", "Sports", "T-Series"];

const FilterBar = ({ selectedCategory, onCategorySelect }) => {
  const scrollRef = useRef(null);

  return (
    <div 
      ref={scrollRef}
      className="flex space-x-3 overflow-x-auto py-3 px-3 sm:px-8 scrollbar-none bg-white border-b border-gray-200"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`shrink-0 px-4 py-1 rounded-full text-sm whitespace-nowrap cursor-pointer
              ${isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;