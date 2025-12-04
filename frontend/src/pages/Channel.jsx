import React from "react";

const Channel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const channel = JSON.parse(localStorage.getItem("channel"));
  const videos = JSON.parse(localStorage.getItem("videos")) || [];

  if (!channel || !user) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        No channel found. Please create your channel.
      </div>
    );
  }

  const myVideos = videos.filter(v => v.channelId === channel.id);

  return (
    <div className="w-full">
      {/* BANNER */}
      <div className="w-full h-48 bg-linear-to-r from-red-500 to-blue-600"></div>

      {/* CHANNEL HEADER */}
      <div className="px-6 md:px-16 -mt-16 flex items-start gap-6">
        {/* BIG PROFILE BADGE */}
        <div className="w-32 h-32 bg-red-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl text-white font-bold uppercase">
          {user.name[0]}
        </div>

        <div className="mt-15">
          <h1 className="text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray-800">{user.email}</p>
          <p className="text-gray-500 text-sm mt-1">
            {myVideos.length} videos • Joined {new Date(channel.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="mt-6 border-b">
        <div className="flex gap-8 px-6 md:px-16 text-gray-700 font-semibold">
          <button className="py-3 border-b-2 border-black">Videos</button>
          <button className="py-3 hover:text-black">Home</button>
        </div>
      </div>

      {/* VIDEO GRID */}
      <div className="px-6 md:px-16 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {myVideos.length === 0 ? (
          <p className="text-gray-500 text-lg col-span-full">
            No videos uploaded yet.
          </p>
        ) : (
          myVideos.map((video) => (
            <div key={video.id} className="cursor-pointer group">
              <img
                src={video.thumbnail}
                className="w-full rounded-lg group-hover:opacity-90 transition"
              />
              <h3 className="mt-2 text-sm font-bold">{video.title}</h3>
              <p className="text-xs text-gray-500">{video.views || "0 views"}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Channel;
