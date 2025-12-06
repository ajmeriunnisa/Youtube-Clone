import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Comment from "../components/Comment";
import SuggestedList from "../components/SuggestedList";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/videos/${id}`);
        setVideo(res.data);

        const all = await axios.get("/api/videos");
        setAllVideos(all.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return alert("Comment cannot be empty");
    try {
      const res = await axios.post(`/api/videos/${id}/comments`, { text: commentText });
      const updatedVideo = await axios.get(`/api/videos/${id}`);
      setVideo(updatedVideo.data);
      setCommentText("");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/videos/${id}/comments/${commentId}`);
      const updatedVideo = await axios.get(`/api/videos/${id}`);
      setVideo(updatedVideo.data);
    } catch (err) {
      alert("Error deleting comment");
    }
  };

  const handleUpdateComment = async (commentId, text) => {
    try {
      await axios.put(`/api/videos/${id}/comments/${commentId}`, { text });
      const updatedVideo = await axios.get(`/api/videos/${id}`);
      setVideo(updatedVideo.data);
    } catch (err) {
      alert("Error updating comment");
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/videos/${id}/like`);
      setVideo({ ...video, likes: res.data.likes });
    } catch (err) {
      alert("Error liking video");
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.post(`/api/videos/${id}/dislike`);
      setVideo({ ...video, dislikes: res.data.dislikes });
    } catch (err) {
      alert("Error disliking video");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!video) return <div className="p-6">Video not found</div>;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
      <div className="flex-1 min-w-0">
        {/* Use video tag when videoUrl is a direct URL, else iframe */}
        {video.videoUrl && (video.videoUrl.includes("youtube") || video.videoUrl.includes("embed")) ? (
          <iframe
            title={video.title}
            src={video.videoUrl}
            className="w-full rounded-lg h-96 md:h-[600px]"
            allowFullScreen
          />
        ) : (
          <video controls src={video.videoUrl} className="w-full rounded-lg" />
        )}

        <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="font-bold text-gray-800 text-lg">{video.channelName}</p>
            <p className="text-sm text-gray-500">
              {video.views} • {new Date(video.uploadDate || video.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleLike} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <AiOutlineLike />
              <span>{video.likes}</span>
            </button>

            <button onClick={handleDislike} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <AiOutlineDislike />
              <span>{video.dislikes}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3">Comments</h2>
          {user ? (
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a public comment..."
                className="flex-1 border p-2 rounded-md"
              />
              <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Post
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please log in to comment.</p>
          )}

          <div className="space-y-4">
            {(video.comments || []).map((c) => {
              // adapt comment object fields: commentId, userId, text, timestamp
              const commentObj = {
                _id: c.commentId || c._id,
                userId: c.userId,
                userEmail: c.userEmail,
                userName: c.userName || "User",
                text: c.text,
                createdAt: c.timestamp,
              };

              return (
                <Comment
                  key={commentObj._id}
                  comment={commentObj}
                  currentUser={user}
                  onDelete={() => handleDeleteComment(commentObj._id)}
                  onUpdate={(newText) => handleUpdateComment(commentObj._id, newText)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <h2 className="text-lg font-bold mb-3">Suggested Videos</h2>
        <SuggestedList videos={allVideos} currentId={video._id || video._id} limit={6} onCardClick={(vidId) => navigate(`/video/${vidId}`)} />
      </div>
    </div>
  );
};

export default VideoPlayer;
