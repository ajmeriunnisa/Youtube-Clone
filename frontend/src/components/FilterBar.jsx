import React from "react";

const categories = [
    "All",
    "Music",
    "Gaming",
    "Software",
    "Entertainment",
    "Education",
    "Technology",
    "News",
    "Sports",
    "T-Series"
];

const FilterBar = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex space-x-5 overflow-x-auto py-4 px-5 bg-white border-b border-gray-200">
      {categories.map((category, index) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            className={`shrink-0 px-4 py-1 rounded-full text-sm transition cursor-pointer
              ${isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
