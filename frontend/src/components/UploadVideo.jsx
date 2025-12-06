import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "All",
    duration: "",
    views: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/login");
    setUser(storedUser);

    const fetchChannel = async () => {
      try {
        const res = await axios.get("/api/channels");
        const my = res.data.find((c) => c.owner && c.owner.email === storedUser.email);
        if (!my) {
          alert("Please create a channel first.");
          navigate("/create-channel");
          return;
        }
        setChannel(my);
      } catch (err) {
        console.error(err);
        alert("Error fetching channel");
      }
    };

    fetchChannel();
  }, [navigate]);

  const handleChange = (e) => setVideoData({ ...videoData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channel) return alert("No channel found");

    try {
      await axios.post("/api/videos", {
        ...videoData,
        duration: Number(videoData.duration) || 0,
        views: Number(videoData.views) || 0,
        channelId: channel._id,
        channelName: channel.name || channel.channelName,
      });
      alert("Video uploaded successfully!");
      navigate("/channel");
    } catch (err) {
      console.error(err);
      alert("Error uploading video");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" value={videoData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <textarea name="description" placeholder="Description" value={videoData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md h-24" />
        <input name="thumbnailUrl" placeholder="Thumbnail URL" value={videoData.thumbnailUrl} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <input name="videoUrl" placeholder="Video URL (YouTube or direct link)" value={videoData.videoUrl} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <input
          name="category"
          placeholder="Category"
          value={videoData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="duration"
            type="number"
            min="0"
            placeholder="Duration (seconds)"
            value={videoData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="views"
            type="number"
            min="0"
            placeholder="Views (optional)"
            value={videoData.views}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadVideo;
