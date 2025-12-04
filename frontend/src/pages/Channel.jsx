import React, { useEffect, useState } from "react";
import videos from "../utils/videos.js";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [activeTab, setActiveTab] = useState("Videos");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();

  useEffect(() => {
    const savedChannel = JSON.parse(localStorage.getItem("channel"));
    setChannel(savedChannel);
  }, []);

  if (!channel) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Channel Found</h2>
        <p className="text-gray-600 mt-2">Please create your channel first.</p>
      </div>
    );
  }

 // fetch videos from both sample data AND localStorage
const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];

const allVideos = [...videos, ...storedVideos];

const channelVideos = allVideos.filter(
  (video) => video.channelId === channel.channelId
);


  // create channel handle (@username)
  const channelHandle = "@" +
    user?.name
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/[^a-z0-9]/g, "");

      //Delete Video
      const handleDeleteVideo = (id) => {
        const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];

        const updated = storedVideos.filter((v) => v.id !== id);

        localStorage.setItem("videos", JSON.stringify(updated));

        // Refresh UI
        window.location.reload();
        };


  return (
    <div className="w-full pb-10">

      {/* Banner */}
      <div className="w-full h-48 md:h-60 bg-gray-200">
        <img
          src={channel.banner}
          onError={(e) => (e.target.src = "https://via.placeholder.com/1200x400")}
          className="w-full h-full object-cover"
          alt="Channel Banner"
        />
      </div>

      {/* Channel Header */}
      <div className="px-4 md:px-8 mt-4 flex gap-4">
        <img
          src={channel.profileImage}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border shadow-sm"
        />

        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold">
            {channel.channelName}
          </h2>

          <p className="text-gray-600 text-sm">{channelHandle}</p>

          <p className="text-gray-600 text-sm">
            {channel.subscribers} subscribers • {channelVideos.length} videos •{" "}
            Joined {new Date(channel.createdAt).toLocaleDateString()}
          </p>

          <button className="mt-2 bg-red-600 text-white px-5 py-1.5 rounded-full text-sm hover:bg-red-700">
            Subscribe
          </button>

          {/* Upload Video button */}
          <button
            onClick={() => navigate("/upload-video")}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 ml-3"
            >
            Upload Video
            </button>

        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b px-4 md:px-8 flex gap-6 overflow-x-auto text-sm">
        {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                pb-2 
                ${activeTab === tab ? "border-b-2 border-black font-semibold" : "border-transparent"}
              `}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Videos Section */}
      <div className="px-4 md:px-8 mt-6">

        {activeTab === "Videos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {channelVideos.length === 0 ? (
              <p className="text-gray-600">No videos uploaded yet.</p>
            ) : (
              channelVideos.map((video) => (
                <div key={video.id} className="cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg w-full h-32 sm:h-40 object-cover"
                  />

                  <h3 className="mt-2 text-sm font-semibold">{video.title}</h3>

                  {/* Edit/Delete only for video owner */}
                  {video.userEmail === user?.email && (
                    <div className="flex gap-3 text-xs mt-1">
                        <button className="text-blue-600">Edit</button>

                        <button
                        className="text-red-600"
                        onClick={() => handleDeleteVideo(video.id)}
                        >
                        Delete
                        </button>
                    </div>
                    )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
