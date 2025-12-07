import React, { useRef } from "react";

const categories = ["All", "Music", "Gaming", "Software", "Entertainment", "Education", "Technology", "News", "Sports", "T-Series"];

const FilterBar = ({ selectedCategory, onCategorySelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 200; // pixels
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-white border-b border-gray-200">
      {/* left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2
                   h-8 w-8 rounded-full bg-white shadow text-sm z-10"
      >
        ‹
      </button>

      {/* scrollable categories */}
      <div
        ref={scrollRef}
        className="flex space-x-3 overflow-x-auto py-3 px-3 sm:px-8 scrollbar-none"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`shrink-0 px-4 py-1 rounded-full text-sm whitespace-nowrap
                ${isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2
                   h-8 w-8 rounded-full bg-white shadow text-sm z-10"
      >
        ›
      </button>
    </div>
  );
};

export default FilterBar;