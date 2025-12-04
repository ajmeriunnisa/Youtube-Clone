import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiSearch, FiBell, FiUser } from "react-icons/fi";
import FilterBar from "./FilterBar";
import { Link, useNavigate } from "react-router-dom"; 

const Header = ({ onToggleSidebar, onSearch, selectedCategory, onCategorySelect }) => {
  
  /* -------------------------------------------------
     SEARCH STATE + HANDLER
  ---------------------------------------------------*/
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText.trim());
  };

  /* -------------------------------------------------
     LOGIN STATUS FROM LOCAL STORAGE
  ---------------------------------------------------*/
  const navigate = useNavigate();
  // Initialize user immediately from localStorage
const [user, setUser] = useState(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn && savedUser ? savedUser : null;
});

// Ref for dropdown to detect outside click
  const dropdownRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

// Listen for login events 
useEffect(() => {
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && savedUser) setUser(savedUser);
  };

  window.addEventListener("login", handleLogin);
  return () => window.removeEventListener("login", handleLogin);
}, []);


  /* -------------------------------------------------
     LOGOUT FUNCTIONALITY
     - Remove user from storage
     - Navigate to login
     - Reload UI
  ---------------------------------------------------*/
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (!confirmLogout) {
      return; // user canceled → do nothing
    }
  
    localStorage.setItem("isLoggedIn","false");

    navigate("/"); // redirect to login
    window.location.reload(); 
  };

  const channelKey = user ? `channel_${user.email}` : null;
  const channel = channelKey ? JSON.parse(localStorage.getItem(channelKey)) : null;
  return (
    <>
      {/* -------------------------------------------------
         HEADER SECTION
      ---------------------------------------------------*/}
      <header
        className="
          w-full h-18 px-4 flex items-center justify-between 
          bg-white border-b border-gray-200 sticky top-0 z-50
        "
      >
        {/* LEFT SIDE — HAMBURGER + LOGO */}
        <div className="flex items-center gap-3">

          {/* Hamburger Button */}
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FiMenu className="text-xl" />
          </button>

          {/* LOGO → If logged in → go home, else go login */}
          <Link
            to="/"
            className="flex items-center gap-1 cursor-pointer"
            onClick={() =>{
              setSearchText("")
             onSearch("")} }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              className="h-5 md:h-6"
            />
          </Link>
        </div>

        {/* -------------------------------------------------
           SEARCH BAR
        ---------------------------------------------------*/}
        <form
          onSubmit={handleSubmit}
          className="
            hidden sm:flex items-center 
            bg-gray-100 rounded-full px-3 py-1 w-[40%] 
            transition-all duration-200 
            focus-within:ring-2 focus-within:ring-blue-300
          "
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

        {/* CREATE CHANNEL BUTTON */}
          <button
            onClick={() => {
              if (!user) {
                alert("Please sign in to create a channel");
                return;
              }
              navigate("/create-channel");
            }}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
              channel ? "hidden" : ""
            }`}
          >
            Create Channel
          </button>

        {/* -------------------------------------------------
           RIGHT SIDE — BELL + PROFILE OR SIGN IN
        ---------------------------------------------------*/}
        <div className="flex items-center gap-4">

          {/* Notification Bell */}
          <button className="p-2 rounded-md hover:bg-gray-200 transition">
            <FiBell className="text-lg" />
          </button>

          {/* If user logged in → show profile badge */}
          {user ? (
            <div ref={dropdownRef} className="relative">
              <div
                onClick={() => setShowLogout(!showLogout)}
                className="
                  w-9 h-9 rounded-full 
                  bg-red-600 text-white 
                  flex items-center justify-center 
                  cursor-pointer uppercase
                "
              >
                {user.name[0]}
              </div>

              {/* Logout Dropdown */}
              {showLogout && (
  <div
    className="
      absolute right-0 mt-2 
      bg-white border rounded shadow text-sm w-40
    "
  >
    {/* USER NAME */}
    <p className="px-3 py-2 font-semibold text-gray-700">
      {user.name}
    </p>

    {/* VIEW YOUR CHANNEL — Only if channel exists */}
    {channel && (
      <div
        onClick={() => navigate("/channel")}
        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
      >
        View Your Channel
      </div>
    )}

    {/* LOGOUT */}
    <div
      onClick={handleLogout}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-red-600"
    >
      Logout
    </div>
  </div>
)}
            </div>
          ) : (
            // If NOT logged in → show Sign In button
            <Link
              to="/login"
              className="
                flex items-center gap-2 
                bg-blue-600 text-white text-sm 
                px-3 py-1.5 rounded-md 
                hover:bg-blue-700 transition
              "
            >
              <FiUser /> Sign in
            </Link>
          )}
        </div>
      </header>

      {/* -------------------------------------------------
         FILTER BAR BELOW HEADER
      ---------------------------------------------------*/}
      <div className="w-full bg-white sticky top-16 z-40 border-b">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>
    </>
  );
};

export default Header;
