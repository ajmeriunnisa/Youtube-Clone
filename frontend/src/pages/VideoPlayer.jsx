import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../utils/videos";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Comment from "../components/Comment";
import { FaShare } from "react-icons/fa";
import SuggestedList from "../components/SuggestedList";

const VideoPlayer = () => {
  const { id } = useParams();
  const video = videos.find((v) => v.id === id);

  if (!video) return <div className="p-4">Video not found</div>;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // USER COMMENTS (localStorage)
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const [commentText, setCommentText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ADD USER COMMENT
  const handleAddComment = () => {
    if (commentText.trim() === "") {
      setErrorMsg("Comment cannot be empty!");
      return;
    }

    const newComment = {
      id: Date.now(),
      userName: currentUser.name,
      userEmail: currentUser.email,
      text: commentText,
      date: new Date().toISOString().slice(0, 10),
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setErrorMsg("");
  };

  // DELETE USER COMMENT
  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // UPDATE USER COMMENT
  const handleUpdateComment = (id, newText) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, text: newText } : c))
    );
  };

  // MERGE COMMENTS (sample comments + user comments)
  const allComments = [
    ...comments.map((c) => ({
      ...c,
      type: "user",
    })),
    ...video.comments.map((c) => ({
      ...c,
      type: "sample",
    })),
    
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
      {/* LEFT SECTION */}
      <div className="flex-1 min-w-0">
        <video controls src={video.videoUrl} className="w-full rounded-lg" />

        <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

        {/* CHANNEL + LIKE/DISLIKE */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="font-bold text-gray-800 text-lg">{video.channelName}</p>
            <p className="text-sm text-gray-500">
              {video.views} • {video.uploadDate}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <AiOutlineLike />
              <span>{video.likes}</span>
            </button>

            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <AiOutlineDislike />
              <span>{video.dislikes}</span>
            </button>

            <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
              <FaShare />
              Share
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>

        {/* COMMENTS SECTION */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3">Comments</h2>

          {/* Add Comment Input */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Post
            </button>
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          {/* Render ALL Comments */}
          <div className="space-y-4">
            {allComments.map((comment) => {

              // sample comments = NON editable
              if (comment.type === "sample") {
                return (
                  <div
                    key={comment.id}
                    className="flex gap-3 p-3 bg-gray-100 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {comment.user.charAt(0)}
                    </div>

                    <div>
                        <p className="font-semibold text-sm">{comment.user}</p>
                      <p className="text-gray-700">{comment.text}</p>
                      <p className="text-gray-500 text-xs">{comment.date}</p>
                    </div>
                  </div>
                );
              }

              // user comments (editable)
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  currentUser={currentUser}
                  onDelete={handleDeleteComment}
                  onUpdate={handleUpdateComment}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* SUGGESTED VIDEOS */}
      <div className="w-full lg:w-1/3">
        <h2 className="text-lg font-bold mb-3">Suggested Videos</h2>
        <SuggestedList videos={videos} currentId={id} limit={6} />
      </div>
    </div>
  );
};

export default VideoPlayer;
