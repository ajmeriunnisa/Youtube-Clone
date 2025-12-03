import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../utils/videos"; 
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Comment from "../components/Comment";


const VideoPlayer = () => {
  //  Get video ID from URL
  const { id } = useParams();

  //  Find the video from data
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return <div className="p-4">Video not found</div>;
  }

    const currentUser = JSON.parse(localStorage.getItem("user"));

  // COMMENT INPUT STATE
  const [commentText, setCommentText] = useState("");

  // COMMENTS LIST STATE
  const [comments, setComments] = useState(() => {
  const saved = localStorage.getItem(`comments_${id}`);
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
}, [comments, id]);

//Error State
const [errorMsg, setErrorMsg] = useState("");

    // ADD COMMENT
  const handleAddComment = () => {
  if (commentText.trim() === "") {
    setErrorMsg("Comment cannot be empty!");
    return;
  }

  setErrorMsg(""); // clear error on success

  const newComment = {
    id: Date.now(),
    userName: currentUser.name,
    userEmail: currentUser.email,
    text: commentText,
  };

  setComments([newComment, ...comments]);
  setCommentText("");
};


  // DELETE COMMENT
  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // UPDATE COMMENT
  const handleUpdateComment = (id, newText) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, text: newText } : c
      )
    );
  };


  return (
    <div className="flex gap-6 p-4">
      {/* LEFT SECTION — VIDEO PLAYER + DETAILS */}
      <div className="w-[70%]">

        {/* VIDEO PLAYER */}
        <video
          controls
          src={video.videoUrl}
          className="w-full rounded-lg"
        />

        {/*  VIDEO TITLE */}
        <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

        {/* CHANNEL + LIKE/DISLIKE SECTION */}
        <div className="flex justify-between items-center mt-4">
          {/* Channel Info */}
          <div>
            <p className="font-bold text-gray-800">{video.channel}</p>
            <p className="text-sm text-gray-500">{video.views} • {video.uploadDate}</p>
          </div>

          {/* Action buttons section (Static buttons) */}
          <div className="flex items-center gap-3">

            {/* LIKE BUTTON */}
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                <AiOutlineLike className="text-xl text-gray-700" />
                <span className="text-sm">{video.likes}</span>
            </button>

            {/* DISLIKE BUTTON */}
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                <AiOutlineDislike className="text-xl text-gray-700" />
                <span className="text-sm">{video.dislikes}</span>
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full">Share</button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>

        {/*  COMMENTS SECTION */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Comments</h2>

            {/* Comment Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a public comment..."
                className="flex-1 border p-2 rounded-md"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Post
              </button>
            </div>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}


            {/* Render Comments */}
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
            ))}
          </div>

      </div>

      {/* RIGHT SECTION — Suggested Videos */}
      <div className="w-[30%]">
        <h2 className="text-lg font-bold mb-3">Suggested Videos</h2>

        {/* Placeholder for suggestions */}
        <p className="text-gray-500">Suggested videos will be added here.</p>
      </div>

    </div>
  );
};

export default VideoPlayer;
