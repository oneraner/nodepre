import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "未填貼文ID"],
    },

    content: {
      type: String,
      required: [true, "必須輸入內容"],
    },

    imageUrl: {
      type: String,
    },

    createdAt: {
      type: Number,
      default: new Date().getTime(),
    },

    updatedAt: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { versionKey: false }
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;
