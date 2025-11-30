import { AiFillHome, AiOutlineLike } from "react-icons/ai";
import { MdExplore, MdVideoLibrary, MdHistory, MdWatchLater, MdSettings } from "react-icons/md";
import { FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 w-60
        transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <h2 className="text-lg font-bold mb-6">Menu</h2>

      {/* MAIN */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2 mt-10">Main</p>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MdExplore className="text-xl" />
            <span>Explore</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MdVideoLibrary className="text-xl" />
            <span>Subscriptions</span>
          </div>
        </nav>
      </div>

      {/* YOU */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">You</p>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <FaUserCircle className="text-xl" />
            <span>Your Channel</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MdHistory className="text-xl" />
            <span>History</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MdWatchLater className="text-xl" />
            <span>Watch Later</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <AiOutlineLike className="text-xl" />
            <span>Liked Videos</span>
          </div>
        </nav>
      </div>

      {/* MORE */}
      <div>
        <p className="text-sm text-gray-500 mb-2">More</p>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <MdSettings className="text-xl" />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <FaQuestionCircle className="text-xl" />
            <span>Help</span>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <BiMessageDetail className="text-xl" />
            <span>Send Feedback</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
