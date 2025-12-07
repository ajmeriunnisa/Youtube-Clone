// Channel CRUD controller functions
import ChannelModel from "../models/channel.model.js";
import UserModel from "../models/user.model.js";

/**
 * CREATE CHANNEL
 * Creates new channel for authenticated user
 */
export const createChannel = async (req, res) => {
  try {
    const { name, description = "", bannerImage = "", profileImage = "" } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "Channel name must be at least 3 characters" });
    }

    // Check if user already has a channel
    const existing = await ChannelModel.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "You already have a channel" });
    }

    const channel = await ChannelModel.create({
      name,
      description,
      bannerImage,
      profileImage,
      owner: req.user.id
    });

    // Link channel to user document
    const user = await UserModel.findById(req.user.id);
    user.channels.push(channel._id);
    await user.save();

    return res.status(201).json({
      message: "Channel created successfully",
      channel
    });
  } catch (error) {
    console.error("createChannel error:", error);
    return res.status(500).json({ message: "Server error while creating channel" });
  }
};

/**
 * GET ALL CHANNELS
 * Returns all channels with owner info
 */
export const getAllChannels = async (req, res) => {
  try {
    const channels = await ChannelModel.find().populate("owner", "username email");
    return res.json(channels);
  } catch (error) {
    console.error("getAllChannels error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET SINGLE CHANNEL
 * Returns channel by ID with owner info
 */
export const getChannel = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id).populate("owner", "username email");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    return res.json(channel);
  } catch (error) {
    console.error("getChannel error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE CHANNEL
 * Updates channel details (owner only)
 */
export const updateChannel = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await ChannelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({
      message: "Channel updated successfully",
      channel: updated
    });
  } catch (error) {
    console.error("updateChannel error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE CHANNEL
 * Deletes channel (owner only)
 */
export const deleteChannel = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await channel.deleteOne();

    return res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("deleteChannel error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
