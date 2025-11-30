import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-5 bg-white shadow-md sticky top-0 z-50">

      {/* LEFT: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger always visible */}
        <button onClick={toggleSidebar}>
          <HiOutlineMenu className="text-2xl cursor-pointer" />
        </button>

        {/* YouTube Logo */}
        <a href="/" className="flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="h-5 md:h-6"
          />
        </a>
      </div>

      {/* CENTER: Search bar (desktop only) */}
      <div className="hidden md:flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 px-4 py-1 rounded-l-full focus:outline-none"
        />
        <button className="bg-gray-100 border border-gray-300 border-l-0 px-4 py-1 rounded-r-full hover:bg-gray-200">
          <AiOutlineSearch className="text-xl" />
        </button>
      </div>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-4">
        <AiOutlineVideoCameraAdd className="text-2xl cursor-pointer hover:text-gray-600" />
        <BsBell className="text-2xl cursor-pointer hover:text-gray-600" />
        <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
