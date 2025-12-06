import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiSearch, FiBell, FiUser } from "react-icons/fi";
import FilterBar from "./FilterBar";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar, onSearch, selectedCategory, onCategorySelect }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return localStorage.getItem("isLoggedIn") === "true" && savedUser ? savedUser : null;
  });

  const [channel, setChannel] = useState(() => {
    if (!user) return null;
    return JSON.parse(localStorage.getItem(`channel_${user.email}`));
  });

  const dropdownRef = useRef(null);
  const [showLogout, setShowLogout] = useState(false);

  // Listen for login event
  useEffect(() => {
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    if (savedUser) {
      const ch = JSON.parse(localStorage.getItem(`channel_${savedUser.email}`));
      setChannel(ch);
    }
  };

  const handleChannelUpdate = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return;
    const ch = JSON.parse(localStorage.getItem(`channel_${savedUser.email}`));
    setChannel(ch);
  };

  window.addEventListener("login", handleLogin);
  window.addEventListener("channelUpdate", handleChannelUpdate);

  return () => {
    window.removeEventListener("login", handleLogin);
    window.removeEventListener("channelUpdate", handleChannelUpdate);
  };
}, []); 

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowLogout(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Do you really want to logout?")) return;
    localStorage.clear();
    setUser(null);
    setChannel(null);
    navigate("/");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText.trim());
  };

  return (
    <>
      <header className="w-full h-18 px-4 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} aria-label="Toggle menu" className="p-2 rounded-md hover:bg-gray-200 transition">
            <FiMenu className="text-xl" />
          </button>
          <Link to="/" className="flex items-center gap-1 cursor-pointer" onClick={() => { setSearchText(""); onSearch(""); }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="h-5 md:h-6" />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-[40%] transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-300">
          <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="flex-1 bg-transparent outline-none text-sm px-2 py-1 rounded-l-full" />
          <button type="submit" className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r-full flex items-center justify-center">
            <FiSearch className="text-gray-600 text-lg" />
          </button>
        </form>

        {!channel && user && (
          <button onClick={() => navigate("/create-channel")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Create Channel
          </button>
        )}

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-200 transition"><FiBell className="text-lg" /></button>

          {user ? (
            <div ref={dropdownRef} className="relative">
              <div onClick={() => setShowLogout(!showLogout)} className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer uppercase">
                {(user.name || user.username || "U").charAt(0)}
              </div>

              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow text-sm w-40">
                  <p className="px-3 py-2 font-semibold text-gray-700">{user.name || user.username}</p>
                  {channel && <div onClick={() => navigate("/channel")} className="px-3 py-2 cursor-pointer hover:bg-gray-100">View Your Channel</div>}
                  <div onClick={handleLogout} className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-red-600">Logout</div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"><FiUser /> Sign in</Link>
          )}
        </div>
      </header>

      <div className="w-full bg-white sticky top-16 z-40 border-b">
        <FilterBar selectedCategory={selectedCategory} onCategorySelect={onCategorySelect} />
      </div>
    </>
  );
};

export default Header;
