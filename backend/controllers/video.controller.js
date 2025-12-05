import VideoModel from "../models/video.model.js";

/**
 * CREATE VIDEO
 */
export const createVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId,
    } = req.body;

    if (!title || title.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters" });
    }
    if (!thumbnailUrl || !videoUrl) {
      return res.status(400).json({ message: "Thumbnail and video URL are required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const newVideo = await VideoModel.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId,
      uploader: userId,
    });

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (err) {
    console.error("createVideo error:", err);
    res.status(500).json({ message: "Server error while uploading video" });
  }
};

/**
 * GET ALL VIDEOS
 */
export const getAllVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ createdAt: -1 });
    return res.json(videos);
  } catch (err) {
    console.error("getAllVideos error:", err);
    res.status(500).json({ message: "Server error fetching videos" });
  }
};

/**
 * GET VIDEO BY ID
 */
export const getVideoById = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.json(video);
  } catch (err) {
    console.error("getVideoById error:", err);
    res.status(500).json({ message: "Server error fetching video" });
  }
};

/**
 * GET VIDEOS BY CATEGORY (FILTER)
 */
export const getVideosByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const videos = await VideoModel.find({ category });

    return res.json(videos);
  } catch (err) {
    console.error("getVideosByCategory error:", err);
    res.status(500).json({ message: "Server error filtering videos" });
  }
};

/**
 * UPDATE VIDEO
 */
export const updateVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Only uploader can edit
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this video" });
    }

    const updated = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.json({ message: "Video updated", video: updated });
  } catch (err) {
    console.error("updateVideo error:", err);
    res.status(500).json({ message: "Server error updating video" });
  }
};

/**
 * DELETE VIDEO
 */
export const deleteVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this video" });
    }

    await video.deleteOne();

    return res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("deleteVideo error:", err);
    res.status(500).json({ message: "Server error deleting video" });
  }
};

/**
 * ADD COMMENT
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      commentId: "c" + Date.now(),
      userId: req.user.id,
      text,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();

    res.json({ message: "Comment added", comment: newComment });
  } catch (err) {
    console.error("addComment error:", err);
    res.status(500).json({ message: "Server error adding comment" });
  }
};

/**
 * UPDATE COMMENT
 */
export const updateComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.comments.find((c) => c.commentId === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only comment owner can edit the comment
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this comment" });
    }

    comment.text = text;
    comment.timestamp = new Date();

    await video.save();

    return res.json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (err) {
    console.error("updateComment error:", err);
    res.status(500).json({ message: "Server error updating comment" });
  }
};

/**
 * DELETE COMMENT
 */
export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.comments = video.comments.filter((c) => c.commentId !== commentId);

    await video.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("deleteComment error:", err);
    res.status(500).json({ message: "Server error deleting comment" });
  }
};

/**
 * LIKE VIDEO
 */
export const likeVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1;

    await video.save();

    res.json({ message: "Video liked", likes: video.likes });
  } catch (err) {
    console.error("likeVideo error:", err);
    res.status(500).json({ message: "Server error liking video" });
  }
};

/**
 * DISLIKE VIDEO
 */
export const dislikeVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes += 1;

    await video.save();

    res.json({ message: "Video disliked", dislikes: video.dislikes });
  } catch (err) {
    console.error("dislikeVideo error:", err);
    res.status(500).json({ message: "Server error disliking video" });
  }
};