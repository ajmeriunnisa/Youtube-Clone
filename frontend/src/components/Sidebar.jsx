import React, { useEffect, useRef } from "react";
import { FiHome, FiCompass, FiYoutube, FiClock, FiThumbsUp, FiPlay, FiList, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose  }) => {
  const sideRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (e.target.closest("#sidebar-toggle")) return;

      if (sideRef.current && !sideRef.current.contains(e.target)) {
        onClose && onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
   <aside ref={sideRef} className={`fixed lg:top-16 top-29 left-0 bottom-0 z-30 bg-white border-r border-gray-300 overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "w-56 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"}`}>
      <nav className="p-4 flex flex-col gap-2 text-sm text-left">
        <Link to="/">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
            <FiHome /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Home</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiCompass /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Explore</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiTrendingUp /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Trending</span>
        </div>

        <div className="border-t my-2"></div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiYoutube /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Library</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiClock /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Watch Later</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiThumbsUp /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Liked Videos</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiPlay /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Your Videos</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <FiList /> <span className={`${isOpen ? "inline" : "hidden"} truncate`}>Playlists</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
