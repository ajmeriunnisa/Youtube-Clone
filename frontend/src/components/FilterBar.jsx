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

const FilterBar = () => {
    return (
        <div className="flex space-x-5 overflow-x-auto py-4 px-5 bg-white border-b border-gray-200 pl-0 lg:pl-56">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className="shrink-0 px-4 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition"
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
