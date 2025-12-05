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
