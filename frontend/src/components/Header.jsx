import React, { useState } from "react";
import { FiMenu, FiSearch, FiBell, FiUser } from "react-icons/fi";
import FilterBar from "./FilterBar";

const Header = ({ onToggleSidebar }) => {

  return (
    <>
      <header
        className="
        w-full h-18 px-4 flex items-center justify-between 
        bg-white border-b border-gray-200 sticky top-0 z-50
      "
      >
        {/* LEFT SECTION — Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger button */}
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
            className="
            p-2 rounded-md hover:bg-gray-200 transition
          "
          >
            <FiMenu className="text-xl" />
          </button>

          {/* LOGO */}
          <a className="flex items-center gap-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              className="h-5 md:h-6"
            />
          </a>
        </div>

        {/* SEARCH BAR */}
        <form
          className="
          hidden sm:flex items-center 
          bg-gray-100 rounded-full px-4 py-1 w-[40%] 
        "
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm"

          />

          <button type="submit">
            <FiSearch className="text-lg text-gray-600" />
          </button>
        </form>

        {/* RIGHT SECTION — Notification + Profile */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="p-2 rounded-md hover:bg-gray-200 transition">
            <FiBell className="text-lg" />
          </button>

          {/* Profile / Sign in */}
          <button
            className="
            flex items-center gap-2 
            bg-blue-600 text-white text-sm 
            px-3 py-1.5 rounded-md 
            hover:bg-blue-700 transition
          "
          >
            <FiUser /> Sign in
          </button>
        </div>
      </header>
      {/* FILTER BAR BELOW HEADER */}
      <div className="w-full bg-white sticky top-16 z-40 border-b">
        <FilterBar />
      </div>
    </>
  );
};

export default Header;
