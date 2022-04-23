import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "缺少創作者身分"],
    },

    userIcon: {
      type: String,
    },

    content: {
      type: String,
      required: [true, "必須輸入內容"],
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
