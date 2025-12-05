import ChannelModel from "../models/channel.model.js";
import UserModel from "../models/user.model.js";

/**
 * CREATE CHANNEL
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

    // Push channel ID into user document
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
 * GET A SINGLE CHANNEL
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
