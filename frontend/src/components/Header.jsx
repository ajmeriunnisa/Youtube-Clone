import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiSearch, FiBell, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar, onSearch}) => {
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


  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
   
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userHasChannel");

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
      <header className="w-full h-16 px-3 md:px-6 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-50">
  {/* Left: menu + logo */}
  <div className="flex items-center gap-2 md:gap-3 shrink-0">
  <button
    id="sidebar-toggle"
    onClick={onToggleSidebar}
    aria-label="Toggle menu"
    className="p-2 rounded-md hover:bg-gray-200 transition shrink-0"
  >
    <FiMenu className="text-xl" />
  </button>

  <Link
    to="/"
    className="flex items-center gap-1 cursor-pointer shrink-0"
    onClick={() => {
      setSearchText("");
      onSearch("");
    }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
      alt="YouTube Logo"
      className="h-6 w-auto sm:h-7 md:h-6 shrink-0"
    />
  </Link>
</div>

  {/* Center: desktop search bar */}
  <form
    onSubmit={handleSubmit}
    className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-[40%] transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-300"
  >
    <input
      type="text"
      placeholder="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="flex-1 bg-transparent outline-none text-sm px-2 py-1 rounded-l-full"
    />
    <button
      type="submit"
      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r-full flex items-center justify-center"
    >
      <FiSearch className="text-gray-600 text-lg" />
    </button>
  </form>
  {/* Mobile search bar */}
<form
  onSubmit={handleSubmit}
  className="sm:hidden px-3 pb-2 bg-white border-b border-gray-200"
>
  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
    <FiSearch className="text-gray-500 mx-1" />
    <input
      type="text"
      placeholder="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="flex-1 bg-transparent outline-none text-sm px-1"
    />
  </div>
</form>


  {/* Right: icons + avatar / login */}

    {!channel && user && (
      <button
        onClick={() => navigate("/create-channel")}
        className="hidden md:inline-block bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700"
      >
        Create Channel
      </button>
    )}

<div className="flex items-center gap-2 md:gap-4">
    <button className="p-2 rounded-md hover:bg-gray-200 transition">
      <FiBell className="text-lg" />
    </button>

    {user ? (
      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setShowLogout(!showLogout)}
          className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer uppercase mr-2"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.username || user.email}
              className="w-full h-full object-cover"
            />
          ) : (
            (user.name || user.username || "U").charAt(0)
          )}
        </div>

        {showLogout && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow text-sm w-56">
            {/* top user info */}
            <div className="px-3 py-2 border-b">
              <p className="font-semibold text-gray-800">
                {user.name || user.username}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* account / profile section */}
            <div className="py-1 border-b">
              {channel && (
                <div
                  onClick={() => {
                    navigate("/channel");
                    setShowLogout(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  View Your Channel
                </div>
                
              )}
              {/* Mobile-only Create Channel (shown when user has no channel) */}
              {!channel && user && (
                <div
                  onClick={() => {
                    navigate("/create-channel");
                    setShowLogout(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer md:hidden"
                >
                  Create Channel
                </div>
              )}
              
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                YouTube Studio
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Switch account
              </div>
            </div>

            {/* settings/help section */}
            <div className="py-1 border-b">
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Purchases and memberships
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Your data in YouTube
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Help
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Send feedback
              </div>
            </div>

            {/* logout at bottom */}
            <div
              onClick={handleLogout}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/login"
        className="flex items-center gap-2 bg-blue-600 text-white text-xs md:text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
      >
        <FiUser />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    )}
  </div>
</header>

    </>
  );
};

export default Header;
