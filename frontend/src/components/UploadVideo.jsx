import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const key = `channel_${user.email}`;
 const channel = user
    ? JSON.parse(localStorage.getItem(`channel_${user.email}`))
    : null;
  
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    duration: "",
  });

  if (!user || !channel) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Channel Found</h2>
        <p className="text-gray-600 mt-2">Create your channel first.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];

    const newVideo = {
      id: "video-" + Date.now(),
      ...videoData,
      channelId: channel.channelId,
      userEmail: user.email,
      userName: user.name,
      views: 0,
      likes: 0,
      comments: [],
    };

    storedVideos.push(newVideo);

    localStorage.setItem("videos", JSON.stringify(storedVideos));

    alert("Video uploaded successfully!");

    navigate("/channel");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          name="title"
          placeholder="Video Title"
          required
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          required
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="videoUrl"
          placeholder="Video URL"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="duration"
          placeholder="Duration (e.g., 12:30)"
          required
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Upload Video
        </button>

      </form>
    </div>
  );
};

export default UploadVideo;
