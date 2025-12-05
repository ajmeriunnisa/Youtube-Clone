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
