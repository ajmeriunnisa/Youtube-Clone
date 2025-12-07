// Channel content component with tabs and video grid
import React from "react";

const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Community"];

const ChannelContent = ({
  channel,
  user,
  activeTab,
  setActiveTab,
  channelVideos,
  onEdit,
  onDelete,
  navigate,
  channelHandle,
}) => {
  return (
    <>
      {/* Channel banner */}
      <div className="w-full h-48 md:h-60 bg-gray-200">
        {channel.banner && <img src={channel.banner} className="w-full h-full object-cover" alt="Channel Banner" />}
      </div>

      {/* Channel info and buttons */}
      <div className="px-4 md:px-8 mt-4 flex gap-4">
        {channel.profileImage && (
          <img src={channel.profileImage} className="w-20 h-20 md:w-24 md:h-24 rounded-full border shadow-sm" alt="Profile" />
        )}

        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold">{channel.channelName}</h2>
          <p className="text-gray-600 text-sm">{channelHandle}</p>

          <p className="text-gray-600 text-sm">
            {channel.subscribers} subscribers • {channelVideos.length} videos • Joined {new Date(channel.createdAt).toLocaleDateString()}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button className="bg-red-600 text-white px-5 py-1.5 rounded-full text-sm">Subscribe</button>

            <button onClick={() => navigate("/upload-video")} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Upload Video
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mt-6 border-b px-4 md:px-8 flex gap-6 overflow-x-auto text-sm">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? "border-b-2 border-black font-semibold" : ""}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Videos content */}
      <div className="px-4 md:px-8 mt-6">
        {activeTab === "Videos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {channelVideos.length === 0 ? (
              <p className="text-gray-600">No videos uploaded yet.</p>
            ) : (
              channelVideos.map((video) => (
                <div key={video._id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/video/${video._id}`)}>
                  <img src={video.thumbnailUrl || video.thumbnail} alt={video.title} className="rounded-lg w-full h-32 sm:h-40 object-cover" />
                  <h3 className="mt-2 text-sm font-semibold">{video.title}</h3>

                  {video.uploader === user?._id || video.userEmail === user?.email ? (
                    <div className="flex gap-3 text-xs mt-1">
                      <button className="text-blue-600" onClick={() => onEdit(video)}>Edit</button>
                      <button className="text-red-600" onClick={() => onDelete(video._id)}>Delete</button>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChannelContent;
