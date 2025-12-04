import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    // Link to the User creating this channel
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user can have only one channel
    },

    // Channel name (required + validation)
    name: {
      type: String,
      required: [true, "Channel name is required"],
      minlength: [3, "Channel name must be at least 3 characters"],
      maxlength: [30, "Channel name cannot exceed 30 characters"],
      trim: true,
    },

    // Optional channel description
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional banner image
    bannerImage: {
      type: String,
      default: "",
    },

    // Optional profile image
    profileImage: {
      type: String,
      default: "",
    },

    // Subscribers count (default 0)
    subscribers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ChannelModel = mongoose.model("Channel", channelSchema);

export default ChannelModel;
