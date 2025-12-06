import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },

    duration: {
      type:Number,
      default:0,
    },

    comments: [
      {
        commentId: String,
        userId: String,
        userEmail: String,
        userName: String,
        text: String,
        timestamp: Date,
      },
    ],

  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
