// Video upload form with channel validation
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Software",
  "Entertainment",
  "Education",
  "Technology",
  "News",
  "Sports",
  "T-Series",
];

const UploadVideo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);

  // Video form data
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: categories[0],
    duration: "",
    views: "",
  });

  // Check auth and fetch user channel
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

  // Handle form input changes
  const handleChange = (e) => setVideoData({ ...videoData, [e.target.name]: e.target.value });

  // Submit video to backend
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
      
      {/* Upload form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          name="title" 
          placeholder="Title" 
          value={videoData.title} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border rounded-md" 
        />
        
        <textarea 
          name="description" 
          placeholder="Description" 
          value={videoData.description} 
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-md h-24" 
        />
        
        <input 
          name="thumbnailUrl" 
          placeholder="Thumbnail URL" 
          value={videoData.thumbnailUrl} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border rounded-md" 
        />
        
        <input 
          name="videoUrl" 
          placeholder="Video URL (YouTube or direct link)" 
          value={videoData.videoUrl} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border rounded-md" 
        />
        
        <div>
          <label className="block mb-1 font-semibold text-sm">Category</label>
          <select
            name="category"
            value={videoData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Duration and views inputs */}
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

        <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
