// Importing required icons and router components
import { HiOutlineMenu } from "react-icons/hi"; // Hamburger menu icon
import { AiOutlineSearch } from "react-icons/ai"; // Search icon

// Header Component: Accepts props (sidebar toggle + user info)
function Header ({ onToggleSidebar, user }) {
  return (
    // Main header container
    <header className="flex items-center justify-between px-4 py-5 bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* -------- LEFT SECTION -------- */}
      <div className="flex items-center gap-4">

        {/* Hamburger menu button */}
        <button onClick={onToggleSidebar}>
          <HiOutlineMenu className="text-2xl cursor-pointer" />
        </button>

        {/* YouTube Logo */}
        <div className="flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="Logo"
            className="h-5"
          />
       </div>
      </div>

      {/* -------- SEARCH BAR SECTION -------- */}
      <div className="flex items-center w-1/2 max-w-xl">

        {/* Search input box */}
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 px-4 py-1 rounded-l-full focus:outline-none"
        />

        {/* Search button */}
        <button className="bg-gray-100 border border-gray-300 border-l-0 px-4 py-[6px] rounded-r-full">
          <AiOutlineSearch className="text-xl" />
        </button>
      </div>

      {/* -------- RIGHT SECTION -------- */}
      <div>
        {/* If user is logged in → show username */}
        {user ? (
          <p className="font-semibold">Hello, {user.username}</p>
        ) : (
          /* If not logged in → show Sign In button */
          <span
            className="px-4 py-1 bg-blue-500 text-white rounded-full font-semibold"
          >
            Sign In
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
