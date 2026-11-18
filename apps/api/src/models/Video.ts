import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    videoId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    channelTitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    publishedAt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

videoSchema.index({ userId: 1, videoId: 1 }, { unique: true });

const Video = mongoose.model("Video", videoSchema);

export default Video;
